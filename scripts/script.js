import Card from './card.js';
import { initialCards, validationConfig } from './constants.js';
import FormValidator from './FormValidator.js';


const forms = Array.from(document.querySelectorAll('.edit-form'));

forms.forEach((form) => {
  const formValidator = new FormValidator (validationConfig, form)
  formValidator.enableValidation();
})

const editProfileButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_type_edit');
const userNameElement = document.querySelector('.profile__user-name');
const userOccupationElement = document.querySelector(
  '.profile__user-occupation'
);
const inputTextName = document.querySelector('.edit-form__input_text_name');
const inputTextOccupation = document.querySelector(
  '.edit-form__input_text_occupation'
);
const closeProfileButton = editProfilePopup.querySelector(
  '.popup__close-button'
);
const editProfileForm = editProfilePopup.querySelector('.edit-form');

const addCardPopup = document.querySelector('.popup_type_add');
const addCardButton = document.querySelector('.profile__add-button');
const addCardPopupCloseButton = addCardPopup.querySelector(
  '.popup__close-button'
);
const cardsContainer = document.querySelector('.elements__items');
const addCardForm = addCardPopup.querySelector('.edit-form');
const inputCardHeading = addCardForm.querySelector(
  '.edit-form__input_text_card-heading'
);
const inputCardLink = addCardForm.querySelector(
  '.edit-form__input_text_card-link'
);
const popupList = Array.from(document.querySelectorAll('.popup'));
const cardTemplate = document.querySelector('#elemntsTemplate').content;
const popupImage = document.querySelector('.popup_type_full-image');
const fullImage = popupImage.querySelector('.popup__full-image');
const fullImageTitle = popupImage.querySelector('.popup__image-title');
const closeFullImageButton = popupImage.querySelector('.popup__close-button');
closeFullImageButton.addEventListener('click', function () {
  closePopup(popupImage);
});

addCardForm.addEventListener('submit', handleAddFormSubmit);

function handleEscButton(evt) {
  if (evt.key === 'Escape') {
    const openedElement = document.querySelector('.popup_opened');
    closePopup(openedElement);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscButton);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscButton);
}

popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  userNameElement.textContent = inputTextName.value;
  userOccupationElement.textContent = inputTextOccupation.value;
  closePopup(editProfilePopup);
}

editProfileButton.addEventListener('click', function () {
  openPopup(editProfilePopup);
  inputTextName.value = userNameElement.textContent;
  inputTextOccupation.value = userOccupationElement.textContent;
});

addCardButton.addEventListener('click', function () {
  openPopup(addCardPopup);
  addCardForm.reset();
});

closeProfileButton.addEventListener('click', function () {
  closePopup(editProfilePopup);
});

addCardPopupCloseButton.addEventListener('click', function () {
  closePopup(addCardPopup);
});

editProfileForm.addEventListener('submit', handleEditFormSubmit);

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const card = {
    name: inputCardHeading.value,
    link: inputCardLink.value,
    alt: inputCardHeading.value,
  };
  addNewCard(card);
  closePopup(addCardPopup);
  evt.target.reset();
}

initialCards.forEach((card) => {
  addNewCard(card);
})

function handleCardClick(name, link) {
  fullImage.src = link;
  fullImage.alt = name;
  fullImageTitle.textContent = name;
  openPopup(popupImage); 
}

function createNewCard(card) {
  const newCard = new Card (card, '#elemntsTemplate', handleCardClick);
  return newCard;
}

function addNewCard(card) {
  const cardElement = createNewCard(card);
  cardsContainer.prepend(cardElement.createNewCard());
}