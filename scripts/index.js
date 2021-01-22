import FormValidator from './FormValidator.js';
import Card from './Card.js';


const defaultConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
}

const modalNewPlace = document.querySelector('.modal_button_add');
const modalEdit = document.querySelector('.modal_button_edit');

const formEditProfile = document.querySelector('.modal__form');
const formNewPlace = document.querySelector('.modal__form-add');

const editFormValidator = new FormValidator(defaultConfig, formEditProfile);
const addFormValidator = new FormValidator(defaultConfig, formNewPlace);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// Wrappers

const imageModal = document.querySelector('.modal_button_image');

// Buttons
const editFormButton = document.querySelector('.profile__button_type_edit');
const closeFormButton = document.querySelector('.modal__close-button');


const addFormButton = document.querySelector('.profile__button_type_add');

const modalNewPlaceCloseButton = document.querySelector('.modal__close-button-add');

const modalImageCloseButton = document.querySelector('.modal__close-button-image');

//Inputs
const nameInput = document.querySelector('.modal__input_type_name');
const professionInput = document.querySelector('.modal__input_type_profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

const imageTitle = formNewPlace.querySelector('.modal__input_type_card-title');
const imageUrl = formNewPlace.querySelector('.modal__input_type_url');

function toggleModal(tmodal) {
  if (!tmodal.classList.contains('modal_open')) {
    tmodal.addEventListener('click', overlayClosing);
    window.addEventListener('keydown', escButtonClosing);
  } else {
    tmodal.removeEventListener('click', overlayClosing);
    window.removeEventListener('keydown', escButtonClosing);
  }
  tmodal.classList.toggle('modal_open');
}

function overlayClosing(evt) {
  toggleModal(evt.target);
}

function escButtonClosing(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector('.modal_open');
    toggleModal(openModal);

  }
}
addFormButton.addEventListener('click', () => {
  toggleModal(modalNewPlace);
});


modalNewPlaceCloseButton.addEventListener('click', () => {
  toggleModal(modalNewPlace);
});


editFormButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
  toggleModal(modalEdit);
});

formEditProfile.addEventListener('submit', function (e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  toggleModal(modalEdit);
});

closeFormButton.addEventListener('click', () => {
  toggleModal(modalEdit);
});


modalImageCloseButton.addEventListener('click', () => {
  toggleModal(imageModal);
})


const initialCards = [{
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];
// Card Template
const cardTemplate = document.querySelector('.card-template').content.querySelector('.gallery__item');
const list = document.querySelector('.gallery__items');

const modalImage = imageModal.querySelector('.modal__image');
const modalImageTitle = imageModal.querySelector('.modal__image-title');



function renderCard(data) {
  const card = new Card(data, '.card-template')
  //list.prepend(createCard(data));
  list.prepend(card.generateCard());
}

// Initial Cards
initialCards.forEach(cardsData => {
  renderCard(cardsData);
});

function formNewPlaceFunction(e) {
  e.preventDefault();
  renderCard({
    name: imageTitle.value,
    link: imageUrl.value
  });
  imageTitle.value = imageTitle.textContent;
  imageUrl.value = imageUrl.textContent;
  toggleModal(modalNewPlace);
}

formNewPlace.addEventListener('submit', formNewPlaceFunction);