'use strict';

var colorNumbers = require('./color-numbers.js');

var backgroundColors = [];

for(var i = 0, n = colorNumbers.length; i < n; i++) {
  // backgroundColors[i] = 'rgba('+colorNumbers[i]+', .4)';
  backgroundColors[i] = 'rgba('+colorNumbers[i]+', 1)';
}

module.exports = backgroundColors;