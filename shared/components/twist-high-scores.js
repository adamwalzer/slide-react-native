'use strict';

var HighScoreTemplate = require('./helpers/high-score-template.js');

var opts = {
  title: "twist",
  max: 0,
  min: 0,
  sort: -1,
  limit: 5
};

var TwistHighScores = HighScoreTemplate(opts);

module.exports = TwistHighScores;