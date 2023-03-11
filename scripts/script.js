const editProfileButton = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector(".popup_type_edit");
const userNameElement = document.querySelector(".profile__user-name");
const userOccupationElement = document.querySelector(
  ".profile__user-occupation"
);
const inputTextName = document.querySelector(".edit-form__input_text_name");
const inputTextOccupation = document.querySelector(
  ".edit-form__input_text_occupation"
);
const closeProfileButton = editProfilePopup.querySelector(
  ".popup__close-button"
);
const editProfileForm = editProfilePopup.querySelector(".edit-form");

const addCardPopup = document.querySelector(".popup_type_add");
const addCardButton = document.querySelector(".profile__add-button");
const addCardPopupCloseButton = addCardPopup.querySelector(
  ".popup__close-button"
);
const cardsContainer = document.querySelector(".elements__items");
const addCardForm = addCardPopup.querySelector(".edit-form");
const inputCardHeading = addCardForm.querySelector(
  ".edit-form__input_text_card-heading"
);
const inputCardLink = addCardForm.querySelector(
  ".edit-form__input_text_card-link"
);
const cardTemplate = document.querySelector("#elemntsTemplate").content;
const openFullImagePopup = document.querySelector(".popup_type_full-image");
const fullImage = openFullImagePopup.querySelector(".popup__full-image");
const fullImageTitle = openFullImagePopup.querySelector(".popup__image-title");
const closeFullImageButton = openFullImagePopup.querySelector(
  ".popup__close-button"
);
closeFullImageButton.addEventListener("click", function () {
  closePopup(openFullImagePopup);
});

addCardForm.addEventListener("submit", handleAddFormSubmit);

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

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  userNameElement.textContent = inputTextName.value;
  userOccupationElement.textContent = inputTextOccupation.value;
  closePopup(editProfilePopup);
}

editProfileButton.addEventListener("click", function () {
  openPopup(editProfilePopup);
  inputTextName.value = userNameElement.textContent;
  inputTextOccupation.value = userOccupationElement.textContent;
});

addCardButton.addEventListener("click", function () {
  openPopup(addCardPopup);
  inputCardHeading.value = '';
  inputCardLink.value = '';
});

closeProfileButton.addEventListener("click", function () {
  closePopup(editProfilePopup);
});

addCardPopupCloseButton.addEventListener("click", function () {
  closePopup(addCardPopup);
});

editProfileForm.addEventListener("submit", handleEditFormSubmit);

function createNewCard(card) {
  const newCard = cardTemplate.querySelector(".elements__item").cloneNode(true);
  const cardHeading = newCard.querySelector(".elements__title");
  const cardImage = newCard.querySelector(".elements__image");
  const likeButton = newCard.querySelector(".elements__like-button");
  likeButton.addEventListener("click", handleLikeButton);
  const deleteButton = newCard.querySelector(".elements__delete-button");
  deleteButton.addEventListener("click", handleDeleteButton);
  cardImage.addEventListener("click", openFullImage);
  cardHeading.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.alt;
  return newCard;
}

function addNewCard(item) {
  const cardElement = createNewCard(item);
  cardsContainer.prepend(cardElement);
}

initialCards.forEach(addNewCard);

function handleLikeButton(evt) {
  evt.target.classList.toggle("elements__like-button_active");
}
function handleDeleteButton(evt) {
  evt.target.closest(".elements__item").remove();
}

function openFullImage(evt) {
  const card = evt.target.closest(".elements__item");
  const cardText = card.querySelector(".elements__title");
  fullImage.src = evt.target.src;
  fullImage.alt = cardText.textContent;
  fullImageTitle.textContent = cardText.textContent;
  openPopup(openFullImagePopup);
}


