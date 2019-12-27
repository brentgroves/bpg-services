// Initializes the `Kep13318` service on path `/Kep13318`
const { Kep13318 } = require('./kep-13318.class');
const hooks = require('./kep-13318.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/Kep13318', new Kep13318(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('Kep13318');

  service.hooks(hooks);
};
