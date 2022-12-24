class Rocket extends Collider {
    constructor() {
        super();

        this.x = cvsWidth / 2;
        this.y = cvsHeight / 2;

        this.vx = 0;
        this.vy = 0;

        this.ax = 0;
        this.ay = 0;

        this.theta = -90;
        this.omega = 0; //angular velocity
        this.alpha = 0; //angular acc

        this.a_thrust = 0;

        this.thrustPower = 0.07;
        this.turnPower = 0.1;

        this.m = 1.6;
    }

    update() {
        this.ax = this.a_thrust * Math.cos(deg2rad(this.theta));
        this.ay = this.a_thrust * Math.sin(deg2rad(this.theta));

        this.vx += this.ax;
        this.vy += this.ay;

        this.x += this.vx;
        this.y += this.vy;

        this.omega += this.alpha;
        this.theta += this.omega;

        //for torus world
        if(this.x < 0) {
            this.x = cvsWidth - 1;
            this.y = cvsHeight - this.y;
        }
        if(this.x > cvsWidth) {
            this.x = 0 + 1;
            this.y = cvsHeight - this.y;
        }
        if(this.y < 0) {
            this.x = cvsWidth - this.x;
            this.y = cvsHeight - 1;
        }
        if(this.y > cvsHeight) {
            this.x = cvsWidth - this.x;
            this.y = 0 + 1;
        }
        
        // check colliding----        
        for(let asteroid of Asteroid.objList) {
            
            if(this.collidesWith(asteroid)) {
                new Explosion(asteroid.x, asteroid.y, 13);
                new Explosion(this.x, this.y, 20);
                //change momentum
                this.vx = v1_after_collision(this.m, this.vx, asteroid.m, asteroid.vx);
                this.vy = v1_after_collision(this.m, this.vy, asteroid.m, asteroid.vy);
                asteroid.destroy();

                Game.hearts -= 1;
                if(Game.hearts == 0) {
                    //game over
                    new Explosion(this.x, this.y, 50, 48);
                    this.destroy();
                    showMenu();
                    
                }
            }
        }
        
    }

    render(ctx) {
        let size = 16;
        let x = this.x;
        let y = this.y;
        //drawing triangle
        ctx.save();
        
        ctx.translate(x, y);
        ctx.rotate((this.theta + 90)* Math.PI/180);
        ctx.beginPath();

        // Move to the top vertex of the triangle
        ctx.moveTo(0, 0-0.8*size);        
        ctx.lineTo(0 - 0.6*size, 0 + 0.8*size);
        ctx.lineTo(0, 0 + 0.3*size);
        ctx.lineTo(0 + 0.6*size, 0 + 0.8*size);
        
        ctx.closePath();
        ctx.fillStyle = '#ffffcd';
        ctx.fill();

        ctx.restore();
    }

    shoot() {
        new Bullet(this.x, this.y, this.theta);
    }
}
