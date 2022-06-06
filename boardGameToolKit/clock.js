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
            .stroke({ width: this.arcWidth, color: '#616C7D' });;

        //draw progress arc according to percent, starting from 12 o'clock to clockwise
        this.progressArc = this.draw.path(this.getArcPath(this.percent)).fill('none')
            .stroke({ width: this.arcWidth, color: '#F8E96A' });
        this.gradient1 = this.draw.gradient('linear', function(add) {
            add.stop(0, '#F5FD99'); //DC99FC
            add.stop(1, '#F5A341'); //84B2F8
        }).from(0, 0).to(0, 1);
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