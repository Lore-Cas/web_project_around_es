import type { FormValidationConfig } from "../utils/types.js";

export class FormValidator {
  private readonly inputs: HTMLInputElement[];
  private readonly submitButton: HTMLButtonElement;

  constructor(
    private readonly config: FormValidationConfig,
    private readonly form: HTMLFormElement,
  ) {
    this.inputs = Array.from(this.form.querySelectorAll<HTMLInputElement>(config.inputSelector));
    const button = this.form.querySelector<HTMLButtonElement>(config.submitButtonSelector);
    if (!button) throw new Error("No se encontró el botón de envío del formulario.");
    this.submitButton = button;
  }

  private getErrorElement(input: HTMLInputElement): HTMLElement | null {
    return document.getElementById(`${input.id}-error`);
  }

  private showInputError(input: HTMLInputElement): void {
    const error = this.getErrorElement(input);
    input.classList.add(this.config.inputErrorClass);
    input.setAttribute("aria-invalid", "true");
    if (error) {
      error.textContent = input.validationMessage;
      error.classList.add(this.config.errorClass);
    }
  }

  private hideInputError(input: HTMLInputElement): void {
    const error = this.getErrorElement(input);
    input.classList.remove(this.config.inputErrorClass);
    input.setAttribute("aria-invalid", "false");
    if (error) {
      error.textContent = "";
      error.classList.remove(this.config.errorClass);
    }
  }

  private checkInputValidity(input: HTMLInputElement): void {
    if (input.validity.valid) this.hideInputError(input);
    else this.showInputError(input);
  }

  private toggleButtonState(): void {
    const invalid = this.inputs.some((input) => !input.validity.valid);
    this.submitButton.disabled = invalid;
    this.submitButton.classList.toggle(this.config.inactiveButtonClass, invalid);
  }

  private setEventListeners(): void {
    this.inputs.forEach((input) => {
      input.addEventListener("input", (_event: Event): void => {
        this.checkInputValidity(input);
        this.toggleButtonState();
      });
    });
  }

  public enableValidation(): void {
    this.setEventListeners();
    this.resetValidation();
  }

  public resetValidation(): void {
    this.inputs.forEach((input) => this.hideInputError(input));
    this.toggleButtonState();
  }
}
