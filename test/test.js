var assert = require('assert'),
    sinon  = require('sinon'),
    Odoo   = require('../lib/index');

var config = {
  host: 'odoo4yopping.vagrantshare.com',
  port: 80,
  database: '4yopping',
  username: 'admin',
  password: '4yopping'
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
    assert.equal(typeof odoo.connect, 'function');
    assert.equal(typeof odoo.create, 'function');
    assert.equal(typeof odoo.get, 'function');
    assert.equal(typeof odoo.update, 'function');
    assert.equal(typeof odoo.delete, 'function');
    assert.equal(typeof odoo.list, 'function');
    assert.equal(typeof odoo.search, 'function');
  });

  describe('Creating client', function () {

    it('client should not be able to connect to odoo server', function () {
      var client = new Odoo({
            host: config.host,
            database: 'DatabaseNotFound',
            username: config.username,
            password: config.password
          }),
          callback = sinon.spy();

      client.connect(callback);

      assert(callback.called);
      assert.equal(typeof callback.args[0][0], 'object');
      assert.equal(callback.args[0][1], null);
    });

    it('client should be able to connect to odoo server', function () {
      var callback = sinon.spy();

      odoo.connect(callback);

      assert(callback.calledWith(null));
      assert.equal(typeof callback.args[0][1], 'object');
      assert(callback.args[0][1].uid);
      assert(callback.args[0][1].session_id);
    });


  });

});
