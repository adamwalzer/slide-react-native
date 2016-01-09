'use strict';

var React = require('react-native');
var styles = require('./styles.js');
var ListItem = require('./listitem.js');
var {
  Text,
  View,
} = React;

var OriginalRules = React.createClass({
  title: "Original Rules",
  list: [
    "Swipe up, down, left, or right to make all of the tiles move in that direction.",
    "Each time you swipe a new tile will appear on the board randomly.",
    "When two tiles of the same value collide, they will combine to become one tile of double the value.",
    "Keep going to try to get the highest value tiles you can.",
    "The game ends when your board fills up, and you can't make any more moves.",
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

module.exports = OriginalRules;