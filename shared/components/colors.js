'use strict';

var colorNumbers = require('./color-numbers.js');

var colors = [];

for(var i = 0, n = colorNumbers.length; i < n; i++) {
  colors[i] = 'rgba('+colorNumbers[i]+', 1)';
}

module.exports = colors;