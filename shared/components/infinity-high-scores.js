'use strict';

var HighScoreTemplate = require('./helpers/high-score-template.js');

var opts = {
  title: "infinity",
  max: 0,
  min: 0,
  sort: -1,
  limit: 5,
  styleFunction(v) {
    return v%16;
  }
};

var InfinityHighScores = HighScoreTemplate(opts);

module.exports = InfinityHighScores;