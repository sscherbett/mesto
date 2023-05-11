export default class UserInfo {
    constructor({userNameSelector, userOccupationSelector, userAvatarSelector}) {
        this._userName = document.querySelector(userNameSelector);
        this._userOccupation = document.querySelector(userOccupationSelector);
        this._userAvatar = document.querySelector(userAvatarSelector);
    }

    getUserInfo() {
        const userInfo = {
          name: this._userName.textContent,
          about: this._userOccupation.textContent,
          avatar: this._userAvatar.src
        }
        return userInfo;
      }

    setUserInfo(userData) {
        this._userName.textContent = userData.name;
        this._userOccupation.textContent = userData.about;
        this._userAvatar.src = userData.avatar;
    }
}