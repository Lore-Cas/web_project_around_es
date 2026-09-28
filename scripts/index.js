let initialCards = [{
    name: "Valley of Yosemite",
    link: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },{
    name: "Lake Louise",
    link: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },{
    name: "Bald Mountain",
    link: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },{
    name: "Latemar",
    link: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },{
    name: "Vanoise National Park",
    link: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },{
    name: "Lago di Braies",
    link: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  }
];

initialCards.forEach(function(card) {
    console.log(card.name);
});

const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector("#edit-popup");
const closeButton = editPopup.querySelector('.popup__close');

function openModal(modal) {
  modal.classList.add('popup_is-opened');
}

function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
}

editButton.addEventListener("click", handleOpenEditModal);

closeButton.addEventListener('click', function() {
  closeModal(editPopup);
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

editButton.addEventListener("click", handleOpenEditModal);

