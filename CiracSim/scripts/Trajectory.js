class Trajectory extends Sprite {
    constructor(canvas, coor) {
        super(canvas, coor);
        this.color = '#FFFFFF';
        this.lineWidth = 2; // px
    }

    drawTrajectory() {
        // draw parametric curve
        let t_max = 15; // s
        let dt = 0.02; // s
        
        // first point
        let p0 = MathEngine.parametricCurveAtTime(0);
        p0 = this.coor.xyToCanvasPoint(p0.x, p0.y);

        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.beginPath();
        this.ctx.moveTo(p0.x, p0.y);

        for (let t = dt; t <= t_max; t += dt) {
            let p = MathEngine.parametricCurveAtTime(t);
            p = this.coor.xyToCanvasPoint(p.x, p.y);
            this.ctx.lineTo(p.x, p.y);
            
        }

        this.ctx.stroke();

        this.ctx.fillStyle = this.color;
    }

    render() {
        this.drawTrajectory();        
    }
}