class FormValidator {
    constractor(settings, form) {
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
        this._form = form;
    }

    _showErrorMessage(input, form, {errorClass,inputErrorClass, ...rest}) {
        const error = document.querySelector('#' + input.id + '-error');
        error.textContent = input.validationMessage;

        error.classList.add(this._errorClass);
        input.classList.add(this._inputErrorClass);
    }

    _hideErrorMessage(input, form, {errorClass,inputErrorClass, ...rest}) {
        const error = document.querySelector('#' + input.id + '-error');
        error.textContent = '';
    
        error.classList.remove(this._errorClass);
        input.classList.remove(this._inputErrorClass);
    }

    _checkInputValidity(input, form, rest) {
        if (input.validity.valid) {
            //hideErrorMessage()
            hideErrorMessage(input, form, rest);
        } else {
            //showErrorMessage()
            showErrorMessage(input, form, rest);
        }
    }

    _toggleButtonState(inputs, button, {inactiveButtonClass, ...rest}) {
        const isValid = inputs.every((input) => input.validity.valid)
        if (isValid) {
            button.classList.remove(this._inactiveButtonClass);
            button.disabled = false;
        } else {
            button.classList.add(this._inactiveButtonClass);
            button.disabled = true;
        }
    }

    enableValidation({formSelector, inputSelector, submitButtonSelector,...rest}) {
        

        
        this._form.addEventListener('submit', (e) => {
                e.preventDefault();
            })

            const inputs = [...this._form.querySelectorAll(this._inputSelector)];
            const button = this._form.querySelector(this._submitButtonSelector);

            inputs.forEach((input) => {
                input.addEventListener('input', () => {
                    //checkInputValidity
                    checkInputValidity(input, this._form, rest);
                    //toggleButtonState
                    toggleButtonState(inputs, button, rest);
                })
            })
        
    }







}

