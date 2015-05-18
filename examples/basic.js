var Odoo = require('../lib/index');

var odoo = new Odoo({
  host: 'localhost',
  port: 4569,
  database: '4yopping',
  username: 'admin',
  password: '4yopping'
});

// Connect to Odoo
odoo.connect(function (err) {
  if (err) { return console.log(err); }

  // Get a partner
  odoo.get('res.partner', 4, function (err, partner) {
    if (err) { return console.log(err); }

    console.log('Partner', partner);
  });
});
