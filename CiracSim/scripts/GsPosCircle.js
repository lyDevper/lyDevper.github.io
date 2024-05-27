class GsPosCircle extends Sprite {
    constructor(canvas, coor, gsPosState, NumbText=0) {
        super(canvas, coor);
        this.gsPosState = gsPosState;
        this.NumbText = NumbText;
        this.center = new Point();
        
        this.circleColor = '#9EA8B1';
        this.NumbTextColor = '#ffffff';
        
    }

    update() {
        let pos = this.gsPosState.rotatedPos;
        this.center = this.coor.xyToCanvasPoint(pos.z, pos.y);
    }

    drawCircle() {
        let center = this.center;
        let radius = this.coor.meterToPix(StatePara.goalDiameter / 2);
        
        this.ctx.fillStyle = this.circleColor;
        this.ctx.beginPath();
        this.ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
        this.ctx.fill();
    }
    
    drawNumbText() {
        // draw number text at the center of the circle
        this.ctx.font = `24px sans-serif`;
        this.ctx.fillStyle = this.NumbTextColor;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(this.NumbText, this.center.x, this.center.y);

    }

    render() {
        this.drawCircle();
        this.drawNumbText();
    }
}