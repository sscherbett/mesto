const editProfileButton = document.querySelector(".profile__edit-button");
const editProfile = document.querySelector(".popup");
const userNameElement = document.querySelector(".profile__user-name");
const userOccupationElement = document.querySelector(
  ".profile__user-occupation"
);
const inputTextName = document.querySelector(".edit-form__input_text_name");
const inputTextOccupation = document.querySelector(
  ".edit-form__input_text_occupation"
);
const closeProfileButton = document.querySelector(".popup__close-button");
const formElement = document.querySelector(".edit-form");

function openPopup() {
  editProfile.classList.add("popup_opened");
  inputTextName.value = userNameElement.textContent;
  inputTextOccupation.value = userOccupationElement.textContent;
}

function closePopup() {
  editProfile.classList.remove("popup_opened");
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  userNameElement.textContent = inputTextName.value;
  userOccupationElement.textContent = inputTextOccupation.value;
  closePopup();
}

editProfileButton.addEventListener("click", openPopup);

closeProfileButton.addEventListener("click", closePopup);

formElement.addEventListener("submit", handleFormSubmit);
