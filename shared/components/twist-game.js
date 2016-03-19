'use strict';

var GameTemplate = require('./helpers/game-template.js');
var React = require('react-native');
var {
  Animated,
  AsyncStorage,
} = React;

var swipe = require('./helpers/swipe.js');

var opts = {
  title: "twist",
  variables: {
    degrees: new Animated.Value(0),
    fall: function(create) {
      this.move++;
      create = create || 0;
      var twist = (this.state.degrees/90%4+4)%4;
      switch(twist) {
        case 0:
          this.down(create);
          break;
        case 1:
          this.right(create);
          break;
        case 2:
          this.up(create);
          break;
        case 3:
          this.left(create);
          break;
      }
    },
    cw: function() {
      this.rotate(90);
    },
    ccw: function() {
      this.rotate(-90);
    },
    rotate: function(deg) {
      if(!this.moving) {
        this.moving = true;
        this.setState({
          degrees: this.state.degrees + deg,
        });
        // this.state.degrees += deg;
        // this.spinBoard();
        // this.spinPieces();
        this.fall(1);
      }
    },
    spinBoard: function() {
      // this.el.style.webkitTransform = this.el.style.MozTransform = this.el.style.msTransform = this.el.style.transform = 'rotate('+ this.degrees +'deg)';
    },
    spinPieces: function() {
      // for(var i in this.b) {
      //   for(var j in this.b[i]) {
      //     var b;
      //     if(b = this.b[i][j]) {
      //       // b.span.style.webkitTransform = b.span.style.MozTransform = b.span.style.msTransform = b.span.style.transform = 'translateX(-50%) translateY(-50%) rotate('+ -this.degrees +'deg)';
      //     }
      //   }
      // }
    }
  },
  getBoardStyle() {
    var options = [this.degrees._value,this.state.degrees].sort(function(a,b) {
      return a - b;
    });

    Animated.timing(this.degrees, {
      duration: 200,
      toValue: this.state.degrees,
    }).start();

    return {
      transform: [
        {rotate: this.degrees.interpolate({
            inputRange: options,
            outputRange: [options[0]+'deg', options[1]+'deg'],
        })}
      ],
    };
  },
  afterCreatePiece: function(opts) {
    this.setState({
      pieces: this.pieces
    });
    setTimeout(this.fall.bind(this,0), 250);
  },
  componentWillMount: function() {
    var self = this;
    AsyncStorage.getItem(this.t+'-high-score',function(error,val) {
      self.setState({
        high: val || 0,
      });
    }).done();
    this.swipe = swipe({
      left: this.ccw,
      right: this.cw,
    });
  },
  afterMove: function(moved,create) {
    this.setState({
      pieces: this.pieces
    });
    if(moved) {
      this.playSound();
      setTimeout(function() {
        this.pieces = this.pieces.filter(function(piece) {
          return !piece.toDestroy;
        });
        this.fall();
      }.bind(this),250);
      if(create) {
        setTimeout(function() {
          this.createPiece();
        }.bind(this), 250);
      }
    }
    this.moving = false;
  },
  componentDidUpdate() {
    if(this.state.pieces !== this.pieces) {
      this.setState({
        pieces: this.pieces
      });
    }
  }
};

var TwistGame = GameTemplate(opts);

module.exports = TwistGame;