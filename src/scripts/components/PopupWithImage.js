import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__full-image');
    this._popupName = this._popup.querySelector('.popup__image-title');
  }
  open(imageName, imageLink) {
    super.open();
    this._popupImage.src = imageLink;
    this._popupImage.alt = imageName;
    this._popupName.textContent = imageName;
  }
}
