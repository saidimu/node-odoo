var assert = require('assert'),
    sinon  = require('sinon'),
    Odoo   = require('../lib/index');

var config = {
  host: 'odoo4yopping.vagrantshare.com',
  port: 80,
  database: 'pruebas',
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
    this.timeout(3000);

    it('client should not be able to connect to odoo server', function (done) {
      var client = new Odoo({
            host: config.host,
            database: 'DatabaseNotFound',
            username: config.username,
            password: config.password
          }),
          callback = sinon.spy();

        client.connect(callback);

        setTimeout(function () {
          assert(callback.called);
          assert.equal(typeof callback.args[0][0], 'object');
          assert.equal(callback.args[0][1], null);

          done();
        }, 2000);
    });

    it('client should be able to connect to odoo server', function (done) {
      var callback = sinon.spy();

      odoo.connect(callback);

      setTimeout(function () {
        assert(callback.calledWith(null));
        assert.equal(typeof callback.args[0][1], 'object');
        assert.notEqual(odoo.uid, undefined);
        assert.notEqual(odoo.sid, undefined);
        assert.notEqual(odoo.session_id, undefined);

        done();
      }, 2000);
    });

  });

  describe('Records', function () {

    it('client should create a record');
    it('client should get a record');
    it('client should update a record');
    it('client should delete a record');
    it('client should list records');
    it('client should search records');

  });

});
