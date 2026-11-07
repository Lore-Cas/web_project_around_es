import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { Section } from "./components/Section.js";
import { UserInfo } from "./components/UserInfo.js";
import { defaultFormConfig, initialCards } from "./utils/constants.js";
import type { CardData } from "./utils/types.js";

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const cardsSection = new Section<CardData>({
  items: [...initialCards].reverse(),
  renderer: (item) => {
    const card = new Card(item, "#card-template", (data) => imagePopup.open(data));
    cardsSection.addItem(card.generateCard());
  },
}, ".cards__list");

// addItem usa prepend; la lista se renderiza invertida para conservar el orden visual.
cardsSection.renderItems();

const editForm = document.querySelector<HTMLFormElement>("#edit-profile-form");
const newCardForm = document.querySelector<HTMLFormElement>("#new-card-form");
const editButton = document.querySelector<HTMLButtonElement>(".profile__edit-button");
const addButton = document.querySelector<HTMLButtonElement>(".profile__add-button");
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
  const data: CardData = { name: values["place-name"], link: values.link };
  const card = new Card(data, "#card-template", (item) => imagePopup.open(item));
  cardsSection.addItem(card.generateCard());
  newCardPopup.close();
}, () => cardValidator.resetValidation());
editPopup.setEventListeners();
newCardPopup.setEventListeners();

editButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  const nameInput = editForm.elements.namedItem("name");
  const descriptionInput = editForm.elements.namedItem("description");
  if (nameInput instanceof HTMLInputElement) nameInput.value = data.name;
  if (descriptionInput instanceof HTMLInputElement) descriptionInput.value = data.description;
  editValidator.resetValidation();
  editPopup.open();
});

addButton.addEventListener("click", () => {
  cardValidator.resetValidation();
  newCardPopup.open();
});
