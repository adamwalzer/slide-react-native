'use strict';

var React = require('react-native');
var styles = require('./styles.js');
var ListItem = require('./listitem.js');
var ItemBlock = require('./item-block.js');
var InventoryItem = require('./inventory-item.js');
var {
  Text,
  View,
  AsyncStorage,
} = React;

var e = require('./events.js');

var Shop = React.createClass({
  getInitialState() {
    return {
      userInfo: {},
      userItems: {},
    }
  },
  images: {
    bomb: require('../../images/bomb.png'),
    undo: require('../../images/undo.png'),
  },
  componentWillMount: function() {
    this.items = [
      {
        dataTarget: "bomb",
        image: this.images.bomb,
        amount: 1,
        cost: 4,
      },
      {
        dataTarget: "bomb",
        image: this.images.bomb,
        amount: 3,
        cost: 10,
      },
      {
        dataTarget: "undo",
        image: this.images.undo,
        amount: 1,
        cost: 4,
      },
      {
        dataTarget: "undo",
        image: this.images.undo,
        amount: 3,
        cost: 10,
      },
    ];

    this.list = [
      {
        dataTarget: 6,
        text: "back to options",
      },
    ];

    e.on('updateUser', this.updateUser);
    e.on('updateItems', this.updateUser);
    e.on('logout', this.updateUser);

    this.updateUser();
  },
  updateUser() {
    var self = this;
    AsyncStorage.getItem('User')
      .then( (v) => {
        if(v) {
          self.setState({
            user: JSON.parse(v),
          });
        } else {
          self.setState({
            user: {},
          });
        }
      }).done();
    AsyncStorage.getItem('Items')
      .then( (v) => {
        if(v) {
          console.log(v);
          self.setState({
            userItems: JSON.parse(v),
          });
        } else {
          self.setState({
            userItems: {},
          });
        }
      }).done();
  },
  render: function() {
    var self = this;

    return (
      <View style={styles.options}>
        <View style={styles.ul}>
          {(() => {
            if(this.state.user) {
              return (
                <View style={[styles.items, styles.inventoryItems]}>
                  <View style={styles.items}>
                    <Text style={[styles.itemCostText, styles['liText'+this.props.styleNumber]]}>
                      {this.state.user.thatAweTokens}
                    </Text>
                    <Text style={[styles.itemCostSymbol, styles['liText'+this.props.styleNumber]]}>
                      {"TA"}
                    </Text>
                  </View>
                  {(() => {
                    var items = [];
                    for(var i in self.images) {
                      if(self.images.hasOwnProperty(i)) {
                        items.push(<InventoryItem image={self.images[i]} amount={self.state.userItems[i]} key={i} />);
                      }
                    }
                    return items;
                  })()}
                </View>
              );
            }
          })()}
          <View style={styles.items}>
          {this.items.map(function(li,x){
            return (
              <ItemBlock dataTarget={li.dataTarget} image={li.image} amount={li.amount} cost={li.cost} component={'buy'} styleNumber={x} key={x} navigator={self.props.navigator} />
            );
          })}
          </View>
          {this.list.map(function(li,x){
            return (
              <ListItem dataTarget={li.dataTarget} text={li.text} styleNumber={x+4} key={x+4} navigator={self.props.navigator} />
            );
          })}
        </View>
      </View>
    );
  }
});

module.exports = Shop;