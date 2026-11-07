import type { CardData } from "../utils/types.js";

export class Card {
  private element!: HTMLElement;

  constructor(
    private readonly data: CardData,
    private readonly templateSelector: string,
    private readonly handleCardClick: (data: CardData) => void,
  ) {}

  private getTemplate(): HTMLElement {
    const template = document.querySelector<HTMLTemplateElement>(this.templateSelector);
    if (!template) throw new Error(`No se encontró la plantilla ${this.templateSelector}`);
    const card = template.content.firstElementChild?.cloneNode(true);
    if (!(card instanceof HTMLElement)) throw new Error("Plantilla de tarjeta inválida.");
    return card;
  }

  private setEventListeners(): void {
    const imageButton = this.element.querySelector<HTMLButtonElement>(".card__image-button");
    const likeButton = this.element.querySelector<HTMLButtonElement>(".card__like-button");
    const deleteButton = this.element.querySelector<HTMLButtonElement>(".card__delete-button");
    imageButton?.addEventListener("click", () => this.handleCardClick(this.data));
    likeButton?.addEventListener("click", () => {
      const isLiked = likeButton.classList.toggle("card__like-button_is-active");
      likeButton.setAttribute("aria-pressed", String(isLiked));
    });
    deleteButton?.addEventListener("click", () => this.element.remove());
  }

  public generateCard(): HTMLElement {
    this.element = this.getTemplate();
    const title = this.element.querySelector<HTMLElement>(".card__title");
    const image = this.element.querySelector<HTMLImageElement>(".card__image");
    const imageButton = this.element.querySelector<HTMLButtonElement>(".card__image-button");
    if (!title || !image || !imageButton) throw new Error("La tarjeta no contiene todos los elementos necesarios.");
    title.textContent = this.data.name;
    image.src = this.data.link;
    image.alt = `Fotografía de ${this.data.name}`;
    imageButton.setAttribute("aria-label", `Ampliar imagen: ${this.data.name}`);
    this.element.querySelector<HTMLButtonElement>(".card__like-button")?.setAttribute("aria-pressed", "false");
    this.setEventListeners();
    return this.element;
  }
}
