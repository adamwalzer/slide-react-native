'use strict';

var Sound = require('react-native-sound');

var sounds = {
  whoosh: new Sound('whoo.mp3', Sound.MAIN_BUNDLE),
  whoosh2: new Sound('whoo.mp3', Sound.MAIN_BUNDLE),
};

module.exports = sounds;