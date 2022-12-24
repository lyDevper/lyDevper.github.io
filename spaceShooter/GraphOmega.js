class GraphOmega extends GameObj {
    constructor(x, y, rocket) {
        super();
        this.x = x;
        this.y = y;
        this.rocket = rocket;
    }

    render(ctx) {
        let rocket = this.rocket;
        drawGraph_omega(rocket.omega, this.x, this.y, 50, 10, ctx);
    }
}

function drawGraph_omega(omega, cx, cy, size, maxOmega, ctx) {
    // translate the origin to the specified position
    ctx.save();
    ctx.translate(cx, cy);
  
    // scale the angular velocity to fit within the axis size
    var scale = size / maxOmega;
    if (Math.abs(omega) > maxOmega) {
      scale = size / Math.abs(omega); // prevent exceeding
    }
    omega *= scale;
  
    // draw the x axis
    ctx.strokeStyle = "#f6ebff";
    ctx.beginPath();
    ctx.moveTo(-size, 0);
    ctx.lineTo(size, 0);
    ctx.stroke();
  
    // draw the angular velocity vector using the drawArrow() function
    if(omega != 0) {
        drawArrow(ctx, 0, 0, omega, 0, "#c8e3fa");
    }
  
    // draw the label for omega
    ctx.fillStyle = "#f6ebff";
    ctx.font = "14px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("ω", omega, 12);
  
    ctx.restore();
  }
  
  
/*
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
*/
