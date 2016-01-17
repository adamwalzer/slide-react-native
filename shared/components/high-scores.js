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
        text: "original high scores",
      },
      {
        dataTarget: "infinity-high-scores",
        text: "infinity high scores",
      },
      {
        dataTarget: "twist-high-scores",
        text: "twist high scores",
      },
      {
        dataTarget: "clear-high-scores",
        text: "clear high scores",
      },
      {
        dataTarget: "combine-high-scores",
        text: "combine high scores",
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