const session = require('express-session');

module.exports = session({
  secret: 'oh, it\'s a secret',
  resave: false,
  saveUninitialized: false,
});
