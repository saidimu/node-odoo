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

  it('Odoo should be a function', function () {
    assert.equal(typeof Odoo, 'function');
  });

  it('odoo should be an instance of Odoo', function () {
    assert(odoo instanceof Odoo);
  });

  it('odoo should have this properties', function () {
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

  it('odoo should have this public functions', function () {
    assert.equal(typeof odoo.createClient, 'function');
    assert.equal(typeof odoo.auth, 'function');
    assert.equal(typeof odoo.create, 'function');
    assert.equal(typeof odoo.get, 'function');
    assert.equal(typeof odoo.update, 'function');
    assert.equal(typeof odoo.delete, 'function');
    assert.equal(typeof odoo.list, 'function');
    assert.equal(typeof odoo.search, 'function');
  });

  describe('Creating client', function () {
    it('client should be able to connect to odoo server');
    it('client should authenticate to odoo server');
  });

});
