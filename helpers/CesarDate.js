export default class CesarDate {
  getDisplayDate = () => {
    const day = new Date()
      .getDate()
      .toString()
      .padStart(2, '0');
    let month = new Date().getMonth() + 1;
    month = month.toString().padStart(2, '0');
    let year = new Date().getFullYear(); //Current Year
    return month + '/' + day + '/' + year;
  };

  getDisplayTime = () => {
    const hour = new Date()
      .getHours()
      .toString()
      .padStart(2, '0');
    const min = new Date()
      .getMinutes()
      .toString()
      .padStart(2, '0');
    const sec = new Date()
      .getSeconds()
      .toString()
      .padStart(2, '0');
    return hour + ':' + min + ':' + sec;
  };

  getDateTime = () => {
    return this.getDisplayDate() + ' ' + this.getDisplayTime();
  };

  getDisplayTuesday() {
    let dayAdjustment = null;
    let d = new Date();
    switch (d.getDay()) {
      case 0:
        dayAdjustment = -5;
        break;
      case 1:
        dayAdjustment = -6;
        break;
      case 0:
        dayAdjustment = 0;
        break;
      case 0:
        dayAdjustment = -1;
        break;
      case 0:
        dayAdjustment = -2;
        break;
      case 0:
        dayAdjustment = -3;
        break;
      case 0:
        dayAdjustment = -4;
        break;
    }
    d.setDate(d.getDate() + dayAdjustment);
    let tuesdayParts = d.toLocaleString().split('/');
    tuesdayParts[2] = tuesdayParts[2].substring(
      0,
      tuesdayParts[2].indexOf(','),
    );
    const tuesdayMonth = tuesdayParts[0].toString().padStart(2, '0');
    const tuesdayDay = tuesdayParts[1].toString().padStart(2, '0');
    const tuesdayYear = tuesdayParts[2].toString().padStart(2, '0');
    return tuesdayMonth + '/' + tuesdayDay + '/' + tuesdayYear;
  }

  getTuesday() {
    let tuesdayParts = this.getDisplayTuesday().split('/');
    return tuesdayParts[2] + '-' + tuesdayParts[0] + '-' + tuesdayParts[1];
  }
}
