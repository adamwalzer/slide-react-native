'use strict';

var HighScoreTemplate = require('./helpers/high-score-template.js');
var colors = require('./colors.js');

var opts = {
  title: "clear",
  max: 0,
  min: 0,
  sort: 1,
  limit: 5,
  styleFunction(v) {
    return (v-1)%colors.length;
  }
};

var ClearHighScores = HighScoreTemplate(opts);

module.exports = ClearHighScores;