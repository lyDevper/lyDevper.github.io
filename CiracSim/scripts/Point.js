class Point {
    constructor(x=0, y=0) {
        this.x = x;
        this.y = y;
    }
    
    distanceTo(p) {
        return Math.sqrt((this.x - p.x) ** 2 + (this.y - p.y) ** 2);
    }
}

class Vector {
    constructor(x=0, y=0) {
        this.x = x;
        this.y = y;
    }
    
    magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    
    normalize() {
        let mag = this.magnitude();
        return new Vector(this.x / mag, this.y / mag);
    }
    
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    
    cross(v) {
        return this.x * v.y - this.y * v.x;
    }
    
    add(v) {
        return new Vector(this.x + v.x, this.y + v.y);
    }
    
    subtract(v) {
        return new Vector(this.x - v.x, this.y - v.y);
    }
    
    scale(s) {
        return new Vector(this.x * s, this.y * s);
    }
    
    rotate(theta) {
        let x = this.x * Math.cos(theta) - this.y * Math.sin(theta);
        let y = this.x * Math.sin(theta) + this.y * Math.cos(theta);
        return new Vector(x, y);
    }
}