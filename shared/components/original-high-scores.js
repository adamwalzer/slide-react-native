'use strict';

var HighScoreTemplate = require('./helpers/high-score-template.js');

var opts = {
  title: "original",
  max: 0,
  min: 0,
  sort: -1,
  limit: 5
};

var OriginalHighScores = HighScoreTemplate(opts);

module.exports = OriginalHighScores;