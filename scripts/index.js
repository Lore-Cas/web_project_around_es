import { setEventListeners, resetValidation, validationConfig } from "./validate.js";

const initialCards = [{
    name: "Valley of Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },{
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },{
    name: "Bald Mountain",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },{
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },{
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },{
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
 }
];
  
// 1. Generate the cards dynamically from a template element.
const cardTemplate = document.querySelector("#card-template");
const cardsContainer = document.querySelector(".cards__list");

const imagePopup = document.querySelector("#image-popup");
const imagePopupCloseButton = imagePopup.querySelector(".popup__close");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

function getCardElement(name = "Sin título", link = "./images/placeholder.jpg") {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardImageButton = cardElement.querySelector(".card__image-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = `Fotografía de ${name}`;
  cardImageButton.setAttribute("aria-label", `Ampliar imagen: ${name}`);

  likeButton.addEventListener("click", handleLikeButtonClick);
  deleteButton.addEventListener("click", handleDeleteButtonClick);
  cardImageButton.addEventListener("click", handleCardImageClick);

  return cardElement;
}

function renderCard(name, link, cardsContainer) {
  const cardElement = getCardElement(name, link);
  cardsContainer.prepend(cardElement);
}

// Prepend conserva las tarjetas nuevas al principio; las iniciales mantienen el orden.
initialCards.slice().reverse().forEach((card) => {
  renderCard(card.name, card.link, cardsContainer);
});

const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const closeButton = editPopup.querySelector(".popup__close");

let previousFocusElement = null;

function openModal(modal) {
  previousFocusElement = document.activeElement;
  modal.classList.add("popup_is-opened");
  modal.setAttribute("aria-hidden", "false");
  document.addEventListener("keydown", handleEscClose);
  modal.querySelector(".popup__close").focus();
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  modal.setAttribute("aria-hidden", "true");
  document.removeEventListener("keydown", handleEscClose);

  const form = modal.querySelector(".popup__form");
  if (form) {
    form.reset();
    resetValidation(form, validationConfig);
  }

  if (previousFocusElement && previousFocusElement.isConnected) {
    previousFocusElement.focus();
  }
  previousFocusElement = null;
}

function handleEscClose(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

function handleOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closeModal(event.currentTarget);
  }
}

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", handleOverlayClick);
});

editButton.addEventListener("click", handleOpenEditModal);

closeButton.addEventListener("click", function() {
  closeModal(editPopup);
});

imagePopupCloseButton.addEventListener("click", function() {
  closeModal(imagePopup);
});

const profileName = document.querySelector(".profile__title");
const profileAbout = document.querySelector(".profile__description");
const nameInput = editPopup.querySelector(".popup__input_type_name");
const aboutInput = editPopup.querySelector(".popup__input_type_description");

function fillProfileForm() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  resetValidation(formElement, validationConfig);
  openModal(editPopup);
}

const formElement = editPopup.querySelector(".popup__form");

function handleProfileFormSubmit(event) {
  event.preventDefault();
  if (!formElement.checkValidity()) return;

  const nameInput = formElement.querySelector(".popup__input_type_name");
  const aboutInput = formElement.querySelector(".popup__input_type_description");

  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;

  closeModal(editPopup);
}

formElement.addEventListener("submit", handleProfileFormSubmit);

//2. Add new cards using the "Add a card" pop-up window. handleCardFormSubmit
const addButton = document.querySelector(".profile__add-button");
const addPopup = document.querySelector("#new-card-popup");
const addPopupCloseButton = addPopup.querySelector(".popup__close");
const newCardForm = addPopup.querySelector(".popup__form");

function handleOpenAddCardModal() {
  resetValidation(newCardForm, validationConfig);
  openModal(addPopup);
}

addButton.addEventListener("click", handleOpenAddCardModal);

addPopupCloseButton.addEventListener("click", function() {
  closeModal(addPopup);
});

function handleCardFormSubmit(event) {
  event.preventDefault();
  if (!newCardForm.checkValidity()) return;

  const cardName = newCardForm.querySelector(".popup__input_type_card-name").value;
  const cardLink = newCardForm.querySelector(".popup__input_type_url").value;

  renderCard(cardName, cardLink, cardsContainer);
  closeModal(addPopup);
}

newCardForm.addEventListener("submit", handleCardFormSubmit);

//3. Add "Like" buttons to each card
function handleLikeButtonClick(event) {
  event.currentTarget.classList.toggle("card__like-button_is-active");
}

//4. Remove cards using the "Delete" button
function handleDeleteButtonClick(event) {
  const card = event.currentTarget.closest(".card");
  card.remove();
}

//5. Open a pop-up window with a larger image when clicking on a card's image
function handleCardImageClick(event) {
  const cardImage = event.currentTarget.querySelector(".card__image");
  imagePopupCaption.textContent = cardImage.closest(".card").querySelector(".card__title").textContent;
  imagePopupImage.src = cardImage.src;
  imagePopupImage.alt = cardImage.alt;
  openModal(imagePopup);
}

// Activa la validación una vez que el DOM y los formularios están disponibles.
setEventListeners(validationConfig);
