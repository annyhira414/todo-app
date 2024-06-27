export const displayFormattedDate = (dateStr) => {
  if (!dateStr) return dateStr;

  let date;

  if (dateStr instanceof Date) date = dateStr;
  else date = new Date(dateStr);

  if (date.toString() === 'Invalid Date') return dateStr;

  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) month = `0${month}`;
  let day = date.getDate();
  if (day < 10) day = `0${day}`;

  return `${day}/${month}/${year}`;
};
