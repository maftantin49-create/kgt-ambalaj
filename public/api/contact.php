<?php
/**
 * KGT Ambalaj — İletişim Formu Endpoint
 *
 * Aktivasyon:
 *   1. $DESTINATION_EMAIL adresini set edin (örn. 'info@kgtmak.com')
 *   2. İki contact sayfasında  const isConfigured = true  yapın
 *   3. public/api/contact.php dosyasını tekrar upload edin
 */

// ── Konfigürasyon ────────────────────────────────────────────────────────────
$DESTINATION_EMAIL = '';           // Alıcı e-posta — boş ise form pasif kalır
$FROM_ADDRESS      = 'noreply@kgtmak.com';
$FROM_NAME         = 'KGT Ambalaj Web';
$RATE_LIMIT_MAX    = 3;            // Aynı IP'den X gönderim
$RATE_LIMIT_WINDOW = 600;          // saniye (10 dakika)
// ─────────────────────────────────────────────────────────────────────────────

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit(json_encode(['status' => 'error', 'fieldErrors' => [], 'message' => 'Method not allowed']));
}

if (empty($DESTINATION_EMAIL)) {
    http_response_code(503);
    exit(json_encode(['status' => 'not_configured', 'fieldErrors' => [], 'message' => '']));
}

// Honeypot — bot tuzağı
$honeypot = trim($_POST['website'] ?? '');
if ($honeypot !== '') {
    exit(json_encode(['status' => 'success', 'fieldErrors' => [], 'message' => 'Mesajınız iletildi.']));
}

// IP tabanlı basit rate limiting (session)
session_start();
$ip_key = 'rl_' . md5($_SERVER['REMOTE_ADDR'] ?? 'unknown');
$rl     = $_SESSION[$ip_key] ?? ['count' => 0, 'since' => time()];
if ((time() - $rl['since']) > $RATE_LIMIT_WINDOW) {
    $rl = ['count' => 0, 'since' => time()];
}
$rl['count']++;
$_SESSION[$ip_key] = $rl;
if ($rl['count'] > $RATE_LIMIT_MAX) {
    http_response_code(429);
    exit(json_encode(['status' => 'error', 'fieldErrors' => [], 'message' => 'Çok fazla istek. Lütfen 10 dakika sonra tekrar deneyin.']));
}

// Girdi
$name    = trim($_POST['name']    ?? '');
$company = trim($_POST['company'] ?? '');
$email   = trim($_POST['email']   ?? '');
$phone   = trim($_POST['phone']   ?? '');
$message = trim($_POST['message'] ?? '');

$errors = [];

// Ad Soyad: zorunlu, 2–100
$nl = mb_strlen($name, 'UTF-8');
if ($nl === 0) {
    $errors['name'] = 'Ad Soyad zorunludur.';
} elseif ($nl < 2) {
    $errors['name'] = 'Ad Soyad en az 2 karakter olmalıdır.';
} elseif ($nl > 100) {
    $errors['name'] = 'Ad Soyad 100 karakteri aşamaz.';
}

// Firma: opsiyonel, max 150
if (mb_strlen($company, 'UTF-8') > 150) {
    $errors['company'] = 'Firma adı 150 karakteri aşamaz.';
}

// E-posta: zorunlu, max 254, format
$el = mb_strlen($email, 'UTF-8');
if ($el === 0) {
    $errors['email'] = 'E-posta adresi zorunludur.';
} elseif ($el > 254) {
    $errors['email'] = 'E-posta adresi 254 karakteri aşamaz.';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Geçerli bir e-posta adresi girin.';
}

// Telefon: opsiyonel, max 20
if ($phone !== '') {
    $plen = mb_strlen($phone, 'UTF-8');
    if ($plen > 20) {
        $errors['phone'] = 'Telefon numarası 20 karakteri aşamaz.';
    } elseif (!preg_match('/^[0-9 +()\-]+$/', $phone)) {
        $errors['phone'] = 'Telefon numarası yalnızca rakam, boşluk ve + ( ) - içerebilir.';
    } elseif (preg_match_all('/[0-9]/', $phone, $m) < 7) {
        $errors['phone'] = 'Telefon numarası en az 7 rakam içermelidir.';
    }
}

// Mesaj: zorunlu, 10–2000
$ml = mb_strlen($message, 'UTF-8');
if ($ml === 0) {
    $errors['message'] = 'Mesaj zorunludur.';
} elseif ($ml < 10) {
    $errors['message'] = 'Mesaj en az 10 karakter olmalıdır.';
} elseif ($ml > 2000) {
    $errors['message'] = "Mesaj 2000 karakteri aşamaz. (Şu an: {$ml})";
}

if (!empty($errors)) {
    http_response_code(422);
    exit(json_encode(['status' => 'error', 'fieldErrors' => $errors, 'message' => '']));
}

// Header injection koruması — CR/LF/NUL temizleme
$safe = static function (string $v): string {
    return str_replace(["\r", "\n", "\0"], '', $v);
};
$s_name    = $safe($name);
$s_email   = $safe($email);
$s_company = $safe($company);
$s_phone   = $safe($phone);

// E-posta konu satırı (UTF-8 encoded)
$subject_text = 'Teklif Talebi — ' . $s_name . ($s_company !== '' ? ' / ' . $s_company : '');
$subject      = '=?UTF-8?B?' . base64_encode($subject_text) . '?=';

// E-posta gövdesi
$body  = "Ad Soyad : {$s_name}\n";
if ($s_company !== '') $body .= "Firma     : {$s_company}\n";
$body .= "E-posta   : {$s_email}\n";
if ($s_phone !== '') $body .= "Telefon   : {$s_phone}\n";
$body .= "\nMesaj:\n{$message}\n";
$body .= "\n--\nkgtmak.com üzerinden gönderildi.";

// E-posta başlıkları
$headers  = "From: {$FROM_NAME} <{$FROM_ADDRESS}>\r\n";
$headers .= "Reply-To: {$s_name} <{$s_email}>\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "Content-Transfer-Encoding: 8bit\r\n";

if (!mail($DESTINATION_EMAIL, $subject, $body, $headers)) {
    http_response_code(500);
    exit(json_encode(['status' => 'error', 'fieldErrors' => [], 'message' => 'Mesaj gönderilemedi. Lütfen tekrar deneyin.']));
}

exit(json_encode([
    'status'      => 'success',
    'fieldErrors' => [],
    'message'     => 'Mesajınız iletildi. En kısa sürede size dönüş yapacağız.',
]));
