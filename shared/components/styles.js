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
    width: dimensions.width*1,
    height: dimensions.height*.25,
    marginTop: dimensions.height*.02,
    marginBottom: dimensions.height*.01,
    resizeMode: 'contain',
  },
  items: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  itemBlock: {
    position: 'relative',
    borderRadius: dimensions.width*.03,
    marginBottom: dimensions.height*.04,
    marginLeft: dimensions.height*.02,
    marginRight: dimensions.height*.02,
    borderWidth: dimensions.height*.006,
    width: dimensions.width*.25,
    height: dimensions.width*.25,
  },
  itemImage: {
    width: dimensions.width*.16,
    height: dimensions.width*.16,
    marginTop: dimensions.width*.06,
    marginLeft: dimensions.width*.02,
    resizeMode: 'contain',
  },
  itemText: {
    position: 'absolute',
    fontSize: dimensions.height*.06,
    fontWeight: 'bold',
    fontFamily: 'Bangers',
    backgroundColor: 'transparent',
    top: dimensions.width*.12,
    width: dimensions.width*.25,
    textAlign: "right",
    paddingRight: dimensions.width*.04,
  },
  itemCost: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: dimensions.width*0,
    width: dimensions.width*.25,
    flexDirection: "row",
  },
  itemCostText: {
    position: 'relative',
    fontSize: dimensions.height*.06,
    fontFamily: 'Bangers',
    backgroundColor: 'transparent',
    textAlign: "left",
    paddingRight: dimensions.width*.04,
  },
  itemCostSymbol: {
    position: 'relative',
    fontSize: dimensions.height*.03,
    fontFamily: 'Bangers',
    backgroundColor: 'transparent',
    textAlign: "left",
    paddingRight: dimensions.width*.04,
    marginTop: dimensions.width*.01,
    marginLeft: -dimensions.width*.03,
  },
  inventoryItem: {
    position: 'relative',
    marginBottom: dimensions.height*.04,
    marginLeft: dimensions.height*.02,
    marginRight: dimensions.height*.02,
    borderWidth: dimensions.height*.006,
    width: dimensions.width*.25,
    height: dimensions.width*.25,
  },
  inventoryItemImage: {
    width: dimensions.width*.1,
    height: dimensions.width*.1,
    marginLeft: -dimensions.width*.02,
    resizeMode: 'contain',
  },
  inventoryItems: {
    marginBottom: dimensions.width*.06,
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
    padding: dimensions.height*.01,
    borderWidth: dimensions.height*.006,
  },
  liText: {
    fontSize: dimensions.height*.06,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'Bangers',
  },
  gameMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gameOptions: {
    height: dimensions.height*.06,
    width: dimensions.height*.06,
    position: 'relative',
    marginTop: dimensions.height*.005,
    marginLeft: dimensions.height*.01,
    resizeMode: 'contain',
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
    marginRight: dimensions.width*.02,
    resizeMode: 'contain',
  },
  gameTitle: {
    textAlign: 'center',
    fontSize: dimensions.height*.05,
    color: colors[0],
    fontFamily: 'Bangers',
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
    borderWidth: dimensions.height*.006,
  },
  gameScoreText: {
    textAlign: 'center',
    color: colors[0],
    fontSize: dimensions.height*.04,
    fontFamily: 'Bangers',
  },
  highScoreText: {
    width: dimensions.width*1,
  },
  board: {
    position: 'relative',
    backgroundColor: colors.white,
    width: dimensions.width,
    height: dimensions.width,
  },
  piece: {
    position: 'absolute',
    width: dimensions.width/4 - dimensions.height*.006,
    height: dimensions.width/4 - dimensions.height*.006,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: dimensions.width*.025,
    borderWidth: dimensions.height*.006,
  },
  pieceText: {
    textAlign: 'center',
    fontSize: dimensions.height*.04,
    fontFamily: 'Bangers',
    padding: dimensions.height*.004,
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
    textDecorationStyle: "double",
    fontFamily: 'Bangers',
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
    borderColor: colors[i],
  };
  stylesObject['liText'+i] = {
    color: colors[i],
    borderColor: colors[i],
  };
}

var styles = StyleSheet.create(stylesObject);

module.exports = styles;