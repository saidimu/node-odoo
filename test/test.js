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
  this.timeout(3000);

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
    assert.equal(typeof odoo.search, 'function');
  });

  it('odoo should have this private functions', function () {
    assert.equal(typeof odoo._request, 'function');
  });

  describe('Creating client', function () {

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
        assert(odoo.uid);
        assert(odoo.sid);
        assert(odoo.session_id);
        assert(odoo.context);

        done();
      }, 2000);
    });

  });

  describe('Records', function () {

    var created;

    it('client should create a record', function (done) {
      var callback = sinon.spy();
      odoo.create('hr.employee', {
        name: 'John Doe',
        work_email: 'john@doe.com'
      }, callback);

      setTimeout(function () {
        assert(callback.calledWith(null));
        assert.equal(typeof callback.args[0][1], 'number');

        created = callback.args[0][1];

        done();
      }, 2000);

    });

    it('client should get a record', function (done) {
      var callback = sinon.spy();
      odoo.get('hr.employee', created, callback);

      setTimeout(function () {
        assert(callback.calledWith(null));
        assert.equal(typeof callback.args[0][1], 'object');
        assert.equal(callback.args[0][1].display_name, 'John Doe');
        assert.equal(callback.args[0][1].work_email, 'john@doe.com');

        done();
      }, 2000);

    });

    it('client should update a record', function (done) {
      var callback = sinon.spy();
      odoo.update('hr.employee', created, {
        name: 'Jane Doe',
        work_email: 'jane@doe.com'
      }, callback);

      setTimeout(function () {
        assert(callback.calledWith(null));
        assert(callback.args[0][1]);

        done();
      }, 2000);
    });

    it('client should delete a record', function (done) {
      var callback = sinon.spy();
      odoo.delete('hr.employee', created, callback);

      setTimeout(function () {
        assert(callback.calledWith(null));
        assert(callback.args[0][1]);

        done();
      }, 2000);
    });

    it('client should search records', function (done) {
      var callback = sinon.spy();
      odoo.search('hr.employee', [['login', '=', 'admin']], callback);

      setTimeout(function () {
        assert(callback.calledWith(null));
        assert.equal(typeof callback.args[0][1], 'array');

        done();
      }, 2000);
    });

  });

});
