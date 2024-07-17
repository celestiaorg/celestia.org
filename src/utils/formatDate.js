export const formatDateToMonthDayYear = (timestamp) => {
  const date = new Date(timestamp);

  const options = { month: "short", day: "numeric", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};
