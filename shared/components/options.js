'use strict';

var React = require('react-native');
var styles = require('./styles.js');
var ListItem = require('./listitem.js');
var {
  Text,
  View,
} = React;

// var FBSDKLogin = require('react-native-fbsdklogin');
// var {
//   FBSDKLoginButton,
// } = FBSDKLogin;

var Options = React.createClass({
  componentWillMount: function() {
    this.inItems = [
      {
        dataTarget: "high-scores",
        text: "high scores",
      },
      {
        dataTarget: "logout",
        text: "logout with facebook",
      },
      {
        dataTarget: "rules",
        text: "how to play",
      },
      {
        dataTarget: "welcome",
        text: "play the game",
      },
    ];

    this.outItems = [
      {
        dataTarget: "login",
        text: "facebook login",
      },
      {
        dataTarget: "rules",
        text: "how to play",
      },
      {
        dataTarget: "",
        text: "<Text>playing without signing in</Text> means that your high scores wont be saved.",
      },
    ];
  },
  facebookLogout() {
    Meteor.logout(function(err){
      if (err) {
        throw new Meteor.Error("Logout failed");
      }
    });
  },
  facebookLogin() {
    Meteor.loginWithFacebook({}, function(err){
      if (err) {
        throw new Meteor.Error("Facebook login failed");
      }
    });
  },
  render: function() {
    var list, self = this;
    if(false) {
      list = this.inItems;
    } else {
      list = this.outItems;
    }

    return (
      <View style={styles.options}>
        <View style={styles.ul}>
          {list.map(function(li,x){
            return (
              <ListItem dataTarget={li.dataTarget} text={li.text} styleNumber={x} key={x} navigator={self.props.navigator} />
            );
          })}
        </View>
      </View>
    );
  }
});

module.exports = Options;