class GsEngine {
    // working in z-y plane, x=0
    static centroid = new Point(); // centroid ogf the triangle

    static updateCentroid() {
        this.centroid = new Point(0, StatePara.triangleHeight / 3, StatePara.triangleSide / 2);
    }

    static {
        this.updateCentroid();
        StatePara.state_triangleHeight.addReactFunc(() => {
            this.updateCentroid();
        });
    }

    static rotateZYPoint(point, deg, center=new Point(0, 0, 0)) {
        // rotate point around -x axis center(z, y) by angle in zy plane
        let x = point.x - center.x;
        let y = point.y - center.y;
        let z = point.z - center.z;
        let rad = deg * Math.PI / 180;

        let x1 = x;
        let y1 = y * Math.cos(rad) - z * Math.sin(rad);
        let z1 = y * Math.sin(rad) + z * Math.cos(rad);
        // positive deg is clockwise from front view
        return new Point(x1 + center.x, y1 + center.y, z1 + center.z);
    }

    static rotateGsPos(pos, deg) {
        // rotate pos(0, y, z) poins by deg around centroid
        let rotated = this.rotateZYPoint(pos, deg, this.centroid);
        return rotated;
    }
}