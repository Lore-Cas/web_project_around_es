import type { UserData } from "../utils/types.js";

interface UserInfoSelectors {
  nameSelector: string;
  descriptionSelector: string;
}

export class UserInfo {
  private readonly nameElement: HTMLElement;
  private readonly descriptionElement: HTMLElement;

  constructor(selectors: UserInfoSelectors) {
    const nameElement = document.querySelector<HTMLElement>(selectors.nameSelector);
    const descriptionElement = document.querySelector<HTMLElement>(selectors.descriptionSelector);
    if (!nameElement || !descriptionElement) throw new Error("No se encontraron los datos del perfil.");
    this.nameElement = nameElement;
    this.descriptionElement = descriptionElement;
  }

  public getUserInfo(): UserData {
    return {
      name: this.nameElement.textContent ?? "",
      description: this.descriptionElement.textContent ?? "",
    };
  }

  public setUserInfo(data: UserData): void {
    this.nameElement.textContent = data.name;
    this.descriptionElement.textContent = data.description;
  }
}
