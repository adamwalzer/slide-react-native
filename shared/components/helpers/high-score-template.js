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
} = React;

var Carousel = require('react-native-carousel');

var ddp = require('../ddp.js');

var loop = require('./loop.js');
var pieces = require('./piece.js');
var piece = pieces.piece;
var Piece = pieces.Piece;
var ListItem = require('../listitem.js');
var colors = require('../colors.js');
var backgroundColors = require('../background-colors.js');

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
        data: [],
        loaded: false,
      };
    },
    componentWillMount() {
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
      var data = Object.keys(rows).reduce(function(res, v) {
        return res.concat(rows[v]);
      }, []).sort(function(a,b) {
        return b.score - a.score;
      });
      this.setState({
        data: data,
        loaded: true,
      });
    },
    render() {
      return (
        <View style={styles.container}>
          <View style={styles.ul}>
            <ListItem dataTarget={"high-scores"} text={"back to high scores"} styleNumber={0} key={0} navigator={this.props.navigator} />
          </View>
          <View style={styles.gameDetails}>
            <Text style={styles.gameTitle}>{this.state.t}</Text>
          </View>
          <Carousel width={dimensions.width} indicatorAtBottom={false} indicatorOffset={-dimensions.height*.03} indicatorSize={dimensions.height*.06} indicatorColor={colors[0]} inactiveIndicatorColor={backgroundColors[0]}>
            {this.state.data.map(this.renderList)}
          </Carousel>
        </View>
      );
    },
    renderList(el,k) {
      return (
        <View key={k} style={styles.highScore}>
          <View style={styles.gameDetails}>
            <View style={styles.gameScore}>
              <Text style={styles.gameScoreText}>
                {"score"}{"\n"}
                {el.score}
              </Text>
            </View>
          </View>
          <View style={styles.board}>
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