class Asteroid extends Collider {
    static objList = [];
    constructor() {
        super();
        Asteroid.objList.push(this);

        this.x = 0
        this.y = 0

        this.vx = 0;
        this.vy = 0;

        this.ax = 0;
        this.ay = 0;

        this.theta = -90;
        this.omega = 0; //angular velocity
        this.alpha = 0; //angular acc

        this.thetaV = -90; //theta of composite vector v
        this.v = 1;

        this.spawn();
    }

    spawn() {
        let spawR = Math.sqrt(cvsWidth**2 + cvsHeight**2)/2 + 10;
        let pointTheta = Math.random() * 360;
        let spawnX = spawR * Math.cos(deg2rad(pointTheta));
        let spawnY = spawR * Math.sin(deg2rad(pointTheta));
        this.x = cvsWidth/2 + spawnX;
        this.y = cvsHeight/2 + spawnY;

        this.thetaV = Math.random() * 360;
        this.v = 1;

        this.omega = randBetween(-4, 4); //for rotating appearance

        this.appearance = {
            n: randInt(3, 8),
            r: randInt(4, 7)
        }
        //console.log('spawn asteroid', this);

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
    }

    render(ctx) {
        let r = this.appearance.r;
        let x = this.x;
        let y = this.y;

        /* for circle
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
        */
        ctx.save();

        ctx.translate(x, y);
        ctx.rotate((this.theta + 90)* Math.PI/180);
        path_nGon(this.appearance.n, 0, 0, r, ctx);
        ctx.fillStyle = '#dcdcdc';
        ctx.fill();

        ctx.restore();
    }

    forget() {
        super.forget();
        Asteroid.objList.splice(Asteroid.objList.findIndex((obj)=>obj===this), 1);        
    }
}
