'use strict';

var GameTemplate = require('./helpers/game-template.js');
var loop = require('./helpers/loop.js');

var opts = {
  title: "infinity",
  values: [1],
  makeSpaces: function(b,values) {
    var spaces = [];
    loop.each(b, function(c,i) {
      loop.each(c, function(d,j) {
        if(d) {
          values.push(d.val());
        } else {
          spaces.push({x:i,y:j});
        }
      });
    });
    return spaces;
  },
  newZ: function(values) {
    return Math.max(Math.min.apply(null,values)-Math.floor(Math.random()*10/9),1);
  },
  combineVal: function(v) {
    return v+1;
  },
  styleFunction(v) {
    return v%16;
  }
};

var InfinityGame = GameTemplate(opts);

module.exports = InfinityGame;