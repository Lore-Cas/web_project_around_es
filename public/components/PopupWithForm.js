import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit, resetFormValidation) {
        super(popupSelector);
        this.handleFormSubmit = handleFormSubmit;
        this.resetFormValidation = resetFormValidation;
        const form = this.popup.querySelector(".popup__form");
        if (!form)
            throw new Error("No se encontró el formulario del popup.");
        this.form = form;
        this.inputs = Array.from(form.querySelectorAll("input"));
    }
    getInputValues() {
        return this.inputs.reduce((values, input) => {
            values[input.name] = input.value;
            return values;
        }, {});
    }
    setEventListeners() {
        super.setEventListeners();
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            if (!this.form.checkValidity())
                return;
            this.handleFormSubmit(this.getInputValues());
        });
    }
    close() {
        super.close();
        this.form.reset();
        this.resetFormValidation();
    }
}
