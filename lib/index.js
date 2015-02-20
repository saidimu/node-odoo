var Odoo = function (config) {
  config = config || {};

  this.host = config.host;
  this.port = config.port || 80;
  this.database = config.database;
  this.username = config.username;
  this.password = config.password;
};

// Create client
Odoo.prototype.createClient = function () {

};

// Authentication
Odoo.prototype.auth = function () {

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
