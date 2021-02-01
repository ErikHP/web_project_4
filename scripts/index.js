import '../pages/index.css';

import FormValidator from './FormValidator.js'; 
import Card from './Card.js'; 
import Section from './Section.js';
import UserInfo from './UserInfo.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import {
  initialCards,
  defaultConfig,
  cardContainerSelector,
  editProfileForm,
  addCardForm,
  editProfileInputs,
  modalImage,
  modalImageTitle
} from './utils/constants.js';


const imageModal = new PopupWithImage('.modal_button_image');
imageModal.setEventListeners();

function handleCardClick() {
  imageModal.open({name: this._name, link: this._link});
  
    modalImageTitle.textContent = this._name;  
    modalImage.src = this._link;  
    modalImage.alt = this._name;
}



const userInfo = new UserInfo({nameSelector: '.profile__name', aboutSelector: '.profile__profession'});



const editProfileModal = new PopupWithForm('.modal_button_edit', (data) => {
  userInfo.setUserInfo({name: data.inputName, about: data.inputAbout});
  editProfileModal.close();
});

editProfileModal.setEventListeners();


const editProfileButton = document.querySelector('.profile__button_type_edit');
editProfileButton.addEventListener('click', () => {
  const initialUserInfo = userInfo.getUserInfo();

  Object.keys(editProfileInputs).forEach((input) => {
    editProfileInputs[input].value = initialUserInfo[input];
    editFormValidator.checkInputValidity(editProfileInputs[input]);
  });

  editProfileModal.open();
});



const addCardModal = new PopupWithForm('.modal_button_add', addCardSubmitHandler);
addCardModal.setEventListeners();

const addCardButton = document.querySelector('.profile__button_type_add'); 
addCardButton.addEventListener('click', () => {
  addCardForm.reset();
  addCardModal.open();
  addFormValidator.disableSubmitButton();
}); 

function addCardSubmitHandler(data) {
  renderCard({name: data.title, link: data.url}, '.card-template', handleCardClick);
  addCardModal.close();
}

  

function renderCard(data) {  
  const card = new Card(data, '.card-template', handleCardClick); 
  const cardElement = card.createCard(); 
  cardsList.addItem(cardElement); 
}  
  

const cardsList = new Section({
  items: initialCards,
  renderer: renderCard,
}, cardContainerSelector)


cardsList.renderer();
  

const editFormValidator = new FormValidator(defaultConfig, editProfileForm); 
const addFormValidator = new FormValidator(defaultConfig, addCardForm); 
 
editFormValidator.enableValidation(); 
addFormValidator.enableValidation(); 


