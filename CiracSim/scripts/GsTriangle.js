class GsTriangle extends Sprite {
    constructor(canvas, coor) {
        super(canvas, coor);
        this.triangleColor = '#63717C';
    }

    drawBackground() {
        // clear canvas
        this.ctx.clearRect(0, 0, this.coor.canvasWidth, this.coor.canvasHeight);
    }

    drawTriangle() {
        let triangleSide = StatePara.triangleSide; // m
        let triangleHeight = StatePara.triangleHeight; // m

        let p1 = this.coor.xyToCanvasPoint(0, 0);
        let p2 = this.coor.xyToCanvasPoint(triangleSide, 0);
        let p3 = this.coor.xyToCanvasPoint(triangleSide / 2, triangleHeight);

        this.ctx.fillStyle = this.triangleColor;
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.lineTo(p3.x, p3.y);
        this.ctx.closePath();
        this.ctx.fill();
    }
    
    render() {
        this.drawBackground();
        this.drawTriangle();
    }
}