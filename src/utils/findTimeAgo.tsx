import moment from 'moment';

/**
 * creates a readable description of measure of time
 * @param {number} time
 * @param {string} measure
 * @returns {string}
 */
const createReadableTimeDifference = (time: number, measure: string): string => {
  if (time === 1) {
    return `${time} ${measure} ago`;
  }
  return `${time} ${measure}s ago`;
};

/**
 * depending on the length of time ago the time is described in hours, days, weeks, months and years
 * @param {string} when
 * @returns {string}
 */
const findTimeAgo = (when: string): string => {
  const whenAsDate = moment(when);
  const timeNow = moment();
  const difference = parseInt(moment.duration(timeNow.diff(whenAsDate)).asHours().toFixed(0));
  const differenceDays = parseInt(moment.duration(timeNow.diff(whenAsDate)).asDays().toFixed(0));
  const differenceWeeks = parseInt(moment.duration(timeNow.diff(whenAsDate)).asWeeks().toFixed(0));
  const differenceMonths = parseInt(
    moment.duration(timeNow.diff(whenAsDate)).asMonths().toFixed(0)
  );
  const differenceYears = parseInt(moment.duration(timeNow.diff(whenAsDate)).asYears().toFixed(0));

  if (difference <= 0) {
    return 'Just now';
  } else if (difference <= 24) {
    return createReadableTimeDifference(difference, 'hour');
  } else if (differenceDays < 7) {
    return createReadableTimeDifference(differenceDays, 'day');
  } else if (differenceWeeks < 4) {
    return createReadableTimeDifference(differenceWeeks, 'week');
  } else if (differenceMonths < 12) {
    return createReadableTimeDifference(differenceMonths, 'month');
  } else {
    return createReadableTimeDifference(differenceYears, 'year');
  }
};

export default findTimeAgo;
