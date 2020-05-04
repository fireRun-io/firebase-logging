const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date);
};

const formatLocalDate = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let amPm = hours >= 12 ? "pm" : "am";

  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  const strTime = hours + ":" + minutes + " " + amPm;
  return (
    date.getMonth() +
    1 +
    "/" +
    date.getDate() +
    "/" +
    date.getFullYear() +
    " " +
    strTime
  );
};

const formatDate = (str) => {
  const tmpDate = new Date(str);
  const formattedStr = isValidDate(tmpDate) ? formatLocalDate(tmpDate) : str;

  return formattedStr;
};

exports.isValidDate = isValidDate;
exports.formatDate = formatDate;
