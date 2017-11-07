import configs from '../../../configs'
module.exports.compression = require('compression')()
module.exports.morgan = require('morgan')(configs.env)
module.exports.session = require('express-session')({
  secret: 'oh, it\'s a secret',
  resave: false,
  saveUninitialized: false,
});
