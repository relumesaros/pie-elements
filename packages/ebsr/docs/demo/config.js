const { model } = require('./generate');

module.exports = {
  elements: {
    'ebsr-element': '../..'
  },
  models: [model('1', 'ebsr-element')]
};
