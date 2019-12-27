const assert = require('assert');
const app = require('../../src/app');

describe('\'Kep13318\' service', () => {
  it('registered the service', () => {
    const service = app.service('Kep13318');

    assert.ok(service, 'Registered the service');
  });
});
