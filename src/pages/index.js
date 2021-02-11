import './index.css';

import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Api from '../components/Api.js';
import {
  defaultConfig,
  editProfileModal,
  addCardModal,
  editAvatarModal,
  deleteCardModal,
  imageModal,
  editProfileForm,
  addCardForm,
  editAvatarForm,
  editProfileButton,
  addCardButton,
  editAvatarButton,
  profileName,
  profileAbout,
  profileInputName,
  profileInputAbout,
  profileAvatar,
  cardTemplateSelector,
  cardGrid
} from '../utils/constants.js';

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-8",
  headers: {
    authorization: "26611db9-c358-4822-a371-412fcde828f7",
    "Content-Type": "application/json"
  }
});

// Validators
const editFormValidator = new FormValidator(defaultConfig, editProfileForm);
const addCardFormValidator = new FormValidator(defaultConfig, addCardForm);
const editAvatarFormValidator = new FormValidator(defaultConfig, editAvatarForm);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();


//  Loading
function handleLoading(isLoading, modal, textInput) {
  if (isLoading) {
    modal.querySelector('.form__button').textContent = textInput;
  } else {
    modal.querySelector('.form__button').textContent = textInput;
  }
}

// User info
const userInfo = new UserInfo(profileName, profileAbout, profileAvatar);

// Image Modal 
const imagePopup = new PopupWithImage(imageModal);
imagePopup.setEventListeners();


// Edit popup
const editProfilePopup = new PopupWithForm({
  popupSelector: editProfileModal,
  handleSubmit: (data) => {
    handleLoading(true, editProfileModal, 'Saving...')
    api.setUserInfo({
        name: data.nameInput,
        about: data.aboutInput,
       
      })
      .then((userData) => {
        userInfo.setUserInfo(userData.name, userData.about, userData.avatar)
        handleLoading(false, editProfileModal, 'Save')
        editProfilePopup.close();
      })
      .catch(err => console.log(err))
  }
})

editProfileButton.addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileInputName.value = "";
  profileInputAbout.value = "";
  editProfilePopup.open();
})

editProfilePopup.setEventListeners();


// Edit avatar
const editAvatarPopup = new PopupWithForm({
  popupSelector: editAvatarModal,
  handleSubmit: (data) => {
    handleLoading(true, editAvatarModal, 'Saving...')
    api.setUserAvatar({
        avatar: data.avatar
      })
      .then((res) => {
        userInfo.setUserAvatar(res.avatar);
        handleLoading(false, editAvatarModal, 'Save');
        editAvatarPopup.close();
      }).catch(err => console.log(err))
  }
})

editAvatarButton.addEventListener('click', () => {
  editAvatarPopup.open();
  editAvatarFormValidator.disableSubmitButton();
})

editAvatarPopup.setEventListeners();

const deleteCardPopup = new PopupWithForm({
  popupSelector: deleteCardModal
});

deleteCardPopup.setEventListeners();


// Info, adding and removing card
api.getAppInfo()
  .then(([userData, cardListData]) => {
    const userIdInfo = userData._id;
    userInfo.setUserInfo(userData.name, userData.about, userData.avatar);

    const cardsList = new Section({
      data: cardListData,
      renderer: addNewCards
    }, cardGrid)
    

    cardsList.renderItems();

    // Adding the card
    const addCardPopup = new PopupWithForm({
      popupSelector: addCardModal,
      handleSubmit: (data) => {
        handleLoading(true, addCardModal, 'Saving...')
        api.addCard(data)
          .then((res) => {
            addNewCards(res);
            handleLoading(false, addCardModal, 'Create')
            addCardPopup.close()
            addCardFormValidator.disableSubmitButton();
          })
          .catch(err => console.log(err))
      }
    })

    addCardButton.addEventListener('click', () => {
      addCardFormValidator.disableSubmitButton();
      addCardPopup.open();
    });

    addCardPopup.setEventListeners();


    function addNewCards(data) {
      const newCards = new Card({
        data,
        handleCardClick: () => {
          imagePopup.open(data);
        },
        handleDeleteClick: (cardId) => {
          deleteCardPopup.open();
          deleteCardPopup.setSubmit(() => {
            handleLoading(true, deleteCardModal, 'Saving...');
            api.removeCard(cardId)
              .then(() => {
                newCards.deleteCard();
                deleteCardPopup.close();
                handleLoading(false, deleteCardModal, 'Yes')
              })
              .catch(err => console.log(err));
          })
        },
        handleLikeClick: (cardId) => {
          if (newCards.likeIcon.classList.contains('card__like-button_active')) {
            api.removeLike(cardId)
              .then((res) => {
                newCards.getLikesCount(res.likes.length)
              })
              .then(() => {
                newCards.likeIcon.classList.remove('card__like-button_active')
              })
              .catch(err => console.log(err))
          } else {
            api.addLike(cardId)
              .then((res) => {
                newCards.getLikesCount(res.likes.length)
              })
              .then(() => {
                newCards.likeIcon.classList.add('card__like-button_active')
              })
              .catch(err => console.log(err))
          }
        },
      }, cardTemplateSelector, userIdInfo);
      cardsList.addItem(newCards.createCard())
    }

  })
  .catch(err => console.log(err));