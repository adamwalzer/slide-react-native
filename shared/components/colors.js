'use strict';

var colorNumbers = require('./color-numbers.js');
var moreColors = require('./more-colors.js');

var colors = [];

for(var i = 0, n = colorNumbers.length; i < n; i++) {
  // colors[i] = 'rgba('+colorNumbers[i]+', 1)';
  // colors[i] = 'rgba(0,0,0,.4)';
  colors[i] = moreColors.black;
}

module.exports = colors;