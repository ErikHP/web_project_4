function showErrorMessage(input, form, {errorClass,inputErrorClass, ...rest}) {
    const error = document.querySelector('#' + input.id + '-error');
    error.textContent = input.validationMessage;

    error.classList.add(errorClass);
    input.classList.add(inputErrorClass);

}

function hideErrorMessage(input, form, {errorClass,inputErrorClass, ...rest}) {
    const error = document.querySelector('#' + input.id + '-error');
    error.textContent = '';

    error.classList.remove(errorClass);
    input.classList.remove(inputErrorClass);

}



function checkInputValidity(input, form, rest) {
    if (input.validity.valid) {
        //hideErrorMessage()
        hideErrorMessage(input, form, rest);
    } else {
        //showErrorMessage()
        showErrorMessage(input, form, rest);
    }
}

function toggleButtonState(inputs, button, {inactiveButtonClass, ...rest}) {
    const isValid = inputs.every((input) => input.validity.valid)
    if (isValid) {
        button.classList.remove(inactiveButtonClass);
        button.disabled = false;
    } else {
        button.classList.add(inactiveButtonClass);
        button.disabled = true;
    }
}

function enableValidation({formSelector, inputSelector, submitButtonSelector,...rest}) {
    const forms = [...document.querySelectorAll(formSelector)];

    forms.forEach((form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
        })

        const inputs = [...form.querySelectorAll(inputSelector)];
        const button = form.querySelector(submitButtonSelector);

        inputs.forEach((input) => {
            input.addEventListener('input', () => {
                //checkInputValidity
                checkInputValidity(input, form, rest);
                //toggleButtonState
                toggleButtonState(inputs, button, rest);
            })
        })
    });
}


enableValidation({
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__save",
    inactiveButtonClass: "modal__save_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
  }); 