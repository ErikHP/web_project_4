export const defaultConfig = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__save",
    inactiveButtonClass: "modal__save_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
  }


export const initialCards = [{
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

export const cardContainerSelector = '.gallery__items';

export const imageModalWindow = document.querySelector('.modal_button_image');  
export const modalImage = imageModalWindow.querySelector('.modal__image');  
export const modalImageTitle = imageModalWindow.querySelector('.modal__image-title');

export const editProfileForm = document.querySelector('.modal__form-edit');
export const editProfileInputs = {};

editProfileInputs.name = editProfileForm.querySelector('.modal__input_type_name');
editProfileInputs.about = editProfileForm.querySelector('.modal__input_type_profession');

export const addCardForm = document.querySelector('.modal__form-add');