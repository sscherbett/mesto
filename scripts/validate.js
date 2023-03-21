const showInputError = (errorTextElement, validationMessage, errorClass) => {
  errorTextElement.textContent = validationMessage;
  errorTextElement.classList.add(errorClass);
};

const hideInputError = (errorTextElement, errorClass) => {
  errorTextElement.classList.remove(errorClass);
  errorTextElement.textContent = '';
};

const disableButton = (submitButton) => {
submitButton.classList.add();
submitButton.disabled = true; 
}

const enableButton = (submitButton) => {
    submitButton.classList.remove();
    submitButton.disabled = false; 
    } 

const checkInputValidity = (input, errorClassTemplate, errorClass) => {
  const errorTextElement = document.querySelector(
    `${errorClassTemplate}${input.name}`
  );
  if (!input.validity.valid) {
    showInputError(errorTextElement, input.validationMessage, errorClass);
  } else {
    hideInputError();
  }
};

const hasInvalidInput = (inputList) => {
return Array.from(inputList).some ((input) => ! input.validity.valid)
}

const toggleButtonState = (submitButton, inputList) => {
    if(!hasInvalidInput(inputList)) {
        enableButton(submitButton)
    } else {
        disableButton(submitButton)
    }
    };

const setEventListeners = (
  form,
  inputList,
  errorClassTemplate,
  errorClass,
  submitButton
) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  inputList.forEach((input) => {
    input.addEventListener('input', (evt) => {
      checkInputValidity(input, errorClassTemplate, errorClass);
      toggleButtonState(submitButton, inputList);
    });
  });
};

const enableValidation = (config ) => {
  const form = document.querySelectorAll(config.formSelector);
  const inputList = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelectorAll(config.submitButtonSelector);

  setEventListeners(
    form,
    inputList,
    config.errorClassTemplate,
    config.errorClass
  );
};

enableValidation({
  formSelector: '.edit-form',
  inputSelector: '.edit-form__input',
  submitButtonSelector: '.popup__saved',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'edit-form__input-error',
  errorClassTemplate: '.edit-form__input-error_text_',
});
