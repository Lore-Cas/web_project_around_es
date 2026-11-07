export class FormValidator {
    constructor(config, form) {
        this.config = config;
        this.form = form;
        this.inputs = Array.from(this.form.querySelectorAll(config.inputSelector));
        const button = this.form.querySelector(config.submitButtonSelector);
        if (!button)
            throw new Error("No se encontró el botón de envío del formulario.");
        this.submitButton = button;
    }
    getErrorElement(input) {
        return document.getElementById(`${input.id}-error`);
    }
    showInputError(input) {
        const error = this.getErrorElement(input);
        input.classList.add(this.config.inputErrorClass);
        input.setAttribute("aria-invalid", "true");
        if (error) {
            error.textContent = input.validationMessage;
            error.classList.add(this.config.errorClass);
        }
    }
    hideInputError(input) {
        const error = this.getErrorElement(input);
        input.classList.remove(this.config.inputErrorClass);
        input.setAttribute("aria-invalid", "false");
        if (error) {
            error.textContent = "";
            error.classList.remove(this.config.errorClass);
        }
    }
    checkInputValidity(input) {
        if (input.validity.valid)
            this.hideInputError(input);
        else
            this.showInputError(input);
    }
    toggleButtonState() {
        const invalid = this.inputs.some((input) => !input.validity.valid);
        this.submitButton.disabled = invalid;
        this.submitButton.classList.toggle(this.config.inactiveButtonClass, invalid);
    }
    setEventListeners() {
        this.inputs.forEach((input) => {
            input.addEventListener("input", (_event) => {
                this.checkInputValidity(input);
                this.toggleButtonState();
            });
        });
    }
    enableValidation() {
        this.setEventListeners();
        this.resetValidation();
    }
    resetValidation() {
        this.inputs.forEach((input) => this.hideInputError(input));
        this.toggleButtonState();
    }
}
