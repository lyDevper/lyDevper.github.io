const PI = Math.PI;

var q = (id) => document.getElementById(id);

function deg2rad(deg) {
    return deg * Math.PI / 180;
}

function rad2deg(rad) {
    return rad * 180 / Math.PI;
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt((x1-x2)**2 + (y1-y2)**2);
}

function randInt(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

function randBetween(a, b) {
    return Math.random() * (b - a) + a;
}

function path_nGon(n, cx, cy, r, ctx) {
    // Calculate the coordinates of the vertices of the hexagon
    let vertices = [];
    for (let i = 0; i < n; i++) {
        let angle = 2 * Math.PI * i / n;
        let x = cx + r * Math.cos(angle);
        let y = cy + r * Math.sin(angle);
        vertices.push({ x: x, y: y });
    }

    // Begin a new path
    ctx.beginPath();

    // Move to the first vertex of the hexagon
    ctx.moveTo(vertices[0].x, vertices[0].y);

    // Draw lines to the other vertices
    for (let i = 1; i < n; i++) {
        ctx.lineTo(vertices[i].x, vertices[i].y);
    }

    // Close the path to complete the hexagon
    ctx.closePath();
 

}

function v1_after_collision(m1, u1, m2, u2) {
    var v1 = (m1-m2)/(m1+m2)*u1 + (2*m2/m1+m2)*u2;
    return v1;
}