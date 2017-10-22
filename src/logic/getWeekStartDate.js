const moment = require('moment');

module.exports = (date) => {
  const day = moment(date).format('dddd');
  let daysToSubtract;
  switch (day) {
    case 'Monday':
      daysToSubtract = 0;
      break;
    case 'Tuesday':
      daysToSubtract = 1;
      break;
    case 'Wednesday':
      daysToSubtract = 2;
      break;
    case 'Thursday':
      daysToSubtract = 3;
      break;
    case 'Friday':
      daysToSubtract = 4;
      break;
    case 'Saturday':
      daysToSubtract = 5;
      break;
    case 'Sunday':
      daysToSubtract = 6;
      break;
    default:
      break;
  }
  const weekStart = moment(date).subtract(daysToSubtract, 'days').format('YYYY-MM-DD');
  return weekStart;
};
