export class Popup {
  protected readonly popup: HTMLElement;
  private previousFocus: HTMLElement | null = null;

  constructor(popupSelector: string) {
    const popup = document.querySelector<HTMLElement>(popupSelector);
    if (!popup) throw new Error(`No se encontró el popup ${popupSelector}`);
    this.popup = popup;
  }

  private readonly handleEscClose = (event: KeyboardEvent): void => {
    if (event.key === "Escape") this.close();
  };

  public open(): void {
    this.previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    this.popup.classList.add("popup_is-opened");
    this.popup.setAttribute("aria-hidden", "false");
    document.addEventListener("keydown", this.handleEscClose);
    this.popup.querySelector<HTMLButtonElement>(".popup__close")?.focus();
  }

  public close(): void {
    this.popup.classList.remove("popup_is-opened");
    this.popup.setAttribute("aria-hidden", "true");
    document.removeEventListener("keydown", this.handleEscClose);
    if (this.previousFocus?.isConnected) this.previousFocus.focus();
    this.previousFocus = null;
  }

  public setEventListeners(): void {
    this.popup.querySelector<HTMLButtonElement>(".popup__close")?.addEventListener("click", () => this.close());
    this.popup.addEventListener("click", (event: MouseEvent) => {
      if (event.target === this.popup) this.close();
    });
  }
}
