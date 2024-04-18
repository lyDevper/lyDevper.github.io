class Goal extends Sprite {
    constructor(canvas, coor) {
        super(canvas, coor);
        
        this.tableColor = '#FBE09B';
        this.lineWidth = 2.5; // px
    }

    drawGoal() {
        let x_f = StatePara.x_f;
        let y_f = StatePara.y_f;
        let goalDiameter = StatePara.goalDiameter;

        let boundLineLength = 0.05; // m
        //let centerLineLength = 0.12; // m
        let crossSize = 0.036; // m

        let p1 = null;
        let p2 = null;

        this.ctx.strokeStyle = this.tableColor;
        this.ctx.lineWidth = this.lineWidth;

        // draw vertical line goal
        p1 = this.coor.xyToCanvasPoint(x_f, y_f + goalDiameter / 2);
        p2 = this.coor.xyToCanvasPoint(x_f, y_f - goalDiameter / 2);
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();

        // draw bound line
        p1 = this.coor.xyToCanvasPoint(x_f - boundLineLength / 2, y_f + goalDiameter / 2);
        p2 = this.coor.xyToCanvasPoint(x_f + boundLineLength / 2, y_f + goalDiameter / 2);
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();

        p1 = this.coor.xyToCanvasPoint(x_f - boundLineLength / 2, y_f - goalDiameter / 2);
        p2 = this.coor.xyToCanvasPoint(x_f + boundLineLength / 2, y_f - goalDiameter / 2);
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();

        /*
        // draw center line
        p1 = this.coor.xyToCanvasPoint(x_f - centerLineLength / 2, y_f);
        p2 = this.coor.xyToCanvasPoint(x_f + centerLineLength / 2, y_f);
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke(); 
        */

        // draw cross at center
        this.ctx.lineWidth = 2;
        p1 = this.coor.xyToCanvasPoint(x_f + crossSize/2, y_f + crossSize/2);
        p2 = this.coor.xyToCanvasPoint(x_f - crossSize/2, y_f - crossSize/2);
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();

        p1 = this.coor.xyToCanvasPoint(x_f - crossSize/2, y_f + crossSize/2);
        p2 = this.coor.xyToCanvasPoint(x_f + crossSize/2, y_f - crossSize/2);
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();
    }

    render() {
        this.drawGoal();
    }
}