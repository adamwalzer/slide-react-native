/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var styles = require('./styles.js');
var {
  AppRegistry,
  Navigator,
  View,
  Text,
  AsyncStorage,
} = React;
var {
  Analytics,
  Hits: GAHits,
  Experiment: GAExperiment
} = require('react-native-google-analytics');

var ddp = require('./ddp.js');
var ga = this.ga = null;

var Welcome = require('./welcome.js');
var OriginalGame = require('./original-game.js');
var InfinityGame = require('./infinity-game.js');
var TwistGame = require('./twist-game.js');
var ClearGame = require('./clear-game.js');
var CombineGame = require('./combine-game.js');
var Options = require('./options.js');
var Settings = require('./settings.js');
var Shop = require('./shop.js');
var Buy = require('./buy.js');
var Rules = require('./rules.js');
var OriginalRules = require('./original-rules.js');
var InfinityRules = require('./infinity-rules.js');
var TwistRules = require('./twist-rules.js');
var ClearRules = require('./clear-rules.js');
var CombineRules = require('./combine-rules.js');
var HighScores = require('./high-scores.js');
var OriginalHighScores = require('./original-high-scores.js');
var InfinityHighScores = require('./infinity-high-scores.js');
var TwistHighScores = require('./twist-high-scores.js');
var ClearHighScores = require('./clear-high-scores.js');
var CombineHighScores = require('./combine-high-scores.js');

var slide = React.createClass({
  componentWillMount() {
    ga = new Analytics('UA-68375108-1', 'auto');
    var screenView = new GAHits.ScreenView('Slide App', 'Welcome Screen', '1', 'com.thatawe.slide');
    // ga.send(screenView);
  },
  componentDidMount() {
    
  },
  renderScene(route, navigator) {
    switch (route.component) {
      case 'original-game':
        return <OriginalGame navigator={navigator} />;
        break;
      case 'infinity-game':
        return <InfinityGame navigator={navigator} />;
        break;
      case 'twist-game':
        return <TwistGame navigator={navigator} />;
        break;
      case 'clear-game':
        return <ClearGame navigator={navigator} />;
        break;
      case 'combine-game':
        return <CombineGame navigator={navigator} />;
        break;
      case 'options':
        return <Options navigator={navigator} />;
        break;
      case 'settings':
        return <Settings navigator={navigator} />;
        break;
      case 'shop':
        return <Shop navigator={navigator} />;
        break;
      case 'buy':
        return <Buy navigator={navigator} opts={route} />;
        break;
      case 'rules':
        return <Rules navigator={navigator} />;
        break;
      case 'original-rules':
        return <OriginalRules navigator={navigator} />;
        break;
      case 'infinity-rules':
        return <InfinityRules navigator={navigator} />;
        break;
      case 'twist-rules':
        return <TwistRules navigator={navigator} />;
        break;
      case 'clear-rules':
        return <ClearRules navigator={navigator} />;
        break;
      case 'combine-rules':
        return <CombineRules navigator={navigator} />;
        break;
      case 'high-scores':
        return <HighScores navigator={navigator} />;
        break;
      case 'original-high-scores':
        return <OriginalHighScores navigator={navigator} />;
        break;
      case 'infinity-high-scores':
        return <InfinityHighScores navigator={navigator} />;
        break;
      case 'twist-high-scores':
        return <TwistHighScores navigator={navigator} />;
        break;
      case 'clear-high-scores':
        return <ClearHighScores navigator={navigator} />;
        break;
      case 'combine-high-scores':
        return <CombineHighScores navigator={navigator} />;
        break;
      case 'welcome':
      default:
        return <Welcome navigator={navigator} />;
    }
  },
  initialRouteStack: [
    {component: "welcome"},
    {component: "original-game"},
    {component: "infinity-game"},
    {component: "twist-game"},
    {component: "clear-game"},
    {component: "combine-game"},
    {component: "options"},
  ],
  render: function() {
    return (
      <Navigator
        initialRouteStack={this.initialRouteStack}
        initialRoute={this.initialRouteStack[0]} 
        renderScene={this.renderScene} />
    );
  }
});

module.exports = slide;
