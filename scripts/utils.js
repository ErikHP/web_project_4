export function toggleModal(tmodal) {
    if (!tmodal.classList.contains('modal_open')) {
        tmodal.addEventListener('click', overlayClosing);
        window.addEventListener('keydown', escButtonClosing);
    } else {
        tmodal.removeEventListener('click', overlayClosing);
        window.removeEventListener('keydown', escButtonClosing);
    }
    tmodal.classList.toggle('modal_open');
}

export function overlayClosing(evt) {
    toggleModal(evt.target);
}

export function escButtonClosing(evt) {
    if (evt.key === "Escape") {
        const openModal = document.querySelector('.modal_open');
        toggleModal(openModal);

    }
}