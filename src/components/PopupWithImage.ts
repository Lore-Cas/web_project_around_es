import { Popup } from "./Popup.js";
import type { CardData } from "../utils/types.js";

export class PopupWithImage extends Popup {
  private readonly image: HTMLImageElement;
  private readonly caption: HTMLElement;

  constructor(popupSelector: string) {
    super(popupSelector);
    const image = this.popup.querySelector<HTMLImageElement>(".popup__image");
    const caption = this.popup.querySelector<HTMLElement>(".popup__caption");
    if (!image || !caption) throw new Error("El popup de imagen no está completo.");
    this.image = image;
    this.caption = caption;
  }

  public override open(data?: CardData): void {
    if (data) {
      this.image.src = data.link;
      this.image.alt = `Fotografía de ${data.name}`;
      this.caption.textContent = data.name;
    }
    super.open();
  }
}
