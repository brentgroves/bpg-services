// Initializes the `myhourlyoeevalues` service on path `/myhourlyoeevalues`
const { Myhourlyoeevalues } = require('./myhourlyoeevalues.class');
const createModel = require('../../models/myhourlyoeevalues.model');
const hooks = require('./myhourlyoeevalues.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/myhourlyoeevalues', new Myhourlyoeevalues(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('myhourlyoeevalues');

  service.hooks(hooks);
};
