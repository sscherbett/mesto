import Card from '../scripts/components/Сard.js';
import {
  initialCards,
  validationConfig,
  forms,
  buttonEditProfile,
  inputTextName,
  inputTextOccupation,
  buttonAddCard,
} from '../scripts/constants.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import './index.css';

forms.forEach((form) => {
  const formValidator = new FormValidator(validationConfig, form);
  formValidator.enableValidation();
});

const formEditProfile = new PopupWithForm(
  '.popup_type_edit',
  handleEditFormSubmit
);
formEditProfile.setEventListeners();

function handleEditFormSubmit(userData) {
  user.setUserInfo(userData);
}

const user = new UserInfo({
  userNameSelector: '.profile__user-name',
  userOccupationSelector: '.profile__user-occupation',
});

buttonEditProfile.addEventListener('click', () => {
  formEditProfile.open();
  const userInfo = user.getUserInfo();

  inputTextName.value = userInfo.name;
  inputTextOccupation.value = userInfo.occupation;
});

const formCard = new PopupWithForm('.popup_type_add', handleAddFormSubmit);
formCard.setEventListeners();

function handleAddFormSubmit(cardData) {
  rendererCard(cardData);
}


buttonAddCard.addEventListener('click', () => {
  formCard.open();
});

const popupFullImage = new PopupWithImage('.popup_type_full-image');
popupFullImage.setEventListeners();

function handleCardClick(name, link) {
  popupFullImage.open(name, link);
}

const section = new Section(
  { items: initialCards, renderer: rendererCard },
  '.elements__items'
);
section.renderItems();

function rendererCard(item) {
  const cardElement = new Card(item, '#elementsTemplate', handleCardClick);
  const newCard = cardElement.createNewCard();
  section.addItem(newCard);
}
