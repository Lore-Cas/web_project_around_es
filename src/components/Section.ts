interface SectionConfig<T> {
  items: T[];
  renderer: (item: T) => void;
}

export class Section<T> {
  private readonly container: HTMLElement;

  constructor(private readonly config: SectionConfig<T>, containerSelector: string) {
    const container = document.querySelector<HTMLElement>(containerSelector);
    if (!container) throw new Error(`No se encontró el contenedor ${containerSelector}`);
    this.container = container;
  }

  public renderItems(): void {
    this.config.items.forEach((item) => this.config.renderer(item));
  }

  public addItem(element: HTMLElement): void {
    this.container.prepend(element);
  }
}
