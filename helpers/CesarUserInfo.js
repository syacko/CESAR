import CesarDate from './CesarDate';

export default class CesarUserInfo {
  static myInstance = null;
  userId = null;
  name = null;
  givenName = null;
  familyName = null;
  email = null;
  photo = null;
  tuesdayAvailability = null;
  tuesdayAvailabilityTS = null;

  /**
   * @returns {CesarUserInfo}
   */
  static getInstance() {
    if (CesarUserInfo.myInstance == null) {
      CesarUserInfo.myInstance = new CesarUserInfo();
    }
    return this.myInstance;
  }

  clearUserInfo() {
    this.userId = null;
    this.name = null;
    this.givenName = null;
    this.familyName = null;
    this.email = null;
    this.photo = null;
  }

  setUserInfo(
    userId,
    userName,
    userGivenName,
    userFamilyName,
    userEmail,
    userPhoto,
  ) {
    this.userId = userId;
    this.name = userName;
    this.givenName = userGivenName;
    this.familyName = userFamilyName;
    this.email = userEmail;
    this.photo = userPhoto;
  }

  setTuesdayAvailability(availability) {
    this.tuesdayAvailability = availability;
    this.tuesdayAvailabilityTS = new CesarDate().getDateTime();
    console.log('Inside UserInfo:' + JSON.stringify(this));
  }

  getUserId() {
    return this.userId;
  }

  getName() {
    return this.name;
  }

  getGivenName() {
    return this.givenName;
  }

  getFamilyName() {
    return this.familyName;
  }

  getEmail() {
    return this.email;
  }

  getPhoto() {
    return this.photo;
  }

  getTuesdayAvailability() {
    return this.tuesdayAvailability;
  }

  getTuesdayAvailabilityTS() {
    return this.tuesdayAvailabilityTS;
  }
}
