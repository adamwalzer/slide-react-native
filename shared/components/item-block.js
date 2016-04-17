'use strict';

var React = require('react-native');
var styles = require('./styles.js');
var {
  Text,
  Image,
  View,
  TouchableWithoutFeedback,
} = React;

var ItemBlock = React.createClass({
  handleOnPress() {
    this.props.navigator.push({
      component: this.props.component,
      item: this.props.dataTarget,
      image: this.props.image,
      amount: this.props.amount,
      cost: this.props.cost, 
    });
  },
  render: function() {
    return (
      <TouchableWithoutFeedback onPress={this.handleOnPress} key={this.props.key}>
        <View style={[styles.itemBlock, styles['li'+this.props.styleNumber]]}>
          <Image source={this.props.image} style={styles.itemImage} />
          <View style={styles.itemCost}>
            <Text style={[styles.itemCostText, styles['liText'+this.props.styleNumber]]}>
              {this.props.cost}
            </Text>
            <Text style={[styles.itemCostSymbol, styles['liText'+this.props.styleNumber]]}>
              {"TA"}
            </Text>
          </View>
          <Text style={[styles.itemText, styles['liText'+this.props.styleNumber]]}>
            {this.props.amount}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
});

module.exports = ItemBlock;