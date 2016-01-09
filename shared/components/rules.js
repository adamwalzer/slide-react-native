'use strict';

var React = require('react-native');
var styles = require('./styles.js');
var ListItem = require('./listitem.js');
var {
  Text,
  View,
} = React;

var Rules = React.createClass({
  componentWillMount: function() {
    this.list = [
      {
        dataTarget: "original-rules",
        text: "original rules",
      },
      {
        dataTarget: "infinity-rules",
        text: "infinity rules",
      },
      {
        dataTarget: "twist-rules",
        text: "twist rules",
      },
      {
        dataTarget: "clear-rules",
        text: "clear rules",
      },
      {
        dataTarget: "combine-rules",
        text: "combine rules",
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

module.exports = Rules;