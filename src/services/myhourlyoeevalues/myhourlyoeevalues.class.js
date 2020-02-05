const { Service } = require('feathers-objection');

exports.Myhourlyoeevalues = class Myhourlyoeevalues extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
