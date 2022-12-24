class Explosion extends GameObj {    
    constructor(x, y, r, endTime=22) {
        super();        

        this.x = x;
        this.y = y;
        this.r = r;
        
        this.time = 0;
        this.endTime = endTime;
    }

    

    update() {              
        this.time ++;
        if(this.time >= this.endTime) {
            this.destroy();
        }
    }

    render(ctx) {
        //บัญญัติไตรยางศ์
        let r = this.time/this.endTime * (1.2) + this.r;
        let a = this.time/this.endTime * (0-0.8) + 1;
        drawBubble(this.x, this.y, r, a, ctx);
    }
    
}

function drawBubble(x, y, r, a, ctx) {
    const gradient = ctx.createRadialGradient(x, y, r, x, y, 0);
    gradient.addColorStop(0, `rgba(255, 255, 255, ${a})`);  // outer edge
    gradient.addColorStop(0.84, 'rgba(255, 255, 255, 0)');   // center

    // Draw the circle
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = gradient;
    ctx.fill();
}