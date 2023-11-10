import moment, {Moment} from 'moment-timezone';
import {memberTypeConst, SUNDAY} from "@frameworks/mobile/utils/const";

export function momentToSec(mnt: any) {
  return (mnt.get('h') * 60 * 60 + mnt.get('m') * 60 + mnt.get('s')) * 1000
}
export function isSunday():boolean {
  return moment.utc().format('ddd') === SUNDAY
}

export function isUnLimitMemberShip(memberShipTypeName:string):boolean {
  if(!memberShipTypeName) return false;
  return (
    memberShipTypeName.toLowerCase() === memberTypeConst.SCHOOL.toLowerCase() ||
    memberShipTypeName.toLowerCase() === memberTypeConst.PREMIUM.toLowerCase() ||
    memberShipTypeName.toLowerCase() === memberTypeConst.STANDARD.toLowerCase() || 
    memberShipTypeName.toLowerCase() === memberTypeConst.PRO.toLowerCase() 
  )
}
export function enumerateDaysBetweenDates(startDate: Moment, endDate: Moment) {
  let dates = [];

  let currDate = startDate.startOf('day');
  let lastDate = endDate.startOf('day');
  dates.push(currDate.clone());
  while(currDate.add(1, 'days').diff(lastDate) <= 0) {
    dates.push(currDate.clone());
  }
  return dates;
};

export function getDefaultLocale() {
  return {
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
    today: 'Today'
  }
}

export function Emailvalidation(email: any){
  const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/
  return regEx.test(email)
}
