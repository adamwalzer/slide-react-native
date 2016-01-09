'use strict';

var React = require('react-native');
var styles = require('./styles.js');
var ListItem = require('./listitem.js');
var {
  Text,
  View,
} = React;

var ClearRules = React.createClass({
  title: "Clear Rules",
  list: [
    "This time around the board starts with 11 tiles numbered 1-10 with one of the numbers appearing twice.",
    "Swipe up, down, left, or right to make all of the tiles move in that direction.",
    "Each time you swipe a new tile will appear on the board randomly, but only numbers on the board can appear.",
    "When two tiles of the same value collide, they both disappear.",
    "Try to make all of the tiles disappear with as few swipes as you can.",
    "The games ends when the board is clear, or you run out of moves.",
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

module.exports = ClearRules;