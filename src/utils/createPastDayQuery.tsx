const createPastDayQuery = () => {
  const currentDate = new Date().toISOString();
  const yesterdaysDate = new Date(Date.now() - 86400 * 1000).toISOString();
  return `&filters[date][$lt]=${currentDate}&filters[date][$gt]=${yesterdaysDate}`;
};

export default createPastDayQuery;
