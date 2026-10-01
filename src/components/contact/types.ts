export type FormStatus = "idle" | "success" | "error" | "not_configured"

export type ContactFieldName = "name" | "company" | "email" | "phone" | "message"

export interface FormState {
  status: FormStatus
  fieldErrors: Partial<Record<ContactFieldName, string>>
  message: string
}

export const initialFormState: FormState = {
  status: "idle",
  fieldErrors: {},
  message: "",
}
