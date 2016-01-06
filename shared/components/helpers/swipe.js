var swipe = function(opts) {
  var xDown = null;
  var yDown = null;
  var left = opts.left || function(){};
  var right = opts.right || function(){};
  var up = opts.up || function(){};
  var down = opts.down || function(){};

  function handleTouchStart(e) {
    xDown = e.nativeEvent.pageX;
    yDown = e.nativeEvent.pageY;
  };

  function handleTouchEnd(e) {
    if ( !xDown || !yDown ) {
      return;
    }

    var xUp = e.nativeEvent.pageX;
    var yUp = e.nativeEvent.pageY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff) ) {
      if ( xDiff > 0 ) {
        left();
      } else {
        right();
      }
    } else {
      if ( yDiff > 0 ) {
        up();
      } else { 
        down();
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  };

  return {
    handleTouchStart: handleTouchStart,
    handleTouchEnd: handleTouchEnd
  };
};

module.exports = swipe;