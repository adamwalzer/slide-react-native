'use strict';

var GameTemplate = require('./helpers/game-template.js');
var loop = require('./helpers/loop.js');

var opts = {
  title: "combine",
  variables: {
    mx: 0
  },
  renderGame: function() {
    this.state.isGameOver = false;
    this.mx = 0;
    this.createPiece();
  },
  afterMove: function(moved) {
    this.setState({
      pieces: this.pieces
    });
    this.pieces = this.pieces.filter(function(piece) {
      return !piece.toDestroy;
    });
    setTimeout(function() {
      this.setState({
        pieces: this.pieces
      });
    }.bind(this),250);
    if(this.spaceLength===15) {
      this.updateScore(100);
      this.split(this.makeSpaces(this.b));
    }
    this.mx++;
    this.move++;
    this.moving = false;
    if(this.mx>=13) {
      this.moving = true;
      this.gameOver();
    }
  },
  split: function(spaces) {
    this.spaceLength = 0;
    this.pn |= 0;
    if(spaces.length > 0) {
      var opts = {};
      opts.p = this;
      var l = Math.floor(Math.random()*spaces.length);
      var space = spaces[l];
      opts.w = 4;
      opts.x = space.x;
      opts.y = space.y;
      opts._id = this.pn++;
      var ps = [];
      if(opts.x>0 && this.b[opts.x-1][opts.y]) ps.push(this.b[opts.x-1][opts.y]);
      if(opts.y>0 && this.b[opts.x][opts.y-1]) ps.push(this.b[opts.x][opts.y-1]);
      if(opts.x<3 && this.b[opts.x+1][opts.y]) ps.push(this.b[opts.x+1][opts.y]);
      if(opts.y<3 && this.b[opts.x][opts.y+1]) ps.push(this.b[opts.x][opts.y+1]);
      if(ps.length) {
        var n = Math.floor(Math.random()*ps.length);
        var p = ps[n];
        opts.z = p.val()-1;
        opts.styleFunction = function(v) {
          return v%16;
        };
        p.val(opts.z);
        this.pieces[opts._id] = this.makeNewPiece(opts);
        this.b[opts.x][opts.y] = this.pieces[opts._id];
        var spaces = [];
        loop.each(this.b, function(c,i) {
          loop.each(c, function(d,j) {
            if(!d) {
              spaces.push({x:i,y:j});
            }
          });
        });
        this.split(spaces);
      } else {
        this.split(spaces);
      }
    } else {
      this.setState({
        pieces: this.pieces
      });
    }
  },
  newZ: function() {
    return 15;
  },
  combineVal: function(v) {
    this.mx=0;
    this.updateScore(1);
    this.spaceLength++;
    return v+1;
  },
  movedWithoutCombine: function() {
    return false;
  },
  styleFunction(v) {
    return v%16;
  },
};

var CombineGame = GameTemplate(opts);

module.exports = CombineGame;