class CoorProps {
    constructor(canvas) {
        this.canvas = canvas;

        this.canvasWidth = 0;
        this.canvasHeight = 0;
        this.pixPerMeter = 0; // px/m
        this.originX = 0; // px
        this.originY = 0; // px

        this.updateCanvasSize();

        addEventListener('resize', this.updateCanvasSize.bind(this));
    }    

    updateCanvasSize() {
        // to be overridden for desired canvas size responsively
        this.canvas.width = 0.72 * window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;

        this.pixPerMeter = this.canvasWidth / 4; // px/m        

        this.originX = this.canvasWidth / 5; // px
        this.originY = 2 * this.canvasHeight / 3; // px
    }

    meterToPix(meter) {
        return meter * this.pixPerMeter;
    }

    pixToMeter(pix) {
        return pix / this.pixPerMeter;
    }

    // convert x, y from meter to pixel
    actualToCanvasPoint(point)  {
        let x = this.originX + this.meterToPix(point.x);
        let y = this.originY - this.meterToPix(point.y);
        return new Point(x, y);
    }

    // convert x, y from pixel to meter
    canvasToActualPoint(point) {
        let x = this.pixToMeter(point.x - this.originX);
        let y = this.pixToMeter(this.originY - point.y);
        return new Point(x, y);
    }

    xyToCanvasPoint(x, y) {
        return this.actualToCanvasPoint(new Point(x, y));
    }

    // for canvas1 to display simulation content
    static buildInstance1(canvas) {
        let coor1 = new CoorProps(canvas);
        coor1.updateCanvasSize = function() {
            this.canvas.width = 0.72 * window.innerWidth;
            this.canvas.height = window.innerHeight;
            
            this.canvasWidth = this.canvas.width;
            this.canvasHeight = this.canvas.height;

            this.pixPerMeter = this.canvasWidth / 4; // px/m

            this.originX = this.canvasWidth / 5; // px
            this.originY = 2 * this.canvasHeight / 3; // px
        }.bind(coor1);
        coor1.updateCanvasSize();
        return coor1;
    }
 }
