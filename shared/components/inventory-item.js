'use strict';

var React = require('react-native');
var styles = require('./styles.js');
var {
  Text,
  Image,
  View,
} = React;

var InventoryItem = React.createClass({
  render: function() {
    return (
      <View style={styles.items}>
        <Text style={styles.itemCostText}>
          {this.props.amount}
        </Text>
        <Image source={this.props.image} style={styles.inventoryItemImage} />
      </View>
    );
  }
});

module.exports = InventoryItem;