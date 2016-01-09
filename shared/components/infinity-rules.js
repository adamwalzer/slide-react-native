'use strict';

var React = require('react-native');
var styles = require('./styles.js');
var ListItem = require('./listitem.js');
var {
  Text,
  View,
} = React;

var InfinityRules = React.createClass({
  title: "Infinity Rules",
  list: [
    "If you've ever played the original game, I'm sure you've wished that those pesky low numbers would stop appearring. Well now your wishes can come true.",
    "Swipe up, down, left, or right just like the original game.",
    "When two tiles of the same value collide, they will combine to become one tile with a value one higher than the colliding tiles.",
    "New tiles will appear just like before, but now they will increase as the tiles on the board increase.",
    "Keep going as long as you can.",
    " The game ends just as it did before.",
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

module.exports = InfinityRules;