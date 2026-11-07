export class Card {
    constructor(data, templateSelector, handleCardClick) {
        this.data = data;
        this.templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
    }
    getTemplate() {
        const template = document.querySelector(this.templateSelector);
        if (!template)
            throw new Error(`No se encontró la plantilla ${this.templateSelector}`);
        const card = template.content.firstElementChild?.cloneNode(true);
        if (!(card instanceof HTMLElement))
            throw new Error("Plantilla de tarjeta inválida.");
        return card;
    }
    setEventListeners() {
        const imageButton = this.element.querySelector(".card__image-button");
        const likeButton = this.element.querySelector(".card__like-button");
        const deleteButton = this.element.querySelector(".card__delete-button");
        imageButton?.addEventListener("click", () => this.handleCardClick(this.data));
        likeButton?.addEventListener("click", () => {
            const isLiked = likeButton.classList.toggle("card__like-button_is-active");
            likeButton.setAttribute("aria-pressed", String(isLiked));
        });
        deleteButton?.addEventListener("click", () => this.element.remove());
    }
    generateCard() {
        this.element = this.getTemplate();
        const title = this.element.querySelector(".card__title");
        const image = this.element.querySelector(".card__image");
        const imageButton = this.element.querySelector(".card__image-button");
        if (!title || !image || !imageButton)
            throw new Error("La tarjeta no contiene todos los elementos necesarios.");
        title.textContent = this.data.name;
        image.src = this.data.link;
        image.alt = `Fotografía de ${this.data.name}`;
        imageButton.setAttribute("aria-label", `Ampliar imagen: ${this.data.name}`);
        this.element.querySelector(".card__like-button")?.setAttribute("aria-pressed", "false");
        this.setEventListeners();
        return this.element;
    }
}
