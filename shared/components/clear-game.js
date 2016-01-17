'use strict';

var GameTemplate = require('./helpers/game-template.js');
var loop = require('./helpers/loop.js');

var opts = {
  title: "clear",
  highCopy: "low",
  sort: 1,
  originalB: Array(Array({v:0},{v:0},{v:0},{v:0}),Array({v:0},{v:0},{v:0},{v:0}),Array({v:0},{v:0},{v:0},{v:0}),Array({v:0},{v:0},{v:0},{v:0})),
  // created: function() {
  //   Session.set(this.t+'-score', 0);
  //   if(getVar(this.t+'-high-score')) Session.set(this.t+'-high-score',getVar(this.t+'-high-score'));
  //   if(!Session.get(this.t+'-high-score')) Session.set(this.t+'-high-score',10000);
  // },
  // helpers: function() {
  //   var highs = HighScores.find({game:'clear'},{sort:{score:1},limit:1}).fetch();
  //   if(highs[0]) {
  //     var min = Math.min(Session.get(self.t+'-high-score'),highs[0].score)
  //     setVar(self.t+'-high-score',isNaN(min) ? 10000 : min);
  //   }
  //   return {
  //     score: Session.get('clear-score'),
  //     high: Session.get('clear-high-score')===10000?"N/A":Session.get('clear-high-score'),
  //     title: "Slide - Clear"
  //   }
  // },
  // setNewHigh: function(resetBoard,b) {
  //   if(resetBoard) {
  //     Session.set('clear-score', 0);
  //     loop.each(b, function(c) {
  //       loop.each(c, function(d) {
  //         d && d.destroy();
  //       });
  //     });
  //     this.renderGame();
  //   }
  // },
  getHigh() {
    return Math.min(this.state.score,this.state.high||1000000);
  },
  afterMove: function(moved) {
    if(this.state.isGameOver) return;
    this.updateScore(1);
    if(moved) {
      setTimeout(function() {
        this.createPiece();
      }.bind(this), 250);
    }
    this.moving = false;
  },
  renderGame: function() {
    this.state.isGameOver = false;
    this.moving = false;
    this.b = Array(Array(null,null,null,null),Array(null,null,null,null),Array(null,null,null,null),Array(null,null,null,null));
    this.originalB = Array(Array({v:0},{v:0},{v:0},{v:0}),Array({v:0},{v:0},{v:0},{v:0}),Array({v:0},{v:0},{v:0},{v:0}),Array({v:0},{v:0},{v:0},{v:0}));
    this.createPiece(2);
    // this.createPiece(10);
  },
  makeSpaces: function(b,values,n) {
    var spaces = [];
    loop.each(b, function(c,i) {
      loop.each(c, function(d,j) {
        if(d) {
          !n && values.push(d.val());
        } else {
          spaces.push({x:i,y:j});
        }
      });
    });
    return spaces;
  },
  getGameOverMessage: function() {
    return "You couldn't clear the board";
  },
  boardCleared: function() {
    this.setState({
      gameOverMessage: "You scored " + this.state.score + "!",
      gameOverTop: 0,
      isGameOver: true,
    }, this.setNewHigh);
  },
  combineVal: function() {
    return " ";
  },
  newZ: function(values,n) {
    return n || values[Math.floor(Math.random()*values.length)];
  },
  afterCreatePiece: function(opts,n) {
    if(typeof n == "number") {
      this.originalB[opts.x][opts.y] = {v:opts.z};
    }
    this.setState({
      b: this.b,
      pieces: this.pieces
    });
  }
};

var ClearGame = GameTemplate(opts);

module.exports = ClearGame;