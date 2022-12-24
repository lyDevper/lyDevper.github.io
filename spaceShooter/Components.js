class Background extends GameObj {
    constructor() {
        super();

    }
    //override
    render(ctx) {
        ctx.fillStyle = '#222';
        ctx.fillRect(0, 0, cvsWidth, cvsHeight);
    }
}

class ScoreText extends GameObj {
    constructor() {
        super();
    }
    //override
    render(ctx) {
        ctx.font = '26px sans-serif';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';

        ctx.fillStyle = '#bbbcff';
        ctx.fillText('Score : ' + Game.score, cvsWidth-25, 36);
    }
}

class Hearts extends GameObj {
    constructor() {
        super();
    }
    //override
    render(ctx) {
        for(let i=0; i<Game.hearts; i++) {
            drawHeart(ctx, 36 + i*28, 24, 18);
        }        
    }
}

function drawHeart(ctx, x, y, size) {
    // Set the fill style to red
    ctx.fillStyle = '#f7a2a1';
  
    // Begin a new path
    ctx.beginPath();
  
    // Move to the starting position
    ctx.moveTo(x, y);
  
    // Draw the curve that forms the left half of the heart
    ctx.bezierCurveTo(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  
    // Draw the curve that forms the right half of the heart
    ctx.bezierCurveTo(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  
    // Close the path
    ctx.closePath();
  
    // Fill the heart with red color
    ctx.fill();
  }