export class Popup {
    constructor(popupSelector) {
        this.previousFocus = null;
        this.handleEscClose = (event) => {
            if (event.key === "Escape")
                this.close();
        };
        const popup = document.querySelector(popupSelector);
        if (!popup)
            throw new Error(`No se encontró el popup ${popupSelector}`);
        this.popup = popup;
    }
    open() {
        this.previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        this.popup.classList.add("popup_is-opened");
        this.popup.setAttribute("aria-hidden", "false");
        document.addEventListener("keydown", this.handleEscClose);
        this.popup.querySelector(".popup__close")?.focus();
    }
    close() {
        this.popup.classList.remove("popup_is-opened");
        this.popup.setAttribute("aria-hidden", "true");
        document.removeEventListener("keydown", this.handleEscClose);
        if (this.previousFocus?.isConnected)
            this.previousFocus.focus();
        this.previousFocus = null;
    }
    setEventListeners() {
        this.popup.querySelector(".popup__close")?.addEventListener("click", () => this.close());
        this.popup.addEventListener("click", (event) => {
            if (event.target === this.popup)
                this.close();
        });
    }
}
