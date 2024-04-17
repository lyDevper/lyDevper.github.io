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
            this.ctx.lineTo(this.coor.originX - i * this.pixPerGridCell, this.coor.canvasHeight);
        }
        for (let i = 1; i <= numGridRight; i++) {
            this.ctx.moveTo(this.coor.originX + i * this.pixPerGridCell, 0);
            this.ctx.lineTo(this.coor.originX + i * this.pixPerGridCell, this.coor.canvasHeight);
        }
        for (let i = 1; i <= numGridTop; i++) {
            this.ctx.moveTo(0, this.coor.originY - i * this.pixPerGridCell);
            this.ctx.lineTo(this.coor.canvasWidth, this.coor.originY - i * this.pixPerGridCell);
        }
        for (let i = 1; i <= numGridBottom; i++) {
            this.ctx.moveTo(0, this.coor.originY + i * this.pixPerGridCell);
            this.ctx.lineTo(this.coor.canvasWidth, this.coor.originY + i * this.pixPerGridCell);
        }
        this.ctx.stroke();
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

    render() {
        this.drawBackground();
        this.drawGridLines();
        this.drawAxes();
    }

    update() {
        this.pixPerGridCell = this.coor.meterToPix(this.gridCellSize);
    }
}