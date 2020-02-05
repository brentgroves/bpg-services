const users = require('./users/users.service.js');
const messages = require('./messages/messages.service.js');
const test = require('./test/test.service.js');
const mstest = require('./mstest/mstest.service.js');
const myhourlyoeevalues = require('./myhourlyoeevalues/myhourlyoeevalues.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(messages);
  app.configure(test);
  app.configure(mstest);
  app.configure(myhourlyoeevalues);
};
