class GsMouseHandler{
    constructor(canvas, coor) {
        // when mouse click on the canvas, 
        // get the mouse position in canvas pix coordinate
        // then convert to actual coordinate

        this.canvas = canvas;
        this.coor = coor;

        this.isMouseDown = false;

        this.canvas.addEventListener('click', (e) => {
            this.handleFunc(e); // to bind 'this'
        });
        
        this.canvas.addEventListener('dblclick', (e) => {
            this.handleFunc(e);
            ParaInpHandler.solveForAnswer();
        });

        // for mouse drag on the canvas
        this.canvas.addEventListener('mousedown', (e) => {
            this.isMouseDown = true;
        });
        this.canvas.addEventListener('mouseup', (e) => {
            this.isMouseDown = false;
        });
        this.canvas.addEventListener('mousemove', (e) => {
            if (this.isMouseDown) {
                this.handleFunc(e);
            }
        });
    }

    handleFunc(e) {
        let rect = this.canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        let point = this.coor.canvasXyToActual(x, y);
        console.log('click at', point);
        this.updateActiveGoalPos(point.x, point.y);
    }

    updateActiveGoalPos(z, y) {
        // update the goal position
        StatePara.z_goal = z;
        StatePara.y_goal = y + StatePara.tableHeight;
    }
}