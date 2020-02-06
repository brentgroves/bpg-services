// Initializes the `hourlyoeevalues` service on path `/hourlyoeevalues`
const { Hourlyoeevalues } = require('./hourlyoeevalues.class');
const createModel = require('../../models/hourlyoeevalues.model');
const hooks = require('./hourlyoeevalues.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/hourlyoeevalues', new Hourlyoeevalues(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('hourlyoeevalues');

  service.hooks(hooks);
};
