function toggleModal(tmodal) {
    if(!tmodal.classList.contains('modal_open')) {
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
    if (evt.key === "Escape" ) {
      const openModal = document.querySelector('.modal_open');
      toggleModal(openModal);
  
    }
  }

class Card {
    constructor(data, templateSelector) {
        this._link = data.link;
        this._name = data.name;
        this._templateSelector = templateSelector;


    }

    _getCardTemplate() {
        const cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.gallery__item');

        return cardTemplate;
    }

    _handleLikeButton() {
        e.target.classList.toggle('gallery__like-button_active');
    }

    _handleDeleteButton() {
        list.removeChild(this._card);
    }

    _handlePreviewImage() {
        const imageModal = document.querySelector('.modal_button_image');
        const modalImage = imageModal.querySelector('.modal__image');
        const modalImageTitle = imageModal.querySelector('.modal__image-title');

        modalImageTitle.textContent = this._name;
        modalImage.src = this._link;
        modalImage.alt = this._name;
    
        toggleModal(imageModal);
        
    }

    _setEventListeners() {
        const cardLikeButton = this._card.querySelector('.gallery__like-button');
        const cardDeleteButton = this._card.querySelector('.gallery__delete-button');
        const cardImage = this._card.querySelector('.gallery__image');

        cardLikeButton.addEventListener('click', this._handleLikeButton);
        cardDeleteButton.addEventListener('click', this._handleDeleteButton);
        cardImage.addEventListener('click', this._handlePreviewImage);
    }

    generateCard() {
        

        this._card = cardTemplate.cloneNode(true);

        const cardImage = this._card.querySelector('.gallery__image');
        const cardTitle = this._card.querySelector('.gallery__item-title');
  
        cardTitle.textContent = this._name;
        cardImage.src = this._link;
        cardImage.alt = this._name;

        return this._card;
        }
}

export default Card;