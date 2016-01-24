'use strict';

var colorNumbers = require('./color-numbers.js');

var backgroundColors = [];

for(var i = 0, n = colorNumbers.length; i < n; i++) {
  backgroundColors[i] = 'rgba('+colorNumbers[i]+', .4)';
}

backgroundColors[16] = 'rgba(0,0,0,0)';

module.exports = backgroundColors;