import Card from './Сard.js';
import { initialCards, validationConfig } from './constants.js';
import FormValidator from './FormValidator.js';


const forms = Array.from(document.querySelectorAll('.edit-form'));

forms.forEach((form) => {
  const formValidator = new FormValidator (validationConfig, form)
  formValidator.enableValidation();
})

const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const userNameElement = document.querySelector('.profile__user-name');
const userOccupationElement = document.querySelector(
  '.profile__user-occupation'
);
const inputTextName = document.querySelector('.edit-form__input_text_name');
const inputTextOccupation = document.querySelector(
  '.edit-form__input_text_occupation'
);
const buttonCloseProfile = popupEditProfile.querySelector(
  '.popup__close-button'
);
const formEditProfile = popupEditProfile.querySelector('.edit-form');

const popupAddCard = document.querySelector('.popup_type_add');
const buttonAddCard = document.querySelector('.profile__add-button');
const popupAddCardCloseButton = popupAddCard.querySelector(
  '.popup__close-button'
);
const cardsContainer = document.querySelector('.elements__items');
const formAddCard = popupAddCard.querySelector('.edit-form');
const inputCardHeading = formAddCard.querySelector(
  '.edit-form__input_text_card-heading'
);
const inputCardLink = formAddCard.querySelector(
  '.edit-form__input_text_card-link'
);
const popupList = Array.from(document.querySelectorAll('.popup'));
const cardTemplate = document.querySelector('#elemntsTemplate').content;
const popupImage = document.querySelector('.popup_type_full-image');
const fullImage = popupImage.querySelector('.popup__full-image');
const fullImageTitle = popupImage.querySelector('.popup__image-title');
const buttonCloseFullImage = popupImage.querySelector('.popup__close-button');
buttonCloseFullImage.addEventListener('click', function () {
  closePopup(popupImage);
});

formAddCard.addEventListener('submit', handleAddFormSubmit);

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
    if (evt.target.classList.contains('popup_opened' || 'popup__close-button')) {
      closePopup(popup);
    }
  });
});

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  userNameElement.textContent = inputTextName.value;
  userOccupationElement.textContent = inputTextOccupation.value;
  closePopup(popupEditProfile);
}

buttonEditProfile.addEventListener('click', function () {
  openPopup(popupEditProfile);
  inputTextName.value = userNameElement.textContent;
  inputTextOccupation.value = userOccupationElement.textContent;
});

buttonAddCard.addEventListener('click', function () {
  openPopup(popupAddCard);
  formAddCard.reset();
});

buttonCloseProfile.addEventListener('click', function () {
  closePopup(popupEditProfile);
});

popupAddCardCloseButton.addEventListener('click', function () {
  closePopup(popupAddCard);
});

formEditProfile.addEventListener('submit', handleEditFormSubmit);

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const card = {
    name: inputCardHeading.value,
    link: inputCardLink.value,
  };
  addNewCard(card);
  closePopup(popupAddCard);
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
  return new Card(card, '#elemntsTemplate', handleCardClick);
}

function addNewCard(card) {
  const cardElement = createNewCard(card);
  cardsContainer.prepend(cardElement.createNewCard());
}