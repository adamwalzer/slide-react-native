'use strict';

var React = require('react-native');
var styles = require('./styles.js');
var ItemBlock = require('./item-block.js');
var BuyItem = require('./buy-item.js');
var {
  Text,
  View,
} = React;

var Buy = React.createClass({
  componentWillMount: function() {
    this.list = [
      {
        dataTarget: "shop",
        text: "yes",
        item: this.props.opts,
      },
      {
        dataTarget: "shop",
        text: "no",
      },
    ];
  },
  render: function() {
    var self = this, o = this.props.opts;

    return (
      <View style={styles.options}>
        <View style={styles.ul}>
          <Text style={styles.liText}>
            {"Trade "+o.cost+" tokens for "+o.amount+" "+o.item+" item"+(o.amount===1?"":"s")+"?"}
            {"\n"}
          </Text>
          {this.list.map(function(li,x){
            return (
              <BuyItem dataTarget={li.dataTarget} text={li.text} item={li.item} styleNumber={x} key={x} navigator={self.props.navigator} />
            );
          })}
        </View>
      </View>
    );
  }
});

module.exports = Buy;