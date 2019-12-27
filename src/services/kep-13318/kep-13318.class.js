/* eslint-disable no-unused-vars */
exports.Kep13318 = class Kep13318 {
  constructor (options) {
    this.options = options || {};
    this.messages = [];
  }

  async find (params) {
    return this.messages;
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    this.messages.push(data);

    return data;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
};
