// eslint-disable-next-line import/no-anonymous-default-export
export default (date) => {
  const d = new Date(date);
  // console.log(d);
  // Mon Dec 13 2021 06:40:51 GMT+0530 (India Standard Time)
  let month = `${d.getMonth() + 1}`;
  // 11
  let day = `${d.getDate()}`;
  // 13
  const year = d.getFullYear();
  // 2021 

  // makes the month and day to two digits
  // 01 02....
  if (month.length < 2) { month = `0${month}`; }
  if (day.length < 2) { day = `0${day}`; }

  return [year, month, day].join('-');
};
