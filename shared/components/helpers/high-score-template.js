'use strict';

var React = require('react-native');
var styles = require('../styles.js');
var dimensions = require('../dimensions.js');
var {
  Animated,
  Text,
  View,
  TouchableWithoutFeedback,
  AsyncStorage,
  ListView,
} = React;

var ddp = require('../ddp.js');

var swipe = require('./swipe.js');
var loop = require('./loop.js');
var pieces = require('./piece.js');
var piece = pieces.piece;
var Piece = pieces.Piece;
var ListItem = require('../listitem.js');

var HighScoreTemplate = function(opts) {
  return React.createClass({
    // mixins: [ReactMeteorData],
    // getMeteorData() {
    //   return {
    //     list: HighScores.find({game: opts.title}, {sort: {score: opts.sort}}).fetch()
    //   };
    // },
    getInitialState() {
      return {
        t: opts.title || "original",
        m: opts.max || 0,
        n: opts.min || 0,
        data: new ListView.DataSource({
          rowHasChanged: (row1, row2) => !_.isEqual(row1, row2),
        }),
        loaded: false,
      }
    },
    left() {
      this.state.n = 1 - this.data.list.length;
      this.setState({
        m: Math.max(this.state.m-1,this.state.n)
      });
    },
    right() {
      this.setState({
        m: Math.min(this.state.m+1,0)
      });
    },
    componentWillMount() {
      this.swipe = swipe({
        left: this.left,
        right: this.right,
      });
      ddp.subscribe('HighScores', [], () => this.update(ddp.collections.HighScores.items));
      // observer = ddp.observe('HighScores');
      // console.log(observer);
      // console.log(ddp.collections);

      // observer.added = () => this.update(ddp.collections.HighScores.items);
      // observer.changed = () => this.update(ddp.collections.HighScores.items);
      // observer.removed = () => this.update(ddp.collections.HighScores.items);
    },
    componentDidMount() {

    },
    update: function(rows) {
      this.setState({
        data: this.state.data.cloneWithRows(rows),
        loaded: true,
      });
    },
    render() {
      return (
        <View style={styles.container}>
          <View style={styles.ul}>
            <ListItem dataTarget={"rules"} text={"back to high scores"} styleNumber={0} key={0} navigator={this.props.navigator} />
          </View>
          <View style={{left: this.state.m*dimensions.width}}>
            <ListView
              dataSource={this.state.data}
              renderRow={this.renderList} />
          </View>
        </View>
      );
    },
    renderList(el,k) {
      return (
        <View key={k} style={styles.highScore}>
          <View style={styles.gameDetails}>
            <Text>{this.state.t}</Text>
          </View>
          <View style={styles.gameDetails}>
            <View style={styles.gameScore}>
              <Text style={styles.gameScoreText}>
                {"score"}{"\n"}
                {el.score}
              </Text>
            </View>
          </View>
          <View style={styles.board} onTouchStart={this.swipe.handleTouchStart} onTouchEnd={this.swipe.handleTouchEnd}>
            {el.board.map(function(elx,x){
              return (
                elx.map(function(ely,y){
                  var piece = {
                    v: ely,
                    w: dimensions.width/4,
                    x: x,
                    y: y,
                    _id: ""+k+x+y,
                  };
                  return (
                    <Piece opts={piece} key={piece._id} />
                  );
                })
              );
            })}
          </View>
        </View>
      );
    }
  });
};

module.exports = HighScoreTemplate;