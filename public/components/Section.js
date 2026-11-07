export class Section {
    constructor(config, containerSelector) {
        this.config = config;
        const container = document.querySelector(containerSelector);
        if (!container)
            throw new Error(`No se encontró el contenedor ${containerSelector}`);
        this.container = container;
    }
    renderItems() {
        this.config.items.forEach((item) => this.config.renderer(item));
    }
    addItem(element) {
        this.container.prepend(element);
    }
}
