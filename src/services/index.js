const users = require('./users/users.service.js');
const messages = require('./messages/messages.service.js');
const test = require('./test/test.service.js');
const mstest = require('./mstest/mstest.service.js');
const myhourlyoeevalues = require('./myhourlyoeevalues/myhourlyoeevalues.service.js');
const hourlyoeevalues = require('./hourlyoeevalues/hourlyoeevalues.service.js');
const sproc200206 = require('./sproc200206/sproc200206.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(sproc200206);
};
/*
module.exports = function (app) {
  app.configure(users);
  app.configure(messages);
  app.configure(test);
  app.configure(mstest);
  app.configure(myhourlyoeevalues);
  app.configure(hourlyoeevalues);
  app.configure(sproc200206);
};

*/
