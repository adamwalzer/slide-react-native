'use strict';

var HighScoreTemplate = require('./helpers/high-score-template.js');

var opts = {
  title: "clear",
  max: 0,
  min: 0,
  sort: 1,
  limit: 5
};

var ClearHighScores = HighScoreTemplate(opts);

module.exports = ClearHighScores;