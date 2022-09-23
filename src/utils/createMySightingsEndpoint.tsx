const createMySightingsEndpoint = (id: number) => {
  return `filters[userId][$eq]=${id}`;
};

export default createMySightingsEndpoint;
