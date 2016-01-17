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
    alignItems: 'stretch',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    position: 'relative',
    backgroundColor: moreColors.white,
    paddingTop: dimensions.height*.04,
  },
  welcome: {
    margin: dimensions.width*.02,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: dimensions.width*.5,
    height: dimensions.height*.15,
    marginTop: dimensions.height*.04,
    marginBottom: dimensions.height*.04,
    resizeMode: 'contain',
  },
  ul: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: dimensions.width*.06,
    paddingRight: dimensions.width*.06,
  },
  li: {
    borderRadius: dimensions.width*.03,
    marginBottom: dimensions.height*.02,
    padding: dimensions.height*.02,
  },
  liText: {
    fontSize: dimensions.height*.04,
    textAlign: 'center',
  },
  gameMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gameOptions: {
    height: dimensions.height*.1,
    width: dimensions.height*.1,
    position: 'relative',
    paddingTop: dimensions.height*.005,
    paddingLeft: dimensions.height*.02,
  },
  gameOptionsLines: {
    backgroundColor: colors[0],
    borderRadius: dimensions.height*.002,
    height: dimensions.height*.005,
    width: dimensions.width*.1,
    marginTop: dimensions.height*.005,
    marginBottom: dimensions.height*.005,
  },
  gameReset: {
  },
  gameResetImage: {
    width: dimensions.width*.11,
    height: dimensions.width*.11,
    resizeMode: 'contain',
  },
  gameTitle: {
    textAlign: 'center',
    fontSize: dimensions.height*.05,
    color: colors[0],
  },
  gameDetails: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  gameScore: {
    borderRadius: dimensions.width*.025,
    width: dimensions.width/4,
    height: dimensions.width/4,
    backgroundColor: backgroundColors[0],
    justifyContent: 'center',
  },
  gameScoreText: {
    textAlign: 'center',
    color: colors[0],
    fontSize: dimensions.height*.04,
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
    borderRadius: dimensions.width*.025,
  },
  pieceText: {
    textAlign: 'center',
    fontSize: dimensions.height*.04,
  },
  gameResetMenu: {
    position: 'absolute',
    top: dimensions.height,
    height: dimensions.height,
    width: dimensions.width,
  },
  options: {
    paddingTop: dimensions.height*.1,
    backgroundColor: moreColors.white,
    height: dimensions.height,
  },
  rule: {
    fontSize: dimensions.height*.028,
    textAlign: 'center',
    paddingBottom: dimensions.height*.02,
  },
  ruleHeader: {
    paddingBottom: dimensions.height*.02,
  },
  textlink: {
    textDecorationLine: "underline",
  },
  highScore: {
    justifyContent: 'space-between',
    width: dimensions.width,
    height: dimensions.width*1.35,
    flex: 1,
    alignItems: 'center',
    paddingTop: dimensions.height*.025,
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