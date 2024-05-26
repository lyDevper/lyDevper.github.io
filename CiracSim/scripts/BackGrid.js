class BackGrid extends Sprite {
    constructor(canvas, coor) {
        super(canvas, coor);
        
        this.gridCellSize = 0.2; // m
        this.pixPerGridCell = this.coor.meterToPix(this.gridCellSize); // px

        this.backgroundColor = '#246C9D';

        this.gridColor = '#4C84AACC';
        this.gridWidth = 1;
        this.axisColor = '#D49AE8';
        this.axisWidth = 2;
        this.shadowWidth = 0.4; // m

        this.NumbTextColor = 'rgba(255,255,255, 0.36)';
        this.textOffsetY = 0.07; // m
        this.textOffsetX = 0.03; // m
    }

    drawBackground() {
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.coor.canvasWidth, this.coor.canvasHeight);
    }

    drawGridLines() {
        let numGridLeft = Math.floor(this.coor.originX / this.pixPerGridCell);
        let numGridRight = Math.floor((this.coor.canvasWidth - this.coor.originX) / this.pixPerGridCell);
        let numGridTop = Math.floor(this.coor.originY / this.pixPerGridCell);
        let numGridBottom = Math.floor((this.coor.canvasHeight - this.coor.originY) / this.pixPerGridCell);

        this.ctx.strokeStyle = this.gridColor;
        this.ctx.lineWidth = this.gridWidth;
        this.ctx.beginPath();
        for (let i = 1; i <= numGridLeft; i++) {
            this.ctx.moveTo(this.coor.originX - i * this.pixPerGridCell, 0);
            this.ctx.lineTo(this.coor.originX - i * this.pixPerGridCell, this.coor.canvasHeight);84
            this.drawText((-i * this.gridCellSize).toFixed(1), (this.gridCellSize * (-i)) + 0.02, -this.textOffsetY, this.NumbTextColor);
        }
        for (let i = 1; i <= numGridRight; i++) {
            this.ctx.moveTo(this.coor.originX + i * this.pixPerGridCell, 0);
            this.ctx.lineTo(this.coor.originX + i * this.pixPerGridCell, this.coor.canvasHeight);
            this.drawText((i * this.gridCellSize).toFixed(1), (this.gridCellSize * i) + 0.02, -this.textOffsetY, this.NumbTextColor);
        }
        for (let i = 1; i <= numGridTop; i++) {
            this.ctx.moveTo(0, this.coor.originY - i * this.pixPerGridCell);
            this.ctx.lineTo(this.coor.canvasWidth, this.coor.originY - i * this.pixPerGridCell);
            this.drawText((i * this.gridCellSize).toFixed(1), this.textOffsetX, (this.gridCellSize * i) + 0.01, this.NumbTextColor);
        }
        for (let i = 1; i <= numGridBottom; i++) {
            this.ctx.moveTo(0, this.coor.originY + i * this.pixPerGridCell);
            this.ctx.lineTo(this.coor.canvasWidth, this.coor.originY + i * this.pixPerGridCell);
            this.drawText((-i * this.gridCellSize).toFixed(1), this.textOffsetX, (this.gridCellSize * (-i)) + 0.01, this.NumbTextColor);
        }
        this.ctx.stroke();
        this.drawText(0, this.textOffsetX, -this.textOffsetY, this.NumbTextColor);
    }

    drawText(text, x, y, color, fontSize = 10) {
        let pos = this.coor.xyToCanvasPoint(x, y);
        this.ctx.font = `${fontSize}px Roboto light`;
        this.ctx.fillStyle = color;
        this.ctx.fillText(text, pos.x, pos.y);
    }

    drawAxes() {
        this.ctx.strokeStyle = this.axisColor;
        this.ctx.lineWidth = this.axisWidth;

        this.ctx.beginPath();
        // y-axis
        this.ctx.moveTo(this.coor.originX, 0);
        this.ctx.lineTo(this.coor.originX, this.coor.canvasHeight);
        // x-axis
        this.ctx.moveTo(0, this.coor.originY);
        this.ctx.lineTo(this.coor.canvasWidth, this.coor.originY);
        this.ctx.stroke();
    }

    drawAxisShadow() {
        let shadowWidth = this.coor.meterToPix(this.shadowWidth);
        let grad = this.ctx.createLinearGradient(0, this.coor.originY, 0, this.coor.originY + shadowWidth);
        grad.addColorStop(0, "rgba(212, 154, 232, 0.4)");
        grad.addColorStop(0.8, "rgba(36, 108, 157, 0.0)"); 
        this.ctx.fillStyle = grad;
        this.ctx.fillRect(0, this.coor.originY, this.coor.canvasWidth, this.coor.originY + shadowWidth);
    }

    drawArrow() {
        let rightBound = this.coor.canvasXyToActual(this.coor.canvasWidth, this.coor.originY);
        let upperBound = this.coor.canvasXyToActual(this.coor.originX, 0);

        this.drawText("x", rightBound.x - 0.1, rightBound.y + 0.03, this.axisColor, 17);
        this.drawText("y", upperBound.x - 0.08, upperBound.y - 0.06, this.axisColor, 17);
        
        // Draw the y-axis arrowhead
        this.ctx.beginPath();
        this.ctx.moveTo(this.coor.originX, 0);
        this.ctx.lineTo(this.coor.originX + 6, 10);
        this.ctx.lineTo(this.coor.originX - 6, 10);
        this.ctx.lineTo(this.coor.originX, 0);
        this.ctx.closePath();
        this.ctx.fillStyle = this.axisColor;
        this.ctx.fill();

        // Draw the x-axis arrowhead
        this.ctx.beginPath();
        this.ctx.moveTo(this.coor.canvasWidth, this.coor.originY);
        this.ctx.lineTo(this.coor.canvasWidth - 10, this.coor.originY - 6);
        this.ctx.lineTo(this.coor.canvasWidth - 10, this.coor.originY + 6);
        this.ctx.lineTo(this.coor.canvasWidth, this.coor.originY);
        this.ctx.closePath();
        this.ctx.fillStyle = this.axisColor;
        this.ctx.fill();
    }

    render() {
        this.drawBackground();
        this.drawAxisShadow();
        this.drawGridLines();
        this.drawAxes();
        this.drawArrow();
    }

    update() {
        this.pixPerGridCell = this.coor.meterToPix(this.gridCellSize);
    }
}