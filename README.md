# Odoo

Node.js client library for Odoo

## Installation

```bash
$ npm install Odoo
```

## Usage

```js
var Odoo = require('Odoo');

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
```

## Methods

* odoo.connect(callback)
* odoo.create(model, params, callback)
* odoo.get(model, id, callback)
* odoo.update(model, id, params, callback)
* odoo.delete(model, id, callback)
* odoo.search(model, params, callback)

##Node version
Works better with NodeJS v11.16 and further

## Reference

* [Odoo Technical Documentation](https://www.odoo.com/documentation/8.0)
* [Odoo Web Service API](https://www.odoo.com/documentation/8.0/api_integration.html)

## License

The MIT License (MIT)

Copyright (c) 2015 Marco Godínez, 4yopping and all the related trademarks

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
