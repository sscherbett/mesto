export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }
  
  _getTemplate() {
    return document
        .querySelector(this._templateSelector)
        .content.querySelector('.elements__item')
        .cloneNode(true);
  }

  _handleCardLike() {
    this._likeButton.classList.toggle('elements__like-button_active');
  }

  _handleDelete() {
    this._card.remove();
    this._card = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleCardLike()
    })
    this._deleteButton.addEventListener('click', () => {
      this._handleDelete()
    })
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    })
  }
  
  createNewCard() {
    this._card = this._getTemplate();
  
    this._image = this._card.querySelector('.elements__image');
    this._image.src = this._link;
    this._image.alt = this._name;
  
    this._card.querySelector('.elements__title').textContent = this._name;
  
    this._likeButton = this._card.querySelector('.elements__like-button');
    this._deleteButton = this._card.querySelector('.elements__delete-button');
      
    this._setEventListeners();
  
    return this._card;
  }
} 