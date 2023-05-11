import Card from '../scripts/components/Сard.js';
import {
  initialCards,
  validationConfig,
  forms,
  buttonEditProfile,
  inputTextName,
  inputTextOccupation,
  buttonAddCard,
  formChangeAvatar,
  buttonEditAvatar,
} from '../scripts/constants.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import './index.css';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: 'df44f4a0-60b5-4152-b6a5-797afe96327f',
    'Content-Type': 'application/json',
  },
});

let userId;

api
  .getPromiseAll()
  .then((data) => {
    const [cards, userInfo] = data;
    userId = userInfo._id;
    user.setUserInfo(userInfo);
    section.renderItems(cards);
  })
  .catch((err) => {
    console.error(`Ошибка:${err}`);
  });

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
  formEditProfile.renderLoading(true);
  api
    .editProfile(userData)
    .then((res) => {
      user.setUserInfo(res);
      formEditProfile.close();
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally(() => {
      formEditProfile.renderLoading(false);
    });
}

const user = new UserInfo({
  userNameSelector: '.profile__user-name',
  userOccupationSelector: '.profile__user-occupation',
  userAvatarSelector: '.profile__avatar',
});

buttonEditProfile.addEventListener('click', () => {
  formEditProfile.open();
  const userInfo = user.getUserInfo();
  inputTextName.value = userInfo.name;
  inputTextOccupation.value = userInfo.about;
});

const formCard = new PopupWithForm('.popup_type_add', handleAddFormSubmit);
formCard.setEventListeners();

function handleAddFormSubmit(cardData) {
  formCard.renderLoading(true);
  api
    .addNewCard(cardData)
    .then((res) => {
      rendererCard(res);
      formCard.close();
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally(() => {
      formCard.renderLoading(false);
    });
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

function rendererCard(item) {
  section.addItem(createCard(item));
}

function createCard(item) {
  const cardElement = new Card(
    item,
    '#elementsTemplate',
    handleCardClick,
    handleCardLike,
    userId,
    handleDelete
  );
  const card = cardElement.createNewCard();
  return card;
}

const editAvatar = new PopupWithForm('.popup_type_avatar-edit', changeAvatar);
editAvatar.setEventListeners();

const avatarValidation = new FormValidator(validationConfig, formChangeAvatar);

buttonEditAvatar.addEventListener('click', () => {
  editAvatar.open();
  avatarValidation.enableValidation();

});

function changeAvatar(data) {
  editAvatar.renderLoading(true);
  api
    .addAvatar(data)
    .then((res) => {
      document.querySelector('.profile__avatar').src = res.avatar;
      editAvatar.close();
    })
    .catch((error) => console.log(`Ошибка: ${error}`))
    .finally(() => {
      editAvatar.renderLoading(false);
    });
}

function handleCardLike(card) {
  if (card.isLiked()) {
    api
      .removeLikeCard(card.cardId)
      .then((response) => {
        card.removeLike();
        card.countLikes(response);
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  } else {
    api
      .setLikeCard(card.cardId)
      .then((response) => {
        card.setLike();
        card.countLikes(response);
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }
}

const confirmationPopup = new PopupWithConfirmation('.popup_type_submit');
confirmationPopup.setEventListeners();

function handleDelete(card) {
  function deleteCard() {
    api
      .handleDeleteButton(card.cardId)
      .then(() => {
        card.deleteCard();
        confirmationPopup.close();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }
  confirmationPopup.setSubmitAction(deleteCard);
  confirmationPopup.open();
}
