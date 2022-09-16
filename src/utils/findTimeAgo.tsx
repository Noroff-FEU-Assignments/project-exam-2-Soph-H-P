const findTimeAgo = (when: string, hours?: boolean) => {
  const whenAsDate = new Date(when);
  const timeNow = new Date();
  const whenAsTime = whenAsDate.getTime();
  const nowAsTime = timeNow.getTime();
  //find hours, days, weeks, months, years difference
  const difference = parseInt(((nowAsTime - whenAsTime) / 1000 / 60 / 60).toFixed(0));
  const differenceDays = parseInt((difference / 24).toFixed(0));
  const differenceWeeks = parseInt((differenceDays / 7).toFixed(0));
  const differenceMonths = parseInt((differenceWeeks / 4).toFixed(0));
  const differenceYears = parseInt((differenceMonths / 12).toFixed(0));

  if (hours) {
    return difference;
  }

  if (difference <= 0) {
    return 'Just now';
  } else if (difference <= 24) {
    return `${difference} hours ago`;
  } else if (differenceDays <= 7) {
    return `${differenceDays} days ago`;
  } else if (differenceWeeks <= 4) {
    return `${differenceWeeks} weeks ago`;
  } else if (differenceMonths <= 12) {
    return `${differenceMonths} months ago`;
  } else {
    return `${differenceYears} years ago`;
  }
};

export default findTimeAgo;
