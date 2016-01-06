'use strict';

var React = require('react-native');
var styles = require('./styles.js');
var {
  Text,
  View,
  TouchableWithoutFeedback,
} = React;

var ListItem = React.createClass({
  handleOnPress(target) {
    if(typeof target === 'number') {
      this.props.navigator.jumpTo(this.props.navigator.props.initialRouteStack[target]);
    }
  },
  render: function() {
    return (
      <TouchableWithoutFeedback onPress={this.handleOnPress.bind(this, this.props.dataTarget)}>
        <View style={[styles.li, styles['li'+this.props.styleNumber]]}>
          <Text style={[styles.liText, styles['liText'+this.props.styleNumber]]}>
            {this.props.text}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
});

module.exports = ListItem;