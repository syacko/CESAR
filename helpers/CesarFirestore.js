import CesarDate from './CesarDate';
import CesarUserInfo from './CesarUserInfo';

export default class CesarFirestore {
  static myInstance = null;
  static cFirestore = null;
  ErrorMessage = null;
  cDate = new CesarDate();

  /**
   * @returns {CesarUserInfo}
   */
  static getInstance() {
    if (CesarFirestore.myInstance == null) {
      CesarFirestore.myInstance = new CesarFirestore();
    }
    return this.myInstance;
  }

  static setFirestore(myFirestore) {
    if (CesarFirestore.myInstance == null) {
      CesarFirestore.myInstance = new CesarFirestore();
      CesarFirestore.cFirestore = myFirestore;
    }
    return this.myInstance;
  }

  static getFirestore() {
    return CesarFirestore.cFirestore;
  }

  getErrMessage() {
    return this.cFSErrMessage;
  }

  saveLoginDetails(cUser) {
    try {
      let usersFS = CesarFirestore.getFirestore().collection('users');
      usersFS.doc(cUser.getUserId()).set({
        givenName: cUser.getGivenName(),
        familyName: cUser.getFamilyName(),
        fullName: cUser.getName(),
        email: cUser.getEmail(),
        lastLogin: this.cDate.getDateTime(),
      });
    } catch (error) {
      this.ErrorMessage = error.message;
    }
  }

  async readAvailability(cUser) {
    let tuesdayDate = new CesarDate().getTuesday();
    let availableRef = CesarFirestore.getFirestore().collection('available');
    let snapshot = await availableRef
      .where('tuesdayDate', '==', tuesdayDate)
      .where('userId', '==', cUser.getUserId())
      .get()
      .catch(err => {
        console.log('Error getting documents', err);
      });
    if (snapshot.empty) {
      console.log('No matching documents.');
      cUser.setTuesdayAvailability('not_been_reported');
      return 'not_been_reported';
    }
    snapshot.forEach(doc => {
      console.log('status is ' + doc.get('status'));
      cUser.setTuesdayAvailability(doc.get('status'));
      return doc.get('status');
    });
  }

  saveAvailability(cUser, status) {
    try {
      let availableFS = CesarFirestore.getFirestore().collection('available');
      let tuesdayDate = new CesarDate().getTuesday();
      let timestamp = new CesarDate().getDateTime();
      availableFS.doc(tuesdayDate).set({
        tuesdayDate: tuesdayDate,
        userId: cUser.getUserId(),
        givenName: cUser.getGivenName(),
        familyName: cUser.getFamilyName(),
        email: cUser.getEmail(),
        status: status,
        timestamp: timestamp,
      });
    } catch (error) {
      this.ErrorMessage = error.message;
    }
  }
}
