class GraphVelocity extends GameObj {
    constructor(x, y, rocket) {
        super();
        this.x = x;
        this.y = y;
        this.rocket = rocket;
    }

    render(ctx) {
        let rocket = this.rocket;
        drawGraph_v(rocket.vx, rocket.vy, this.x, this.y, 50, 8, ctx);
    }
}

function drawGraph_v(vx, vy, cx, cy, size, maxV, ctx) {    
  
    // translate the origin to the specified position
    ctx.save();
    ctx.translate(cx, cy);
  
    // calculate the length of the velocity vector
    var v = Math.sqrt(vx * vx + vy * vy);
  
    // scale the vector to fit within the axis size
    var scale = size / maxV;
    if (v > maxV) {
        scale = size / v; //prevent exceeding
    }
    vx *= scale;
    vy *= scale;    
  
    ctx.strokeStyle = "#f6ebff";
    // draw the x and y axis
    ctx.beginPath();
    ctx.moveTo(-size, 0);
    ctx.lineTo(size, 0);
    ctx.moveTo(0, -size);
    ctx.lineTo(0, size);
    ctx.stroke();
  
    // draw the velocity vector using the drawArrow() function
    if(v != 0) {
        drawArrow(ctx, 0, 0, vx, vy, "#c8e3fa");
    }

    // draw the labels for vx and vy
    ctx.fillStyle = "#f6ebff";
    ctx.font = "13px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("vx", size+12, 0);
    ctx.textBaseline = "middle";
    ctx.fillText("vy", 0, -size-12);

    ctx.restore();
  }
  

function drawArrow(ctx, x1, y1, x2, y2, color) {
    // save the current line width and color
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
  
    // calculate the angle of the line
    var angle = Math.atan2(y1 - y2, x1 - x2);
  
    // calculate the end points for the arrowhead
    var headlen = 10;
    var theta = 0.5;
    var x3 = headlen * Math.cos(angle - theta) + x2;
    var y3 = headlen * Math.sin(angle - theta) + y2;
    var x4 = headlen * Math.cos(angle + theta) + x2;
    var y4 = headlen * Math.sin(angle + theta) + y2;
  
    // draw the shaft of the arrow
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
  
    // draw the arrowhead
    ctx.moveTo(x3, y3);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x4, y4);
  
    // stroke the arrow
    ctx.stroke();
  
    // restore the previous line width and color
    ctx.restore();
  }
  