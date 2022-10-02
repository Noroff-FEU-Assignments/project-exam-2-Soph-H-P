import type { Moment } from 'moment';

/**
 * takes two moment objects and compares them to see if they are the same date
 * is used when populating the events calendar, if there is more than one event
 * on the same day
 * @param {Moment} dateOne
 * @param {Moment} dateTwo
 * @returns {boolean}
 */

const datesAreSame = (dateOne: Moment, dateTwo: Moment): boolean => {
  const dateOneDay = dateOne.date();
  const dateOneMonth = dateOne.month();
  const dateOneYear = dateOne.year();
  const dateTwoDay = dateTwo.date();
  const dateTwoMonth = dateTwo.month();
  const dateTwoYear = dateTwo.year();

  if (
    dateOneDay === dateTwoDay &&
    dateOneMonth === dateTwoMonth &&
    dateOneYear === dateTwoYear
  ) {
    return true;
  }
  return false;
};

export default datesAreSame;
