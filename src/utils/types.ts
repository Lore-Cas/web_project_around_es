export interface CardData {
  name: string;
  link: string;
}

export interface UserData {
  name: string;
  description: string;
}

export interface FormValidationConfig {
  inputSelector: string;
  submitButtonSelector: string;
  inactiveButtonClass: string;
  inputErrorClass: string;
  errorClass: string;
}

export type FormValues = Record<string, string>;
export type FormSubmitHandler = (values: FormValues) => void;
