class GoalPlane extends Sprite {
    constructor(canvas, coor) {
        super(canvas, coor);
        
        this.tableColor = '#9CD5FF';
        this.basketColor = '#99FBDE';
        this.transparentBgColor = 'rgba(36, 108, 157, 0.0)';
        this.lineWidth = 3; // px
        this.shadowWidth = 0.4; //m
    }

    drawGoalPlane() {
        let tableHeight = StatePara.tableHeight;
        let basketHeight = StatePara.triangleHeight;
        let x_goal = StatePara.x_goal;

        let p1 = this.coor.xyToCanvasPoint(x_goal, 0);
        let p2 = this.coor.xyToCanvasPoint(x_goal, tableHeight);
        let p3 = this.coor.xyToCanvasPoint(x_goal, tableHeight + basketHeight);

        // draw table
        this.ctx.fillStyle = "transparent"
        this.ctx.strokeStyle = this.tableColor;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.beginPath();   
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();

        // draw table shadow
        let shadowWidth = this.coor.meterToPix(this.shadowWidth);
        let grad1 = this.ctx.createLinearGradient(p2.x, p2.y, p2.x + shadowWidth, p2.y);
        grad1.addColorStop(0, "rgba(156, 213, 255, 0.4)");
        grad1.addColorStop(0.8, this.transparentBgColor); 
        this.ctx.fillStyle = grad1;
        this.ctx.fillRect(p2.x, p2.y, shadowWidth, p1.y - p2.y);

        // draw basket
        this.ctx.fillStyle = "transparent"
        this.ctx.strokeStyle = this.basketColor;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.beginPath();
        this.ctx.moveTo(p2.x, p2.y);
        this.ctx.lineTo(p3.x, p3.y);
        this.ctx.stroke();

        // draw basket shadow
        let grad2 = this.ctx.createLinearGradient(p3.x, p3.y, p3.x + shadowWidth, p3.y);
        grad2.addColorStop(0, "rgba(153, 251, 222, 0.4)");
        grad2.addColorStop(0.8, this.transparentBgColor); 
        this.ctx.fillStyle = grad2;
        this.ctx.fillRect(p3.x, p3.y, shadowWidth, p2.y - p3.y);
    }

    render() {
        this.drawGoalPlane();
    }
}