'use strict';

var React = require('react-native');
var styles = require('./styles.js');
var ListItem = require('./listitem.js');
var {
  Text,
  View,
} = React;

var CombineRules = React.createClass({
  title: "Combine Rules",
  list: [
    "This time the game starts with a full board.",
    "Swipe up, down, left, or right to make all of the tiles move in that direction.",
    "This time, no new tiles appear when you swipe.",
    "When two tiles of the same value collide, they will combine to become one tile with the value one higher than the original tiles.",
    "See if you can combine all of the tiles on the board to create one tile. Once you do, that tile will split back up to fill the board.",
    "The game ends when you've made too many consecutive moves without combining tiles.",
  ],
  render: function() {
    var y;
    return (
      <View style={styles.container}>
        <View style={styles.ul}>
          <Text style={[styles.liText, styles.ruleHeader, styles['liText'+0]]}>
            {this.title}
          </Text>
          {this.list.map(function(li,x){
            y = x+1;
            return (
              <Text key={x} style={[styles.rule, styles['liText'+0]]}>
                {li}
              </Text>
            );
          })}
          <ListItem dataTarget={"rules"} text={"back to rules"} styleNumber={0} key={y} navigator={this.props.navigator} />
        </View>
      </View>
    );
  }
});

module.exports = CombineRules;