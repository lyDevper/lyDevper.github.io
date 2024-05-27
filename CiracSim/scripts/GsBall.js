class GsBall extends Sprite {
    constructor(canvas, coor) {
        super(canvas, coor);
        this.ballColor = '#FFEBA6';
    }

    drawBall() {
        let finalPos = MathEngine.getBallFinalPos();
        let ball_z = StatePara.z_robot - StatePara.basketZOffset;
        let ball_y = finalPos.y - StatePara.tableHeight;
        let p = this.coor.xyToCanvasPoint(ball_z, ball_y);
        let r = this.coor.meterToPix(StatePara.ballDiameter / 2);

        this.ctx.fillStyle = this.ballColor;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, r, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    render() {
        this.drawBall();
    }
}