export default class Card { 
  constructor(data, templateElementSelector,  handleCardClick) { 
    this._name = data.name; 
    this._link = data.link; 
     
    this._templateElementSelector = templateElementSelector;

    this._handleCardClick = handleCardClick;
  } 

  
  _getCardTemplate() { 
    return document
    .querySelector(this._templateElementSelector)
    .content
    .cloneNode(true);
  } 


  _setEventListeners() { 
    this._cardElements.cardLikeButton.addEventListener('click', this._toggleLikeButton.bind(this)); 
    this._cardElements.cardDeleteButton.addEventListener('click', this._deleteCard); 
    this._cardElements.cardImage.addEventListener('click', (data) => {
      this._handleCardClick({name: data.title, link: data.link});
    }); 
  } 
 
 
  
  _toggleLikeButton(e) { 
    e.target.classList.toggle('.gallery__like-button_active'); 
  } 
 
 
  _deleteCard(e) { 
    e.target.parentNode.remove();
  } 
 
 
  createCard() { 
    this._card = this._getCardTemplate(); 
 
    const cardLikeButton = this._card.querySelector('.gallery__like-button'); 
    const cardDeleteButton = this._card.querySelector('.gallery__delete-button'); 
    const cardImage = this._card.querySelector('.gallery__image'); 
 
    cardImage.src = this._link; 
    cardImage.alt = this._name; 
 
    const cardText = this._card.querySelector('.gallery__item-title'); 
    cardText.textContent = this._name; 
 
    this._cardElements = { 
      cardLikeButton, 
      cardDeleteButton, 
      cardImage 
    } 
    this._setEventListeners(); 
 
    return this._card; 
   } 
}  