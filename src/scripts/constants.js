export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Панорамный вид на горы Архыза',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Вид на засенженное лесное озеро',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Панельки и серость в предзакатом городе',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Вулкан на ка Камчатке',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Железная дорога сквозь деревья',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Зимнее и замерзшее озеро Байкал',
  },
];

export const validationConfig = {
  formSelector: '.edit-form',
  inputSelector: '.edit-form__input',
  submitButtonSelector: '.popup__saved',
  inactiveButtonClass: 'popup__saved_disabled',
  inputErrorClass: 'edit-form__input_text_error',
  errorClassVisible: 'edit-form__input-error_visible',
  errorSelectorTemplate: '.edit-form__input-error_text_',
};

export const forms = Array.from(document.querySelectorAll('.edit-form'));
export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const inputTextName = document.querySelector('.edit-form__input_text_name');
export const inputTextOccupation = document.querySelector(
  '.edit-form__input_text_occupation'
);
export const buttonAddCard = document.querySelector('.profile__add-button');
export const formAddCard = document.querySelector('.edit-form_type_card');
export const formChangeAvatar = document.querySelector('.edit-form_type_avatar');
export const buttonEditAvatar = document.querySelector('.profile__avatar-container');

