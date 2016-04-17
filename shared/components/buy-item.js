'use strict';

var React = require('react-native');
var styles = require('./styles.js');
var {
  Text,
  View,
  TouchableWithoutFeedback,
  AsyncStorage,
} = React;

var BuyItem = React.createClass({
  handleOnPress() {
    var i, a, t;
    if(i = this.props.item) {
      AsyncStorage.getItem('User').then((u) => {
        u = JSON.parse(u);
        if(i.cost > u.thatAweTokens) return;
        if(u.items && u.items[i.item] + i.amount > 20) return;
        a = u.items ? u.items[i.item] || 0 : 0;
        a += i.amount;
        t = u.thatAweTokens - i.cost;
      }).done();
    }

    if(typeof this.props.dataTarget === 'number') {
      this.props.navigator.jumpTo(this.props.navigator.props.initialRouteStack[this.props.dataTarget]);
    } else if(typeof this.props.dataTarget === 'string') {
      this.props.navigator.push({component: this.props.dataTarget});
    }
  },
  render: function() {
    return (
      <TouchableWithoutFeedback onPress={this.handleOnPress} key={this.props.key}>
        <View style={[styles.li, styles['li'+this.props.styleNumber]]}>
          <Text style={[styles.liText, styles['liText'+this.props.styleNumber]]}>
            {this.props.text}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
});

module.exports = BuyItem;