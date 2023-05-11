export default class FormValidator {
  constructor(validationConfig, form) {
    this._validationConfig = validationConfig;
    this._form = form;
  }

  _showInputError(input) {
    this._errorTextElement.classList.add(
      this._validationConfig.errorClassVisible
    );
    this._errorTextElement.textContent = input.validationMessage;
    input.classList.add(this._validationConfig.inputErrorClass);
  }

  _hideInputError(input) {
    this._errorTextElement.classList.remove(
      this._validationConfig.errorClassVisible
    );
    this._errorTextElement.textContent = '';
    input.classList.remove(this._validationConfig.inputErrorClass);
  }

  _disableSubmitButton() {
    this._submitButton.classList.add(this._validationConfig.inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableSubmitButton() {
    this._submitButton.classList.remove(this._validationConfig.inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _checkInputValidity(input) {
    this._errorTextElement = this._form.querySelector(
      `${this._validationConfig.errorSelectorTemplate}${input.name}`
    );

    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  _setEventListeners() {

    this._inputList = Array.from(this._form.querySelectorAll(
      this._validationConfig.inputSelector
    ));

    this._submitButton = this._form.querySelector(
      this._validationConfig.submitButtonSelector
    );

    this._form.addEventListener('reset', () => {
      this._disableSubmitButton();
    });

    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
    this._toggleButtonState();
  }
}
