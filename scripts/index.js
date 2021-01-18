// Wrappers
const form = document.querySelector('.modal__form');
const formNewPlace = document.querySelector('.modal__form-add');
const imageModal = document.querySelector('.modal_button_image');

// Buttons
const editFormButton = document.querySelector('.profile__button_type_edit');
const closeFormButton = document.querySelector('.modal__close-button');
const modalEdit = document.querySelector('.modal_button_edit');

const addFormButton = document.querySelector('.profile__button_type_add');
const modalNewPlace = document.querySelector('.modal_button_add');
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

form.addEventListener('submit', function(e) {
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


const initialCards = [
    {
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

  function createCard(data) {
      const cardElement = cardTemplate.cloneNode(true);

      const cardImage = cardElement.querySelector('.gallery__image');
      const cardTitle = cardElement.querySelector('.gallery__item-title');
  
      cardTitle.textContent = data.name;
      cardImage.src = data.link;
      cardImage.alt = data.name;
  
      cardImage.addEventListener('click', () => {
        
    
        modalImageTitle.textContent = data.name;
        modalImage.src = data.link;
        modalImage.alt = data.name;
    
        toggleModal(imageModal);
      })


    // Card Like Button
    const cardLikeButton = cardElement.querySelector('.gallery__like-button');

    function toggleLikeButton(e) {
        e.target.classList.toggle('gallery__like-button_active');
    }
    cardLikeButton.addEventListener('click', toggleLikeButton);

    const cardDeleteButton = cardElement.querySelector('.gallery__delete-button');

    function deleteCard() {
        list.removeChild(cardElement);
    }

    cardDeleteButton.addEventListener('click', deleteCard);

    return cardElement;
    }

    function renderCard(data) {
        list.prepend(createCard(data));
    }
  
    // Initial Cards
    initialCards.forEach(cardsData => {
        renderCard(cardsData);
    });
  
    function formNewPlaceFunction(e) {
        e.preventDefault();
        renderCard({name: imageTitle.value, link: imageUrl.value });
        imageTitle.value = imageTitle.textContent;
        imageUrl.value = imageUrl.textContent;
        toggleModal(modalNewPlace);
    }
  
    formNewPlace.addEventListener('submit', formNewPlaceFunction);