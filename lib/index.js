'use strict';

var Odoo = function (config) {
  config = config || {};

  this.host = config.host;
  this.port = config.port || 80;
  this.database = config.database;
  this.username = config.username;
  this.password = config.password;
};

// Connect

Odoo.prototype.connect = function(cb){
  var params = {
    db: this.database,
    login: this.username,
    password: this.password
  };

  var json = JSON.stringify({ params: params });
  var url = 'http://' + this.host + ':' + this.port + '/web/session/authenticate';

  var options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Content-Length': json.length
    },
    body: json
  };
  fetch(url, options)
    .then(res=>{
      this.sid = res.headers.map['set-cookie'][0].split(';')[0];
      console.log('sid:', this.sid);
      return res.json()
    })
    .then(data=>{
      if (data.error){
        cb(data.error, null);
      }else{
        this.uid = data.result.uid;
        this.session_id = data.result.session_id;
        this.context = data.result.user_context;
        this.username = data.result.username;
        cb(null, data.result);
      }
    }, err=>{
      cb(err, null);
    });

};

// Search records
Odoo.prototype.search = function (model, params, callback) {
  // assert(params.ids, "Must provide a list of IDs.");
  //assert(params.domain, "Must provide a search domain.");

  this._request('/web/dataset/call_kw', {
    kwargs: {
      context: this.context
    },
    model: model,
    method: 'search',
    args: [
      params.domain,
    ],
  }, callback);
};

// Search & Read records
// https://www.odoo.com/documentation/8.0/api_integration.html#search-and-read
// https://www.odoo.com/documentation/8.0/reference/orm.html#openerp.models.Model.search
// https://www.odoo.com/documentation/8.0/reference/orm.html#openerp.models.Model.read
Odoo.prototype.search_read = function (model, params, callback) {
  //assert(params.domain, "'domain' parameter required. Must provide a search domain.");
  //assert(params.limit, "'limit' parameter required. Must specify max. number of results to return.");

  this._request('/web/dataset/call_kw', {
    model: model,
    method: 'search_read',
    args: [],
    kwargs: {
      context: this.context,
      domain: params.domain,
      offset: params.offset,
      limit: params.limit,
      order: params.order,
      fields: params.fields,
    },
  }, callback);
};

// Get record
// https://www.odoo.com/documentation/8.0/api_integration.html#read-records
// https://www.odoo.com/documentation/8.0/reference/orm.html#openerp.models.Model.read
Odoo.prototype.get = function (model, params, callback) {
  //assert(params.ids, "Must provide a list of IDs.");

  this._request('/web/dataset/call_kw', {
    model: model,
    method: 'read',
    args: [
      params.ids,
    ],
    kwargs: {
      fields: params.fields,
    },
  }, callback);
}; //get


// Browse records by ID
// Not a direct implementation of Odoo RPC 'browse' but rather a workaround based on 'search_read'
// https://www.odoo.com/documentation/8.0/reference/orm.html#openerp.models.Model.browse
Odoo.prototype.browse_by_id = function(model, params, callback) {
  params.domain = [['id', '>', '0' ]];  // assumes all records IDs are > 0
  this.search_read(model, params, callback);
}; //browse


// Create record
Odoo.prototype.create = function (model, params, callback) {
  this._request('/web/dataset/call_kw', {
    kwargs: {
      context: this.context
    },
    model: model,
    method: 'create',
    args: [params]
  }, callback);
};

// Update record
Odoo.prototype.update = function (model, id, params, callback) {
  if (id) {
    this._request('/web/dataset/call_kw', {
      kwargs: {
        context: this.context
      },
      model: model,
      method: 'write',
      args: [[id], params]
    }, callback);
  }
};

// Delete record
Odoo.prototype.delete = function (model, id, callback) {
  this._request('/web/dataset/call_kw', {
    kwargs: {
      context: this.context
    },
    model: model,
    method: 'unlink',
    args: [[id]]
  }, callback);
};


// Generic RPC wrapper
// DOES NOT AUTO-INCLUDE context
Odoo.prototype.rpc_call = function (endpoint, params, callback) {
  //assert(params.model);
  // assert(params.method);
  // assert(params.args);
  // assert(params.kwargs);
  // assert(params.kwargs.context);

  this._request(endpoint, params, callback);
}; //generic


// Private functions
Odoo.prototype._request = function (path, params, cb) {
  params = params || {};

  var url = 'http://' + this.host + ':' + this.port + (path || '/') + '';
  var options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Cookie': this.sid + ';'
    },
    body: JSON.stringify({jsonrpc: '2.0', id: new Date().getUTCMilliseconds(), method: 'call', params: params})
  };

  fetch(url, options)
    .then(res=>res.json())
    .then(data=>{
      if (data.error){
        cb(data.error, null);
      }else{
        cb(null, data.result);
      }
    }, err=>{
      cb(err, null);
    });
};

module.exports = Odoo;
