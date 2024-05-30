class CoorProps {
    constructor(canvas) {
        this.canvas = canvas;

        this.canvasWidth = 0;
        this.canvasHeight = 0;
        this.pixPerMeter = 0; // px/m
        this.originX = 0; // px
        this.originY = 0; // px

        this.updateCanvasSize();
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

    canvasXyToActual(x, y) {
        return this.canvasToActualPoint(new Point(x,y));
    }

    // for canvas1 to display simulation content
    static buildInstance1(canvas) {
        let coor1 = new CoorProps(canvas);
        coor1.updateCanvasSize = function() {
            this.canvas.width = 0.68 * window.innerWidth;
            this.canvas.height = window.innerHeight;
            
            this.canvasWidth = this.canvas.width;
            this.canvasHeight = this.canvas.height;

            this.pixPerMeter = this.canvasWidth / 4.5; // px/m

            this.originX = this.canvasWidth * 0.22; // px
            this.originY = this.canvasHeight * 0.62; // px
        }.bind(coor1);
        coor1.updateCanvasSize();
        addEventListener('resize', coor1.updateCanvasSize.bind(coor1));
        return coor1;
    }
    
    // for canvas2 to Goal Simulator
    static buildInstance2(canvas) {
        let coor2 = new CoorProps(canvas);
        coor2.updateCanvasSize = function() {
            this.canvas.width = 0.18 * window.innerWidth;
            this.canvas.height = this.canvas.width
            
            this.canvasWidth = this.canvas.width;
            this.canvasHeight = this.canvas.height;

            let triangleSide = StatePara.triangleSide;
            let triangleHeight = StatePara.triangleHeight;
            // calculate based on triangle size
            this.pixPerMeter = this.canvasWidth / (1.1 * triangleSide); // px/m
            // make triangle at center, oruigin at the bottom left
            this.originX = (this.canvasWidth / 2) - this.meterToPix(triangleSide/2); // px
            this.originY = 0.7*(this.canvasHeight - this.meterToPix(triangleHeight))/2 + this.meterToPix(triangleHeight); // px
            console.log(this.originX, this.originY);
            console.log(this.canvasWidth, this.canvasHeight);
        }.bind(coor2);
        coor2.updateCanvasSize();

        addEventListener('resize', coor2.updateCanvasSize.bind(coor2));
        StatePara.state_triangleSide.addReactFunc(() => {
            coor2.updateCanvasSize();
        });
        return coor2;
    }
 }
