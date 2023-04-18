export default class UserInfo {
    constructor({userNameSelector, userOccupationSelector}) {
        this._userName = document.querySelector(userNameSelector);
        this._userOccupation = document.querySelector(userOccupationSelector);
    }

    getUserInfo() {
        const userInfo = {
          name: this._userName.textContent,
          occupation: this._userOccupation.textContent
        }
        return userInfo;
      }

    setUserInfo(userData) {
        this._userName.textContent = userData.name;
        this._userOccupation.textContent = userData.occupation;
    }
}