'use strict';

var React = require('react-native');
var styles = require('./styles.js');
var ListItem = require('./listitem.js');
var {
  Text,
  View,
} = React;

var TwistRules = React.createClass({
  title: "Twist Rules",
  list: [
    "The original game is fun, but what if the whole board moved instead of just the tiles?",
    "In twist, when you swipe right or left the entire board rotates clockwise or counterclockwise.",
    "As the board twists, a new tile will appear, and the tiles will fall down.",
    "When two tiles of the same value collide, they will combine to become one tile of double the value.",
    "Keep the game going. Keep that board moving.",
    "The game ends when you're out of moves.",
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

module.exports = TwistRules;