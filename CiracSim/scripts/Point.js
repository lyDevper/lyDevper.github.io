class Point {
    constructor(x=0, y=0, z=0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    equals(p) {
        function isClose(a, b, tol=1e-6) {
            return Math.abs(a - b) < tol;
        }
        return isClose(this.x, p.x) && isClose(this.y, p.y) && isClose(this.z, p.z);
    }
    
    distanceTo(p) {
        return Math.sqrt((this.x - p.x) ** 2 + (this.y - p.y) ** 2 + (this.z - p.z) ** 2);
    }
}

class Vector {
    constructor(x=0, y=0, z=0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    
    magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
    }

    normalize() {
        const mag = this.magnitude();
        return new Vector(this.x / mag, this.y / mag, this.z / mag);
    }

    dotProduct(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    crossProduct(v) {
        return new Vector(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
    }

    add(v) {
        return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
    }

    subtract(v) {
        return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
    }

    multiply(scalar) {
        return new Vector(this.x * scalar, this.y * scalar, this.z * scalar);
    }

    
}