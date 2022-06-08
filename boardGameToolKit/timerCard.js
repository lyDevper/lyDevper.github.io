class TimerCard {
    static instc = new TimerCard(); // singleton
    static startTime = new TimeDelta($('#timerInput').val());
    static timeNow = new TimeDelta($('#timerInput').val());
    static isRunning = false;
    static {
        $().ready(() => {
            setTimeout(() => {
                TimerCard.init();
            }, 40);
        });        
    }

    constructor() {        
        //---
    }

    static init() {        
        TimerCard.draw1 = SVG('#timerClockSvg').size(192, 192);
        TimerCard.clock = new Clock(TimerCard.draw1, 96, 96, 76, 1);
        TimerCard.updateClock();

        $('#timerClockSvg').on('click', function() {
            setTimeout(function() {
                $('#timerInput').click();
            }, 1);
        });
    }

    static updateClock() {        
        TimerCard.clock.updateProgressArc(TimerCard.timeNow.msValue / TimerCard.startTime.msValue);
    }

    //0000-01-01T12:00:00Z
    static inputChangedHandler() {
        TimerCard.startTime = new TimeDelta($('#timerInput').val());
        TimerCard.timeNow = new TimeDelta($('#timerInput').val());
        TimerCard.updateClock();
        console.log(TimerCard.timeNow.toString());
    }

    static startBtnHandler() {
        if(TimerCard.isRunning) {            
            TimerCard.stopTimer();
        }
        else {            
            TimerCard.startTimer();
        }

    }

    static startTimer() {
        if(TimerCard.timeNow.msValue <= 0)
            TimerCard.resetBtnHandler();

        TimerCard.isRunning = true;
        $('#timerStartBtn').text('Stop');
            
        TimerCard.interval = setInterval(() => {            
            TimerCard.timeNow.subtracts(new TimeDelta(0, 0, 0.010));
            $('#timerInput').val(TimerCard.timeNow.toString());
            this.clock.updateProgressArc(TimerCard.timeNow.msValue / TimerCard.startTime.msValue);

            if(TimerCard.timeNow.msValue <= 0) {
                TimerCard.stopTimer();
                TimerCard.resetBtnHandler();
            }
        }, 10);

    }

    static stopTimer() {
        TimerCard.isRunning = false;
        $('#timerStartBtn').text('Start');

        clearInterval(TimerCard.interval);
    }

    static resetBtnHandler() {
        TimerCard.stopTimer();
        TimerCard.timeNow.setByValue(TimerCard.startTime.msValue);
        $('#timerInput').val(TimerCard.timeNow.toString());
        TimerCard.updateClock();
    }
}

//----------------------------------------------------------------
