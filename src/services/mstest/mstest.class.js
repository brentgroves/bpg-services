const { Service } = require('feathers-objection');

exports.Mstest = class Mstest extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
