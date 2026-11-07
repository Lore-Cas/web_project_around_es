import { Popup } from "./Popup.js";
import type { FormSubmitHandler, FormValues } from "../utils/types.js";

export class PopupWithForm extends Popup {
  private readonly form: HTMLFormElement;
  private readonly inputs: HTMLInputElement[];

  constructor(popupSelector: string, private readonly handleFormSubmit: FormSubmitHandler) {
    super(popupSelector);
    const form = this.popup.querySelector<HTMLFormElement>(".popup__form");
    if (!form) throw new Error("No se encontró el formulario del popup.");
    this.form = form;
    this.inputs = Array.from(form.querySelectorAll<HTMLInputElement>("input"));
  }

  private getInputValues(): FormValues {
    return this.inputs.reduce<FormValues>((values, input) => {
      values[input.name] = input.value;
      return values;
    }, {});
  }

  public override setEventListeners(): void {
    super.setEventListeners();
    this.form.addEventListener("submit", (event: SubmitEvent): void => {
      event.preventDefault();
      if (!this.form.checkValidity()) return;
      this.handleFormSubmit(this.getInputValues());
    });
  }

  public override close(): void {
    super.close();
    this.form.reset();
  }
}
