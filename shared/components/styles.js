'use strict';

var dimensions = require('./dimensions.js');

var React = require('react-native');
var {
  StyleSheet
} = React;

var colorNumbers = require('./color-numbers.js');
var colors = require('./colors.js');
var backgroundColors = require('./background-colors.js');
var moreColors = require('./more-colors.js');

var stylesObject = {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    position: 'relative',
    backgroundColor: moreColors.white,
    paddingTop: 20,
  },
  welcome: {
    margin: 10,
  },
  list: {
    fontSize: 20,
    textAlign: 'center',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 220,
    height: 120,
    marginTop: 20,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  ul: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 20,
    paddingRight: 20,
  },
  li: {
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
  liText: {
    fontSize: 30,
    textAlign: 'center',
  },
  gameMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gameOptions: {
    height: 50,
    width: 50,
    position: 'relative',
    paddingTop: 10,
    paddingLeft: 10,
  },
  gameOptionsLines: {
    backgroundColor: colors[0],
    borderRadius: 2,
    height: 4,
    width: 40,
    marginTop: 3,
    marginBottom: 3,
  },
  gameReset: {
  },
  gameResetImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  gameTitle: {
    textAlign: 'center',
    fontSize: 40,
    color: colors[0],
  },
  gameDetails: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  gameScore: {
    borderRadius: 15,
    width: dimensions.width/4,
    height: dimensions.width/4,
    backgroundColor: backgroundColors[0],
    justifyContent: 'center',
  },
  gameScoreText: {
    textAlign: 'center',
    color: colors[0],
    fontSize: 28,
  },
  board: {
    position: 'relative',
    backgroundColor: colors.white,
    width: dimensions.width,
    height: dimensions.width,
  },
  piece: {
    position: 'absolute',
    width: dimensions.width/4,
    height: dimensions.width/4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  pieceText: {
    textAlign: 'center',
    fontSize: 28,
  },
  gameResetMenu: {
    position: 'absolute',
    top: dimensions.height,
    height: dimensions.height,
    width: dimensions.width,
  },
  options: {
    paddingTop: 100,
    backgroundColor: moreColors.white,
    height: dimensions.height,
  },
  rule: {
    fontSize: 22,
    textAlign: 'center',
    paddingBottom: 20,
  },
  ruleHeader: {
    paddingBottom: 20,
  },
  textlink: {
    textDecorationLine: "underline",
  },
};

for(var i = 0, n = colorNumbers.length; i < n; i++) {
  stylesObject['li'+i] = {
    backgroundColor: backgroundColors[i],
  };
  stylesObject['liText'+i] = {
    color: colors[i],
  };
}

var styles = StyleSheet.create(stylesObject);

module.exports = styles;