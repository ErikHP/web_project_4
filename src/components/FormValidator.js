class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
  }
  // Private Show Error Message Function
  _showErrorMessage(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.classList.add(this._settings.errorClass);
    errorElement.textContent = errorMessage;
  }

  // Private Hide Error Message Function
  _hideErrorMessage(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = '';
  }

  // Private isValid(Inputs) Function
  _isValid(inputList) {
    return inputList.every((inputElement) => {
      return inputElement.validity.valid;
    });
  }

  // Private Check Inputs Validity Function
  checkInputValidity(inputElement) {
    if(inputElement.validity.valid) {
      this._hideErrorMessage(inputElement);
    }else {
      this._showErrorMessage(inputElement, inputElement.validationMessage);
    }
  }

  disableSubmitButton() {
    
    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(this._settings.inactiveButtonClass);
  }

  // Private Toggle Button State Function
  _toggleButtonState() {
   

      if(this._isValid(this._inputList)) {
        this._buttonElement.disabled = false;
        this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
      }else {
        this.disableSubmitButton();
    }
  }

  // Private Inputs Event Lister
  _inputEventListeners() {
    

    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this.checkInputValidity(inputElement);
        this._toggleButtonState(this._inputList, this._buttonElement,  this._settings.inactiveButtonClass);
      });
    });
  }
  // Clearing Error Method
  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideErrorMessage(inputElement);
    });

    this._toggleButtonState();
  }


  // Public Enable Validation Function
  enableValidation() {
    this._formElement.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    this._inputEventListeners();
  }
}

export default FormValidator;