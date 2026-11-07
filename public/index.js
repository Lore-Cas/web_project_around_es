import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { Section } from "./components/Section.js";
import { UserInfo } from "./components/UserInfo.js";
import { defaultFormConfig, initialCards } from "./utils/constants.js";
const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    descriptionSelector: ".profile__description",
});
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();
// Centraliza la creación de tarjetas para la lista inicial y el formulario.
const createCard = (data) => {
    const card = new Card(data, "#card-template", (item) => imagePopup.open(item));
    return card.generateCard();
};
const cardsSection = new Section({
    items: [...initialCards].reverse(),
    renderer: (item) => {
        cardsSection.addItem(createCard(item));
    },
}, ".cards__list");
// addItem usa prepend; la lista se renderiza invertida para conservar el orden visual.
cardsSection.renderItems();
const editForm = document.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
if (!editForm || !newCardForm || !editButton || !addButton) {
    throw new Error("No se encontraron todos los elementos de los formularios.");
}
const editValidator = new FormValidator(defaultFormConfig, editForm);
const cardValidator = new FormValidator(defaultFormConfig, newCardForm);
editValidator.enableValidation();
cardValidator.enableValidation();
const editPopup = new PopupWithForm("#edit-popup", (values) => {
    userInfo.setUserInfo({ name: values.name, description: values.description });
    editPopup.close();
}, () => editValidator.resetValidation());
const newCardPopup = new PopupWithForm("#new-card-popup", (values) => {
    const data = { name: values["place-name"], link: values.link };
    cardsSection.addItem(createCard(data));
    newCardPopup.close();
}, () => cardValidator.resetValidation());
editPopup.setEventListeners();
newCardPopup.setEventListeners();
editButton.addEventListener("click", () => {
    const data = userInfo.getUserInfo();
    const nameInput = editForm.elements.namedItem("name");
    const descriptionInput = editForm.elements.namedItem("description");
    if (nameInput instanceof HTMLInputElement)
        nameInput.value = data.name;
    if (descriptionInput instanceof HTMLInputElement)
        descriptionInput.value = data.description;
    editValidator.resetValidation();
    editPopup.open();
});
addButton.addEventListener("click", () => {
    cardValidator.resetValidation();
    newCardPopup.open();
});
