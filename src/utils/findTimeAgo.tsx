const findTimeAgo = (when: string) => {
  const whenAsDate = new Date(when);
  const timeNow = new Date();
  const whenAsTime = whenAsDate.getTime();
  const nowAsTime = timeNow.getTime();
  //find hours difference
  const difference = parseInt(((nowAsTime - whenAsTime) / 1000 / 60 / 60).toFixed(0));

  if (difference <= 0) {
    return 'Just now';
  } else if (difference <= 24) {
    return `${difference} hours ago`;
  } else {
    const differenceDays = (difference / 24).toFixed(0);
    return `${differenceDays} days ago`;
  }
};

export default findTimeAgo;
