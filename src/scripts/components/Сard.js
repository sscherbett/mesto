export default class Card {
  constructor(data, templateSelector, handleCardClick, handleCardLike, userId, handleDelete) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this.cardId = data._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDelete;
    this._handleCardLike = handleCardLike;
    this._ownerId = data.owner._id;
    this._userId = userId; 
  }
  
  _getTemplate() {
    return document
        .querySelector(this._templateSelector)
        .content.querySelector('.elements__item')
        .cloneNode(true);
  }
 
  deleteCard(){
    this._card.remove();
    this._card = null;
  }

  setLike() {
    this._likeButton.classList.add('elements__like-button_active');
  }

  removeLike() {
    this._likeButton.classList.remove('elements__like-button_active');
  }

  isLiked() {
    return this._likes.some((elem) => elem._id === this._userId)
  }

  countLikes(data) {
    this._likeCounter.textContent = data.likes.length;
    this._likes = data.likes;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleCardLike(this)
    })
    if(this._card.contains(this._deleteButton)) {
      this._deleteButton.addEventListener('click', () => {
      this._handleDelete(this)
    })
  }
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
  
    this._likeCounter = this._card.querySelector('.elements__likes');
    this._likeButton = this._card.querySelector('.elements__like-button');
    this._deleteButton = this._card.querySelector('.elements__delete-button');

    this._likeCounter.textContent = this._likes.length;
    if (this.isLiked()) {
      this.setLike();
    }
   if(this._ownerId !== this._userId) {
    this._deleteButton.remove();
   }

    this._setEventListeners();
  
    return this._card;
  }
} 