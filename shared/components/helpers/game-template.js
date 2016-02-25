'use strict';

var React = require('react-native');
var styles = require('../styles.js');
var dimensions = require('../dimensions.js');
var {
  Animated,
  Image,
  Text,
  View,
  TouchableWithoutFeedback,
  AsyncStorage,
} = React;

var ddp = require('../ddp.js');

var swipe = require('./swipe.js');
var loop = require('./loop.js');
var pieces = require('./piece.js');
var piece = pieces.piece;
var Piece = pieces.Piece;

var GameTemplate = function(opts) {

  var movedWithoutCombine = opts.movedWithoutCombine || function() {
    return true;
  };

  var moveTiles = function(Z,d) {
    var getB, setB;
    if(Z==='X') {
      getB = function(self,i,j) {
        return self.b[i][j];
        // if(!self.b[i][j]) return null;
        // return self.refs['p'+self.b[i][j]._id];
      };
      setB = function(self,i,j,n) {
        self.b[i][j] = n;
      };
    } else {
      getB = function(self,j,i) {
        return self.b[i][j];
        // if(!self.b[i][j]) return null;
        // return self.refs['p'+self.b[i][j]._id];
      };
      setB = function(self,j,i,n) {
        self.b[i][j] = n;
      };
    }

    return function(create) {
      if(!this.moving || typeof create != "undefined") {
        if(typeof create === "undefined") this.moving = true;
        var moved = false;
        var self = this;
        loop.each([0,1,2,3], function(j) {
          for(var i=1.5+.5*d; d*i>d*1.5-2.5; i-=d) {
            if(getB(self,i,j)) {
              for(var k=1;k<=1.5+d*1.5-d*i;k++) {
                var b = getB(self,i+d*k,j);
                if(!b) {
                  b = getB(self,i+d*k-d,j);
                  if(b) {
                    setB(self,i+d*k,j,b['move'+Z](i+d*k));
                  }
                  setB(self,i+d*k-d,j,null);
                  moved = movedWithoutCombine();
                } else {
                  var b2 = getB(self,i+d*k-d,j);
                  if(b.move() != self.move && b.val() === b2.val()) {
                    b.val(self.combineVal(b.val()));
                    b.move(self.move);
                    b2['move'+Z](getB(self,i+d*k,j)['get'+Z]()).destroy();
                    if(b.val() === " ") setB(self,i+d*k,j,null);
                    setB(self,i+d*k-d,j,null);
                    moved = true;
                  }
                  break;
                }
              }
            }
          }
        });
        this.afterMove(moved,create);
      }
    }
  };

  var classOpts = {
    // mixins: [ReactMeteorData],
    // getMeteorData: opts.helpers || function() {
    //   var highs = HighScores.find({game:this.t},{limit:1,sort:{score:this.sort}}).fetch();
    //   if(highs[0]) {
    //     var max = Math.max(Session.get(this.t+'-high-score'),highs[0].score)
    //     setVar(this.t+'-high-score',isNaN(max) ? 0 : max);
    //   }
    //   return {
    //     score: Session.get(this.t+'-score'),
    //     high: Session.get(this.t+'-high-score') || "N/A",
    //     title: "Slide - "+this.t
    //   };
    // },
    t: opts.title || "original",
    sort: opts.sort || -1,
    move: 0,
    moving: false,
    pieces: opts.pieces || [],
    values: opts.values || [],
    originalValues: opts.values || [],
    b: Array(Array(null,null,null,null),Array(null,null,null,null),Array(null,null,null,null),Array(null,null,null,null)),
    originalB: opts.originalB || null,
    styleFunction: opts.styleFunction,
    componentWillMount: opts.componentWillMount || function() {
      var self = this;
      AsyncStorage.getItem(this.t+'-high-score',function(error,val) {
        self.setState({
          high: val || 0,
        });
      }).done();
      this.swipe = swipe({
        left: this.left,
        right: this.right,
        up: this.up,
        down: this.down
      });
    },
    componentDidMount: opts.componentDidMount || function() {
      this.el = this.refs["board"];
      if(!this.pieces.length) this.renderGame();
    },
    renderGame: opts.renderGame || function() {
      this.state.isGameOver = false;
      this.createPiece();
    },
    createPiece(n) {
      var self = this;
      var spaces = this.makeSpaces(this.b,this.values,n);
      this.pieces = this.pieces.filter(function(piece) {
        return !piece.toDestroy;
      });
      if(this.t === "clear" && !n && spaces.length === 16) {
        this.boardCleared();
      } else {
        if(spaces.length > 0) {
          var opts = {};
          opts.p = this;
          var l = Math.floor(Math.random()*spaces.length);
          var space = spaces[l];
          opts.w = 4;
          opts.x = space.x;
          opts.y = space.y;
          opts.z = this.newZ(this.values,n);
          opts.styleFunction = self.styleFunction;
          opts._id = this.move++;
          this.t != "clear" && this.t != "combine" && this.updateScore(opts.z);
          this.pieces[opts._id] = this.makeNewPiece(opts);
          this.b[opts.x][opts.y] = this.pieces[opts._id];
          this.afterCreatePiece(opts,n);
        }
        if(spaces.length === 1) {
          var alive = false;
          loop.each(this.b, function(c,i) {
            loop.each(c, function(d,j) {
              if(d && i != 0) {
                if(d.val() === self.b[i-1][j].val()) {
                  alive = true;
                }
              }
              if(d && j != 0) {
                if(d.val() === self.b[i][j-1].val()) {
                  alive = true;
                }
              }
            });
          });
          if(!alive) {
            this.moving = true;
            this.gameOver();
          }
        }
        if(n) {
          this.createPiece(n-1);
        } else {
          this.values = [];
          this.split(spaces);
        }
      }
    },
    makeNewPiece(opts) {
      return new piece(opts);
    },
    updateScore(z) {
      this.setState({
        score: this.state.score + z
      });
    },
    newZ: opts.newZ || function() {
      return Math.floor(Math.random()*2*.75+1)*2;
    },
    combineVal: opts.combineVal || function(v) {
      return 2*v;
    },
    makeSpaces: opts.makeSpaces || function(b) {
      var spaces = [];
      loop.each(b, function(c,i) {
        loop.each(c, function(d,j) {
          if(!d) {
            spaces.push({x:i,y:j});
          }
        });
      });
      return spaces;
    },
    afterCreatePiece: opts.afterCreatePiece || function(){
      this.setState({
        b: this.b,
        pieces: this.pieces
      });
    },
    split: opts.split || function(){},
    left: moveTiles('X',-1),
    up: moveTiles('Y',-1),
    right: moveTiles('X',1),
    down: moveTiles('Y',1),
    afterMove: opts.afterMove || function(moved) {
      this.setState({
        pieces: this.pieces
      });
      if(moved) {
        setTimeout(function() {
          this.createPiece();
        }.bind(this), 250);
      }
      this.moving = false;
    },
    boardCleared: opts.boardCleared || function() {},
    getGameOverMessage: opts.getGameOverMessage || function() {
      return "You scored "+this.state.score+"!";
    },
    getHigh: opts.getHigh || function() {
      return Math.max(this.state.score,this.state.high);
    },
    setNewHigh: opts.setNewHigh || function(resetBoard) {
      var self = this;
      var high = this.getHigh();
      this.setState({
        high: high,
      });
      AsyncStorage.setItem(this.t+'-high-score', ''+high);
      var b = Array(Array(null,null,null,null),Array(null,null,null,null),Array(null,null,null,null),Array(null,null,null,null));
      for(var i=0;i<4;i++) {
        for(var j=0;j<4;j++) {
          if(self.b[i][j]) {
            b[i][j] = {v:self.b[i][j].v}
          }
        }
      }

      ddp.connect(function(error) {
        if(!error) {
          AsyncStorage.getItem('userId', function(error,userId) {
            if(userId) {
              ddp.call('addHighScore', [{
                userId,
                game: self.t,
                score: self.state.score,
                board: b,
                sort: self.sort
              }], function() {
                self.resetBoard.call(self, resetBoard);
              });
            } else {
              self.resetBoard.call(self, resetBoard);
            }
          }).done();
        } else {
          self.resetBoard.call(self, resetBoard);
        }
      });

    },
    resetBoard(resetBoard) {
      if(resetBoard) {
        this.setState({
          score: 0
        });
        loop.each(this.b, function(c) {
          loop.each(c, function(d) {
            d && d.destroy();
          });
        });
        this.values = this.originalValues;
        this.moving = false;
        this.pieces = [];
        this.b = Array(Array(null,null,null,null),Array(null,null,null,null),Array(null,null,null,null),Array(null,null,null,null));
        this.renderGame();
      }
    },
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    resetTop: new Animated.Value(dimensions.height),
    clickReset() {
      this.setState({
        resetTop: 0,
      });
    },
    getResetOffset() {
      Animated.timing(this.resetTop, {
        duration: 200,
        toValue: this.state.resetTop,
      }).start();

      return {
        top: this.resetTop
      };
    },
    gameOverTop: new Animated.Value(dimensions.height),
    gameOver() {
      console.log("game over");
      this.setState({
        gameOverMessage: this.getGameOverMessage(),
        gameOverTop: 0,
        isGameOver: true,
      });
    },
    getGameOverOffset() {
      Animated.timing(this.gameOverTop, {
        duration: 200,
        toValue: this.state.gameOverTop,
      }).start();

      return {
        top: this.gameOverTop,
      };
    },
    clickResetOption(yes) {
      yes === true && this.setNewHigh(true,this.b);
      this.setState({
        resetTop: dimensions.height,
      });
    },
    clickGameOverOption(yes) {
      this.setNewHigh(yes,this.b);
      this.setState({
        gameOverTop: dimensions.height,
      });
      if(yes !== true) this.props.navigator.jumpTo(this.props.navigator.props.initialRouteStack[0]);;
    },
    getBoardStyle: opts.getBoardStyle || function() {},
    highCopy: opts.highCopy || "high",
    getInitialState() {
      return {
        score: 0,
        high: 0,
        b: this.b,
        pieces: this.pieces,
        resetTop: dimensions.height,
        gameOverTop: dimensions.height,
        isGameOver: false,
        degrees: 0,
      };
    },
    handleOnPress(target) {
      if(typeof target === 'number') {
        this.props.navigator.jumpTo(this.props.navigator.props.initialRouteStack[target]);
      }
    },
    componentDidUpdate: opts.componentDidUpdate || function() {},
    render() {
      var self = this;
      return (
        <View style={styles.container}>
          <View style={styles.gameMenu}>
            <TouchableWithoutFeedback onPress={this.handleOnPress.bind(this, 0)}>
              <View style={styles.gameOptions}>
                <View style={styles.gameOptionsLines}></View>
                <View style={styles.gameOptionsLines}></View>
                <View style={styles.gameOptionsLines}></View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.clickReset}>
              <View style={styles.gameReset}>
                <Image source={require('../../../images/reset-icon.png')} style={styles.gameResetImage} />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <Text style={styles.gameTitle}>{'Slide - '+this.capitalize(this.t)}</Text>
          <View style={styles.gameDetails}>
            <View style={styles.gameScore}>
              <Text style={styles.gameScoreText}>
                score{"\n"}
                {this.state.score}
              </Text>
            </View>
            <View style={styles.gameScore}>
              <Text style={styles.gameScoreText}>
                {this.highCopy}{"\n"}
                {this.state.high}
              </Text>
            </View>
          </View>
          <Animated.View ref="board" style={[styles.board, this.getBoardStyle()]} onTouchStart={this.swipe.handleTouchStart} onTouchEnd={this.swipe.handleTouchEnd}>
            {this.state.pieces.map(function(piece){
              if(piece) {
                return <Piece opts={piece} key={piece._id} degrees={-self.state.degrees} ref={'p'+piece._id} />;
              }
            })}
          </Animated.View>
          <Animated.View style={[styles.ul, styles.options, styles.gameResetMenu, this.getResetOffset()]}>
            <Text style={[styles.ruleHeader, styles.liText, styles['liText'+0]]}>
              Reset Game?
            </Text>
            <View>
              <TouchableWithoutFeedback onPress={this.clickResetOption.bind(this,true)}>
                <View style={[styles.li, styles['li'+0]]}>
                  <Text style={[styles.liText, styles['liText'+0]]}>
                    Yes
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={this.clickResetOption}>
                <View style={[styles.li, styles['li'+1]]}>
                  <Text style={[styles.liText, styles['liText'+1]]}>
                    No
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </Animated.View>
          <Animated.View style={[styles.ul, styles.options, styles.gameResetMenu, this.getGameOverOffset()]}>
            <Text style={[styles.ruleHeader, styles.liText, styles['liText'+0]]}>
              {this.state.gameOverMessage}
            </Text>
            <Text style={[styles.ruleHeader, styles.liText, styles['liText'+0]]}>
              Play Again?
            </Text>
            <View>
              <TouchableWithoutFeedback onPress={this.clickGameOverOption.bind(this,true)}>
                <View style={[styles.li, styles['li'+0]]}>
                  <Text style={[styles.liText, styles['liText'+0]]}>
                    Yes
                  </Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={this.clickGameOverOption}>
                <View style={[styles.li, styles['li'+1]]}>
                  <Text style={[styles.liText, styles['liText'+1]]}>
                    No
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </Animated.View>
        </View>
      );
    }
  };

  if(opts.variables) {
    for(var key in opts.variables) {
      classOpts[key] = opts.variables[key];
    }
  }

  return React.createClass(classOpts);
};

module.exports = GameTemplate;