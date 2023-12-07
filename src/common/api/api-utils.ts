export const addFilterParams = (
  url: string,
  startDate?: string,
  endDate?: string,
) => {
  let newUrl = url;

  if (startDate) {
    newUrl += `startDate=${startDate}`;
  }

  if (endDate) {
    newUrl += `&endDate=${endDate}`;
  }

  return newUrl;
};
