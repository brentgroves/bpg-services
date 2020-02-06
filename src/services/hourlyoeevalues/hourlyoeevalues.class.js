const { Service } = require('feathers-objection');

exports.Hourlyoeevalues = class Hourlyoeevalues extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
