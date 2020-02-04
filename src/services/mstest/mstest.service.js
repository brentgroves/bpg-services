// Initializes the `mstest` service on path `/mstest`
const { Mstest } = require('./mstest.class');
const createModel = require('../../models/mstest.model');
const hooks = require('./mstest.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/mstest', new Mstest(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('mstest');

  service.hooks(hooks);
};
