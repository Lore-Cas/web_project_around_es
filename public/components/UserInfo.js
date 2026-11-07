export class UserInfo {
    constructor(selectors) {
        const nameElement = document.querySelector(selectors.nameSelector);
        const descriptionElement = document.querySelector(selectors.descriptionSelector);
        if (!nameElement || !descriptionElement)
            throw new Error("No se encontraron los datos del perfil.");
        this.nameElement = nameElement;
        this.descriptionElement = descriptionElement;
    }
    getUserInfo() {
        return {
            name: this.nameElement.textContent ?? "",
            description: this.descriptionElement.textContent ?? "",
        };
    }
    setUserInfo(data) {
        this.nameElement.textContent = data.name;
        this.descriptionElement.textContent = data.description;
    }
}
