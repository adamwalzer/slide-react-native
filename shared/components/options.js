'use strict';

var React = require('react-native');
var styles = require('./styles.js');
var ListItem = require('./listitem.js');
var FBListItem = require('./fblistitem.js');
var TextLink = require('./textlink.js');
var {
  Text,
  View,
  AsyncStorage,
} = React;

var e = require('./events.js');

var Options = React.createClass({
  getInitialState() {
    return {
      list: [],
    }
  },
  componentWillMount: function() {
    this.inItems = [
      {
        dataTarget: "high-scores",
        text: "high scores",
      },
      {
        type: "facebook",
        action: "logout",
        text: "logout with facebook",
      },
      {
        type: "facebook",
        action: "invite",
        text: "invite facebook friends",
      },
      {
        dataTarget: "rules",
        text: "how to play",
      },
      {
        dataTarget: 0,
        text: "play the game",
      },
    ];

    this.outItems = [
      {
        type: "facebook",
        action: "login",
        text: "facebook login",
      },
      {
        dataTarget: "rules",
        text: "how to play",
      },
      {
        type: "textlink",
        dataTarget: 0,
        link: "playing without signing in",
        textAfter: " means that your high scores wont be saved.",
      },
    ];

    e.on('login', this.updateUser);
    e.on('logout', this.updateUser);

    this.updateUser();
  },
  updateUser() {
    var self = this;
    AsyncStorage.getItem('userInfo')
      .then( (v) => {
        var list;
        if(v) {
          list = self.inItems;
        } else {
          list = self.outItems;
        }
        self.setState({
          list: list
        })
      }).done();
  },
  render: function() {
    var self = this;

    return (
      <View style={styles.options}>
        <View style={styles.ul}>
          {this.state.list.map(function(li,x){
            if(li.type === "facebook") {
              return (
                <FBListItem action={li.action} text={li.text} styleNumber={x} key={x} navigator={self.props.navigator} />
              );
            } else if(li.type === "textlink") {
              return (
                <TextLink dataTarget={li.dataTarget} link={li.link} textBefore={li.textBefore} textAfter={li.textAfter} styleNumber={x} key={x} navigator={self.props.navigator} />
              );
            } else {
              return (
                <ListItem dataTarget={li.dataTarget} text={li.text} styleNumber={x} key={x} navigator={self.props.navigator} />
              );
            }
          })}
        </View>
      </View>
    );
  }
});

module.exports = Options;