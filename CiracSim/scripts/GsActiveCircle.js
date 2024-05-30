class GsActiveCircle extends Sprite {
    constructor(canvas, coor) {
        super(canvas, coor);
        this.center = new Point();
        
        this.strokeColor = '#92FCB0';
        this.fillColor = '#2427291A';
    }

    update() {
        let y = StatePara.y_goal - StatePara.tableHeight;
        let z = StatePara.z_goal;
        this.center = this.coor.xyToCanvasPoint(z, y);
    }

    drawCircle() {
        let center = this.center;
        let radius = this.coor.meterToPix(StatePara.goalDiameter / 2);
        
        this.ctx.strokeStyle = this.strokeColor;
        this.ctx.lineWidth = 2;
        this.ctx.fillStyle = this.fillColor;
        this.ctx.beginPath();
        this.ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
    }

    render() {
        this.drawCircle();
    }
}