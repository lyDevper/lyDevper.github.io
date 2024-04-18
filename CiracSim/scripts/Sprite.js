class Sprite {
    constructor(canvas, coor) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.coor = coor;
        Simulator.addSprite(this);
    }

    render() {
        // to be overridden
    }

    update() {
        // to be overridden
    }
    
}