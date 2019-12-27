const users = require('./users/users.service.js');
const messages = require('./messages/messages.service.js');
const kep13318 = require('./kep-13318/kep-13318.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(messages);
  app.configure(kep13318);
};
