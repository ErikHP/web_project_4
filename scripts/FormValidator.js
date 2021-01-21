class FormValidator {
    constructor(settings, form) {
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
        this._form = form;
    }

    _showErrorMessage(input, errorMessage) {
        const error = this._form.querySelector('#' + input.id + '-error');
        error.classList.add(this._errorClass);
        input.classList.add(this._inputErrorClass);
        error.textContent = errorMessage;
    }

    _hideErrorMessage(input) {
        const error = this._form.querySelector('#' + input.id + '-error');
        error.classList.remove(this._errorClass);
        input.classList.remove(this._inputErrorClass);
        error.textContent = '';
    }

    _checkInputValidity(input) {
        if (input.validity.valid) {
            //hideErrorMessage()
            this._hideErrorMessage(input);
        } else {
            //showErrorMessage()
            this._showErrorMessage(input);
        }
    }

    _toggleButtonState() {
        const isValid = inputs.every((input) => input.validity.valid)
        if (isValid) {
            button.classList.remove(this._inactiveButtonClass);
            button.disabled = false;
        } else {
            button.classList.add(this._inactiveButtonClass);
            button.disabled = true;
        }
    }

    _inputEventListeners(){
        const inputs = [...this._form.querySelectorAll(this._inputSelector)];
        const button = this._form.querySelector(this._submitButtonSelector);

        inputs.forEach((input) => {
            input.addEventListener('input', () => {
                //checkInputValidity
                this._checkInputValidity(input);
                //toggleButtonState
                this._toggleButtonState(inputs, button, this._inactiveButtonClass);
            })
        })
    }

    
    enableValidation() {
               
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
        })
    }
}


export default FormValidator;
