export class UserInfo {
  constructor({name, about,avatar,formName,formJob}) {
    this._userName = document.querySelector(name);
    this._userJob = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
    this._formName = document.querySelector(formName);
    this._formJob = document.querySelector(formJob);
    this._userId = null;
  }

  getUserInfo() {
    return {
    name: this._userName.textContent,
    about: this._userJob.textContent, 
    avatar: this._avatar.src
    } 
  }
  
  setUserInfo(data){
    this._userName.textContent = data.name,
    this._userJob.textContent = data.about,
    this._avatar.src = data.avatar,
    this._formName.value = data.name;
    this._formJob.value = data.about;
  }

  getUserId() {
    return this._userId;
  }

  setUserId(userId) {
    this._userId = userId;
  }

}