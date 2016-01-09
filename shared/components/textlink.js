'use strict';

var React = require('react-native');
var styles = require('./styles.js');
var {
  Text,
  View,
  TouchableWithoutFeedback,
} = React;

var TextLink = React.createClass({
  handleOnPress(target) {
    if(typeof target === 'number') {
      this.props.navigator.jumpTo(this.props.navigator.props.initialRouteStack[target]);
    }
  },
  render: function() {
    return (
      <View style={[styles.li]} key={this.props.key}>
        <Text style={[styles.liText, styles['liText'+this.props.styleNumber]]}>
          {this.props.textBefore}
        </Text>
        <Text style={[styles.liText, styles.textlink, styles['liText'+this.props.styleNumber]]} onPress={this.handleOnPress.bind(this, this.props.dataTarget)}>
          {this.props.link}
        </Text>
        <Text style={[styles.liText, styles['liText'+this.props.styleNumber]]}>
          {this.props.textAfter}
        </Text>
      </View>
    );
  }
});

module.exports = TextLink;