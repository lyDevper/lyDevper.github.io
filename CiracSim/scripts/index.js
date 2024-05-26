let q = (id) => document.getElementById(id);

let canvas1 = q('canvas1');
let ctx1 = canvas1.getContext('2d');
let coor1 = CoorProps.buildInstance1(canvas1);

Simulator.init(36);

let backGrid = new BackGrid(canvas1, coor1);
let robot = new Robot(canvas1, coor1);
let circleLine = new CircleLine(canvas1, coor1);
let ball = new Ball(canvas1, coor1);
let goalPlane = new GoalPlane(canvas1, coor1);
let goal = new Goal(canvas1, coor1);
let trajectory = new Trajectory(canvas1, coor1);

ParaInpHandler.buildHandlers();
PanelClpsHandler.buildHandlers();
OutTextHandler.buildHandlers();
GsPosHandler.buildHandlers();

// for fun
//forFun();
function forFun(omega = null) {
    if (omega==null) {
        omega = StatePara.omega;
    }
    let fps = 24;
    let intervalTime = 1000 / fps;
    setInterval(() => {
        StatePara.theta += omega * 180/Math.PI * intervalTime / 1000;
    }, intervalTime);
}

