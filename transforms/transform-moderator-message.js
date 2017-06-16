const transformUser = require('./transform-user');

module.exports = {
  event: 'moderator_message',
  selector: '.moderatormessagelabel',
  transform: (dom) => {
    const username = dom.find('.username');
    const message = dom.text().toLowerCase();

    username.remove();

    if (message.includes('has joined the room.')) {
      return {
        user: transformUser(username),
        action: 'JOINED'
      }
    }

    if (message.includes('has left the room.')) {
      return {
        user: transformUser(username),
        action: 'LEFT'
      }
    }

    console.warn(dom.html())
  }
};