const moment = require('moment');
function formateMessage(username, text) {
  return {
    username: username,
    text: text,
    time: moment().format('h:mm a')
  }
}
module.exports = formateMessage;