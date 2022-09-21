import type { Moment } from 'moment';

const datesAreSame = (dateOne: Moment, dateTwo: Moment) => {
  const dateOneDay = dateOne.date();
  const dateOneMonth = dateOne.month();
  const dateOneYear = dateOne.year();
  const dateTwoDay = dateTwo.date();
  const dateTwoMonth = dateTwo.month();
  const dateTwoYear = dateTwo.year();

  if (dateOneDay === dateTwoDay && dateOneMonth === dateTwoMonth && dateOneYear === dateTwoYear) {
    return true;
  }
  return false;
};

export default datesAreSame;
