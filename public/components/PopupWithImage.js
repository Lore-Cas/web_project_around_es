import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        const image = this.popup.querySelector(".popup__image");
        const caption = this.popup.querySelector(".popup__caption");
        if (!image || !caption)
            throw new Error("El popup de imagen no está completo.");
        this.image = image;
        this.caption = caption;
    }
    open(data) {
        if (data) {
            this.image.src = data.link;
            this.image.alt = `Fotografía de ${data.name}`;
            this.caption.textContent = data.name;
        }
        super.open();
    }
}
