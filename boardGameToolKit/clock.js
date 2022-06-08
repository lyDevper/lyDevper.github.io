//using svg.js to make circular progress bar
class Clock {
    constructor(draw, x, y, radius, percent) {
        this.draw = draw;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.percent = percent;        

        this.arcWidth = 6;
        this.init();
    }

    init() {
        this.body = this.draw.circle(this.radius * 2 +this.arcWidth)
            .fill('#303135').center(this.x, this.y);
        this.body.addClass('svg-drop-shadow');

        this.bgArc = this.draw.circle(this.radius * 2).fill('none').center(this.x, this.y)
            .stroke({ width: this.arcWidth, color: '#616C7D' });

        //draw progress arc according to percent, starting from 12 o'clock to clockwise
        this.progressArc = this.draw.path(this.getArcPath(this.percent)).fill('none')
            .stroke({ width: this.arcWidth, color: '#F8E96A' });
        this.gradient1 = this.draw.gradient('linear', function(add) {
            add.stop(0, '#F5FD99'); //DC99FC
            add.stop(1, '#F5A341'); //84B2F8
        }).from(1, 0).to(0, 1);
        this.progressArc.stroke({color: this.gradient1});

        this.updateProgressArc(this.percent);
    }

    getArcPath(percent) {
        let startAngle = -90;
        let endAngle = startAngle + 360 * percent;
        let x0 = this.x;
        let y0 = this.y - this.radius;
        let x1 = this.x + this.radius * Math.cos(endAngle * Math.PI / 180);
        let y1 = this.y + this.radius * Math.sin(endAngle * Math.PI / 180);
        let pathArray = new SVG.PathArray(`M${x0},${y0} A${this.radius},${this.radius} 0 ${percent > 0.5 ? 1 : 0} 1 ${x1},${y1}`);
        return pathArray;
    }

    updateProgressArc(percent) {
        percent >= 1 ? percent = 0.9999999 : null;
        this.percent = percent;
        this.progressArc.plot(this.getArcPath(percent));
    }

}

class Clock2 {
    constructor(draw, x, y, radius, minute=0, second=0) {
        this.draw = draw;
        this.x = x;
        this.y = y;
        this.radius = radius;
        
        this.minute = minute;
        this.second = second;

        this.arcWidth = 7;
        this.init();
    }

    init() {
        this.body = this.draw.circle(this.radius * 2 +this.arcWidth)
            .fill('#303135').center(this.x, this.y);
        this.body.addClass('svg-drop-shadow');

        this.bgArc = this.draw.circle(this.radius * 2).fill('none').center(this.x, this.y)
            .stroke({ width: this.arcWidth, color: '#616C7D' });
        this.gradient1 = this.draw.gradient('linear', function(add) {
            add.stop(0, '#B17BF5'); //DC99FC
            add.stop(1, '#F980C9'); //84B2F8
        }).from(1, 0).to(0, 1);
        this.bgArc.stroke({color: this.gradient1});

        let points1 = [[this.x, this.y - this.radius - this.arcWidth/2 - 1], 
                        [this.x, this.y - this.radius + this.arcWidth/2 + 2]];
        this.minuteHand = this.draw.line(points1)
            .stroke({ width: 4, color: '#ffffff', linecap: 'round' })
            .addClass('svg-drop-shadow2');

        let points2 = [[this.x, this.y - this.radius - this.arcWidth/2 + 1], 
                        [this.x, this.y - this.radius + this.arcWidth/2 + 1]];
        this.secondHand = this.draw.line(points2)
            .stroke({ width: 4, color: '#ffffff', linecap: 'round' })
            .addClass('svg-drop-shadow2');

        this.updateClock(this.minute, this.second);
    }

    updateClock(minute = this.minute, second = this.second) {
        this.minute = minute;
        this.second = second;
        //rotate minute hand and second hand according to minute and second
        let minAng = this.minute * 360 / 60;
        let secAng = this.second * 360 / 60;
        this.minuteHand.transform({rotate: minAng,
                                    origin: [this.x, this.y]});
        this.secondHand.transform({rotate: secAng,
                                    origin: [this.x, this.y]});

    }

}