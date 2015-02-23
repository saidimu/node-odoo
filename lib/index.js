var http = require('http'),
    jayson = require('jayson');

var Odoo = function (config) {
  config = config || {};

  this.host = config.host;
  this.port = config.port || 80;
  this.database = config.database;
  this.username = config.username;
  this.password = config.password;
};

// Connect
Odoo.prototype.connect = function (cb) {

  var params = {
      'db': this.database,
      'login': this.username,
      'password': this.password
  };

  var json = JSON.stringify({
      jsonrpc: '2.0',
      method: 'call',
      params: params
  });

  var options = {
    host: this.host,
    port: this.port,
    path: '/web/session/authenticate',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      "Content-Length": json.length
    }
  };

  var req = http.request(options, function (res) {
    var response = '';

    res.setEncoding('utf8');

    res.on('data', function (chunk) {
      response += chunk;
    });

    res.on('end', function () {
      console.log("?", response);
      if (response.error) {
        return cb(JSON.parse(response), null);
      }

      return cb(null, JSON.parse(response))
    });
  });

  req.write(json);
};

// Create model
Odoo.prototype.create = function () {

};

// Get model
Odoo.prototype.get = function () {

};

// Update model
Odoo.prototype.update = function () {

};

// Delete
Odoo.prototype.delete = function () {

};

// List models
Odoo.prototype.list = function () {

};

// Search models
Odoo.prototype.search = function () {

};

module.exports = Odoo;
