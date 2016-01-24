'use strict';

import Dimensions from 'Dimensions';
var dimensions = Dimensions.get('window');

var React = require('react-native');
var styles = require('../styles.js');
var {
  Text,
  View,
} = React;

var Animated = require('Animated');
var colors = require('../colors.js');
var backgroundColors = require('../background-colors.js');

var piece = function(opts) {
  this.initialize = function(opts) {
    var opts = opts || {};
    this.styleFunction = opts.styleFunction || function(v) {
      return Math.log2(v)%16;
    };
    this.w = opts.w ? dimensions.width/opts.w : 25;
    this.x = opts.x || 0;
    this.y = opts.y || 0;
    this.v = opts.z || 2;
    this.m = opts.m || 0
    this._id = opts._id || 0;
    this.p = opts.p || {};
    this.s = this.styleFunction(this.v);
  };
  this.notNew = function() {
    this.new = false;
  };
  this.val = function(nv) {
    this.v = nv || this.v;
    if(this.v===" ") {
      this.destroy();
    } else {
      this.s = this.styleFunction(this.v);
    }
    return this.v;
  };
  this.move = function(m) {
    this.m = m || this.m;
    return this.m;
  };
  this.getX = function() {
    return this.x;
  };
  this.moveX = function(nx) {
    this.x = nx;
    return this;
  };
  this.getY = function() {
    return this.y;
  };
  this.moveY = function(ny) {
    this.y = ny;
    return this;
  };
  this.destroy = function() {
    this.s = 16;
    this.toDestroy = true;
  };
  this.initialize(opts);
};

var Piece = React.createClass({
  getInitialState() {
    return {
      styleNumber: new Animated.Value(Math.log2(this.props.opts.v)%16),
      textStyleNumber: new Animated.Value(Math.log2(this.props.opts.v)%16),
      opacity: new Animated.Value(0),
      left: new Animated.Value(this.props.opts.x*this.props.opts.w),
      top: new Animated.Value(this.props.opts.y*this.props.opts.w),
      new: true,
    };
  },
  getOffsets() {

    var backgroundColor = this.state.styleNumber.interpolate({
        inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        outputRange: backgroundColors,
    });

    Animated.parallel([
      Animated.timing(this.state.opacity, {
        duration: 200,
        toValue: !!this.props.opts.toDestroy && !this.state.new ? 0 : 1,
      }),
      Animated.timing(this.state.styleNumber, {
        duration: 200,
        toValue: this.props.opts.s,
      }),
      Animated.timing(this.state.left, {
        duration: 200,
        toValue: this.props.opts.w*this.props.opts.x,
      }),
      Animated.timing(this.state.top, {
        duration: 200,
        toValue: this.props.opts.w*this.props.opts.y,
      }),
    ]).start();

    return {
      left: this.state.left,
      top: this.state.top,
      opacity: this.state.opacity,
      backgroundColor: backgroundColor,
    };
  },
  getTextOffsets() {
    var textColor = this.state.textStyleNumber.interpolate({
        inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        outputRange: colors,
    });

    Animated.timing(this.state.textStyleNumber, {
      duration: 200,
      toValue: this.props.opts.s,
    }).start();

    return {
      color: textColor,
    };
  },
  getStyles() {
    return [
      styles.piece,
      this.getOffsets(),
    ];
  },
  getTextStyles() {
    return [
      styles.pieceText,
      this.getTextOffsets(),
    ];
  },
  render() {
    return (
      <Animated.View style={this.getStyles()}>
        <Animated.Text style={this.getTextStyles()}>{this.props.opts.v}</Animated.Text>
      </Animated.View>
    );
  },
});

module.exports = {
  piece: piece,
  Piece: Piece,
};