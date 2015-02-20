var assert = require('assert'),
    Odoo   = require('../lib/index');

var config = {
  host: 'http://odoo.domain.com',
  port: 80,
  database: 'test',
  username: 'admin',
  password: '$72?392.2fhbd'
};

var odoo = new Odoo(config);

describe('Odoo', function () {

  it('Odoo should be a function and the client its instance', function () {
    assert.equal(typeof Odoo, 'function');
    assert(odoo instanceof Odoo);
  });

  it('Odoo should set properties to instance', function () {
    assert.notEqual(odoo.host, undefined);
    assert.equal(odoo.host, config.host);
    assert.notEqual(odoo.port, undefined);
    assert.equal(odoo.port, config.port);
    assert.notEqual(odoo.database, undefined);
    assert.equal(odoo.database, config.database);
    assert.notEqual(odoo.username, undefined);
    assert.equal(odoo.username, config.username);
    assert.notEqual(odoo.password, undefined);
    assert.equal(odoo.password, config.password);
  });

});
