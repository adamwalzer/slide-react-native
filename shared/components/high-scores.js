'use strict';

var React = require('react-native');
var styles = require('./styles.js');
var ListItem = require('./listitem.js');
var {
  Text,
  View,
} = React;

var HighScores = React.createClass({
  componentWillMount: function() {
    this.list = [
      {
        dataTarget: "original-high-scores",
        text: "original",
      },
      {
        dataTarget: "infinity-high-scores",
        text: "infinity",
      },
      {
        dataTarget: "twist-high-scores",
        text: "twist",
      },
      {
        dataTarget: "clear-high-scores",
        text: "clear",
      },
      {
        dataTarget: "combine-high-scores",
        text: "combine",
      },
      {
        dataTarget: 6,
        text: "back to options",
      },
    ];
  },
  render: function() {
    var self = this;

    return (
      <View style={styles.options}>
        <Text style={[styles.liText, styles.ruleHeader, styles['liText'+0]]}>
          {"High Scores"}
        </Text>
        <View style={styles.ul}>
          {this.list.map(function(li,x){
            return (
              <ListItem dataTarget={li.dataTarget} text={li.text} styleNumber={x} key={x} navigator={self.props.navigator} />
            );
          })}
        </View>
      </View>
    );
  }
});

module.exports = HighScores;