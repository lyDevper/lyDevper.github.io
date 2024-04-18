class GoalPlane extends Sprite {
    constructor(canvas, coor) {
        super(canvas, coor);
        
        this.tableColor = '#9CD5FF';
        this.basketColor = '#99FBDE';
        this.lineWidth = 3; // px
    }

    drawGoalPlane() {
        let tableHeight = StatePara.tableHeight;
        let basketHeight = StatePara.triangleHeight;
        let x_f = StatePara.x_f;

        let p1 = this.coor.xyToCanvasPoint(x_f, 0);
        let p2 = this.coor.xyToCanvasPoint(x_f, tableHeight);
        let p3 = this.coor.xyToCanvasPoint(x_f, tableHeight + basketHeight);

        // draw table
        this.ctx.fillStyle = "transparent"
        this.ctx.strokeStyle = this.tableColor;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.beginPath();   
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();

        // draw basket
        this.ctx.fillStyle = "transparent"
        this.ctx.strokeStyle = this.basketColor;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.beginPath();
        this.ctx.moveTo(p2.x, p2.y);
        this.ctx.lineTo(p3.x, p3.y);
        this.ctx.stroke();        
    }

    render() {
        this.drawGoalPlane();
    }
}