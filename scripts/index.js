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
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  likeButton.addEventListener("click", handleLikeButtonClick);
  deleteButton.addEventListener("click", handleDeleteButtonClick);
  cardImage.addEventListener("click", handleCardImageClick);

  return cardElement;
}

function renderCard(name, link, cardsContainer) {
  const cardElement = getCardElement(name, link);
  cardsContainer.prepend(cardElement);
}

initialCards.forEach(function(card) {
  renderCard(card.name, card.link, cardsContainer);
});

const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const closeButton = editPopup.querySelector(".popup__close");

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

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
  openModal(editPopup);
}

const formElement = editPopup.querySelector(".popup__form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

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
  openModal(addPopup);
}

addButton.addEventListener("click", handleOpenAddCardModal);

addPopupCloseButton.addEventListener("click", function() {
  closeModal(addPopup);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const cardName = newCardForm.querySelector(".popup__input_type_card-name").value;
  const cardLink = newCardForm.querySelector(".popup__input_type_url").value;

  renderCard(cardName, cardLink, cardsContainer);
  closeModal(addPopup);
  newCardForm.reset();
}

newCardForm.addEventListener("submit", handleCardFormSubmit);

//3. Add "Like" buttons to each card
function handleLikeButtonClick(evt) {
  evt.currentTarget.classList.toggle("card__like-button_is-active");
}

//4. Remove cards using the "Delete" button
function handleDeleteButtonClick(evt) {
  const card = evt.currentTarget.closest(".card");
  card.remove();
}

//5. Open a pop-up window with a larger image when clicking on a card's image
function handleCardImageClick(evt) {
  const cardImage = evt.target;
  imagePopupCaption.textContent = cardImage.alt;
  imagePopupImage.src = cardImage.src;
  imagePopupImage.alt = cardImage.alt;
  openModal(imagePopup);
}
