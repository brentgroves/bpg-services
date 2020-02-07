const GenReportName = require('../../hooks/GenReportName');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [GenReportName()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
