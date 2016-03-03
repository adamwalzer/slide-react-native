/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var styles = require('./shared/components/styles.js');
var {
  AppRegistry,
  Navigator,
  View,
  Text,
} = React;
var {
  Analytics,
  Hits: GAHits,
  Experiment: GAExperiment
} = require('react-native-google-analytics');

var ddp = require('./shared/components/ddp.js');
var ga = this.ga = null;

var Welcome = require('./shared/components/welcome.js');
var OriginalGame = require('./shared/components/original-game.js');
var InfinityGame = require('./shared/components/infinity-game.js');
var TwistGame = require('./shared/components/twist-game.js');
var ClearGame = require('./shared/components/clear-game.js');
var CombineGame = require('./shared/components/combine-game.js');
var Options = require('./shared/components/options.js');
var Rules = require('./shared/components/rules.js');
var OriginalRules = require('./shared/components/original-rules.js');
var InfinityRules = require('./shared/components/infinity-rules.js');
var TwistRules = require('./shared/components/twist-rules.js');
var ClearRules = require('./shared/components/clear-rules.js');
var CombineRules = require('./shared/components/combine-rules.js');
var HighScores = require('./shared/components/high-scores.js');
var OriginalHighScores = require('./shared/components/original-high-scores.js');
var InfinityHighScores = require('./shared/components/infinity-high-scores.js');
var TwistHighScores = require('./shared/components/twist-high-scores.js');
var ClearHighScores = require('./shared/components/clear-high-scores.js');
var CombineHighScores = require('./shared/components/combine-high-scores.js');

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

AppRegistry.registerComponent('slide', () => slide);
