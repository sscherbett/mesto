const showInputError = (
  input,
  errorTextElement,
  errorClassVisible,
  inputErrorClass
) => {
  errorTextElement.classList.add(errorClassVisible);
  errorTextElement.textContent = input.validationMessage;
  input.classList.add(inputErrorClass);
};

const hideInputError = (
  input,
  errorTextElement,
  errorClassVisible,
  inputErrorClass
) => {
  errorTextElement.classList.remove(errorClassVisible);
  errorTextElement.textContent = '';
  input.classList.remove(inputErrorClass);
};

const disableSubmitButton = (submitButton, inactiveButtonClass) => {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
};

const enableSubmitButton = (submitButton, inactiveButtonClass) => {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
};

const checkInputValidity = (
  input,
  errorSelectorTemplate,
  errorClassVisible,
  inputErrorClass
) => {
  const errorTextElement = document.querySelector(
    `${errorSelectorTemplate}${input.name}`
  );
  if (!input.validity.valid) {
    showInputError(input, errorTextElement, errorClassVisible, inputErrorClass);
  } else {
    hideInputError(input, errorTextElement, errorClassVisible, inputErrorClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (submitButton, inputList, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(submitButton, inactiveButtonClass);
  } else {
    enableSubmitButton(submitButton, inactiveButtonClass);
  }
};

const setEventListeners = (
  form,
  {
    inputSelector,
    errorSelectorTemplate,
    errorClassVisible,
    submitButtonSelector,
    inputErrorClass,
    inactiveButtonClass,
  }
) => {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  const submitButton = form.querySelector(submitButtonSelector);

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });

  form.addEventListener('reset', function () {
    disableSubmitButton(submitButton, inactiveButtonClass);
  });

  toggleButtonState(submitButton, inputList, inactiveButtonClass);

  inputList.forEach((input) => {
    input.addEventListener('input', (evt) => {
      checkInputValidity(
        input,
        errorSelectorTemplate,
        errorClassVisible,
        inputErrorClass
      );
      toggleButtonState(submitButton, inputList, inactiveButtonClass);
    });
  });
};

const enableValidation = ({ formSelector, ...rest }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((form) => {
    setEventListeners(form, rest);
  });
};

enableValidation({
  formSelector: '.edit-form',
  inputSelector: '.edit-form__input',
  submitButtonSelector: '.popup__saved',
  inactiveButtonClass: 'popup__saved_disabled',
  inputErrorClass: 'edit-form__input_text_error',
  errorClassVisible: 'edit-form__input-error_visible',
  errorSelectorTemplate: '.edit-form__input-error_text_',
});
