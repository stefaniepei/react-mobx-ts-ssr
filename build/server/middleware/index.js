import configs from '../../../configs'
const keywords = configs.env + configs.render
module.exports.compression = require('compression')()
module.exports.morgan = require('morgan')(keywords)
module.exports.session = require('express-session')({
  secret: 'no secret',
  resave: false,
  saveUninitialized: false,
});
