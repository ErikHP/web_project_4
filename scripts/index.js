
const editFormButton = document.querySelector('.profile__button_type_edit');
const closeFormButton = document.querySelector('.modal__close-button');
const modal = document.querySelector('.modal');
const form = document.querySelector('.modal__form');
const nameInput = document.querySelector('.modal__input_type_name');
const professionInput = document.querySelector('.modal__input_type_profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');



function openModal() {
    
    nameInput.value = profileName.textContent;
    professionInput.value = profileProfession.textContent;
    modal.classList.add('modal_open');

};

function closeModal() {
    modal.classList.remove('modal_open');
};



editFormButton.addEventListener('click', openModal);

closeFormButton.addEventListener('click', closeModal);

form.addEventListener('submit', function(e) {
    e.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = professionInput.value;
    closeModal();
});

