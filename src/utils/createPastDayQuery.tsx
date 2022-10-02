/**
 * creates an end point that will filter out sightings for just the past 24 hours
 * @example createPastDatQuery()
 * returns '&filters[date][$lt]=2022-10-01T17:12:01.302Z&filters[date][$gt]=2022-09-30T17:12:01.302Z'
 * @returns {string}
 */
const createPastDayQuery = (): string => {
  const currentDate = new Date().toISOString();
  const yesterdaysDate = new Date(Date.now() - 86400 * 1000).toISOString();
  return `&filters[date][$lt]=${currentDate}&filters[date][$gt]=${yesterdaysDate}`;
};

export default createPastDayQuery;
