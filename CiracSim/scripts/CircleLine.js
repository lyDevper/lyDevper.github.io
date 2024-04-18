class CircleLine extends Sprite {
    constructor(canvas, coor) {
        super(canvas, coor);
        this.color = '#99FBB5';
        this.lineWidth = 1.5; // px
    }

    drawCircle() {        
        let r = this.coor.meterToPix(StatePara.r);
        let c = this.coor.xyToCanvasPoint(0, StatePara.h_c);
        
        this.ctx.fillStyle = 'transparent';
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.beginPath();
        this.ctx.arc(c.x, c.y, r, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    drawAngLine() {
        let r = this.coor.meterToPix(StatePara.r);
        let c = this.coor.xyToCanvasPoint(0, StatePara.h_c);
        let theta = StatePara.theta;
        let thetaRad = theta * Math.PI / 180;

        let p1 = new Point(c.x, c.y);
        let p2 = new Point(c.x - r * Math.cos(thetaRad), c.y - r * Math.sin(thetaRad));
        let p3 = new Point(c.x - r, c.y);

        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p3.x, p3.y);
        this.ctx.stroke();
    }
    
    render() {
        this.drawCircle();
        this.drawAngLine();
    }
}