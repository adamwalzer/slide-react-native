'use strict';

var GameTemplate = require('./helpers/game-template.js');

var opts = {
  title: "original"
};

var OriginalGame = GameTemplate(opts);

module.exports = OriginalGame;