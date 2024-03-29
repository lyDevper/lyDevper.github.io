function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SWatchCard {
  static init() {
    SWatchCard.draw1 = SVG('#sWatchClockSvg').size(200, 200);
    SWatchCard.clock = new Clock2(SWatchCard.draw1, 100, 100, 82, 0, 0);
    SWatchCard.updateTime();
  }

  static updateTime() {
    let secValue = SWatchCard.timeNow.msValue / 1000;
    $('#sWatchLbl').text(SWatchCard.timeNow.toString2());
    SWatchCard.clock.updateClock(secValue / 60, secValue);
  }

  static startBtnHandler() {
    if (SWatchCard.isRunning) {
      SWatchCard.stopRunning();
    } else {
      SWatchCard.startRunning();
    }
  }

  static startRunning() {
    SWatchCard.isRunning = true;
    $('#sWatchStartBtn').text('Pause');
    SWatchCard.interval = setInterval(() => {
      SWatchCard.timeNow.adds(new TimeDelta(0, 0, 0.010));
      SWatchCard.updateTime();
    }, 10);
  }

  static stopRunning() {
    SWatchCard.isRunning = false;
    $('#sWatchStartBtn').text('Start');
    clearInterval(SWatchCard.interval);
  }

  static resetBtnHandler() {
    if (SWatchCard.isRunning) {
      SWatchCard.startBtnHandler();
      return;
    }

    SWatchCard.timeNow.setByhms(0, 0, 0);
    SWatchCard.updateTime();
  }

}

_defineProperty(SWatchCard, "timeNow", new TimeDelta(0, 0, 0));

_defineProperty(SWatchCard, "isRunning", false);

_defineProperty(SWatchCard, "draw", void 0);

_defineProperty(SWatchCard, "clock", void 0);

$().ready(() => {
  setTimeout(() => {
    SWatchCard.init();
  }, 20);
});