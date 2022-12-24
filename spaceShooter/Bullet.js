class Bullet extends Collider {
    static objList = [];
    constructor(x, y, theta) {
        super();
        Bullet.objList.push(this);

        this.x = x
        this.y = y

        this.vx = 0;
        this.vy = 0;

        this.ax = 0;
        this.ay = 0;

        this.theta = theta;
        this.omega = 0; //angular velocity
        this.alpha = 0; //angular acc

        this.thetaV = theta; //theta of composite vector v
        this.v = 5;

        this.spawn();
    }

    spawn() {        

    }

    update() {      
        this.vx = this.v * Math.cos(deg2rad(this.thetaV));
        this.vy = this.v * Math.sin(deg2rad(this.thetaV));

        this.x += this.vx;
        this.y += this.vy;

        this.omega += this.alpha;
        this.theta += this.omega;

        //deleting if going outside, saving memory -_-
        let spawR = Math.sqrt(cvsWidth**2 + cvsHeight**2)/2 + 10+5;
        let dist_from_center = distance(this.x, this.y, cvsWidth/2, cvsHeight/2);
        if(dist_from_center > spawR) {
            //console.log('destroying', this);
            this.destroy();
        }

        // check colliding----        
        for(let asteroid of Asteroid.objList) {
            
            if(this.collidesWith(asteroid)) {
                new Explosion(asteroid.x, asteroid.y, 13)
                asteroid.destroy();
                this.destroy();                
                Game.score += 1;
            }
        }
    }

    render(ctx) {        
        let x1 = this.x;
        let y1 = this.y;
        
        ctx.save();

        ctx.translate(x1, y1);
        ctx.rotate((this.theta + 90)* Math.PI/180);
        
        ctx.beginPath();
        ctx.moveTo(0, 4);
        ctx.lineTo(0, -4);

        ctx.lineWidth = 3;
        ctx.strokeStyle = '#fde8e8';
        ctx.stroke();

        ctx.restore();
    }

    forget() {
        super.forget();
        Bullet.objList.splice(Bullet.objList.findIndex((obj)=>obj===this), 1);        
    }
}
