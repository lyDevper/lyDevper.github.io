class MathEngine {
    static degToRad(deg) {
        return deg * Math.PI / 180;
    }

    static radToDeg(rad) {
        return rad * 180 / Math.PI;
    }

    static parametricCurveAtTime(t) {
        // the ball is in projectile motion. calculate parametric curve.        
        let thetaRad = MathEngine.degToRad(StatePara.theta);
        let omega = StatePara.omega;
        let r = StatePara.r;
        let h_c = StatePara.h_c;
        let x_0 = - r * Math.cos(thetaRad);
        let y_0 = h_c + r * Math.sin(thetaRad);
        let g = StatePara.g;
        //console.log(`x_0: ${x_0}, y_0: ${y_0}, theta: ${StatePara.theta}, omega: ${omega}, r: ${r}, h_c: ${h_c}, g: ${g}`);
        
        let x_t = x_0 + omega * r * Math.sin(thetaRad) * t;
        let y_t = y_0 + omega * r * Math.cos(thetaRad) * t - 0.5 * g * t ** 2;
        return new Point(x_t, y_t);
    }

    static trajectoryAtX(x) {
        let thetaRad = MathEngine.degToRad(StatePara.theta);
        let omega = StatePara.omega;
        let r = StatePara.r;
        let h_c = StatePara.h_c;
        let g = StatePara.g;

        let y = (h_c + r * Math.sin(thetaRad)) + 
                (x + r * Math.cos(thetaRad)) / Math.tan(thetaRad) + 
                - 0.5 * g * ((x + r * Math.cos(thetaRad)) / (omega * r * Math.sin(thetaRad))) ** 2;

        return y;
    }

    static getBallInitPos() {
        let thetaRad = MathEngine.degToRad(StatePara.theta);
        let r = StatePara.r;
        let x_i = - r * Math.cos(thetaRad);
        let y_i = StatePara.h_c + r * Math.sin(thetaRad);
        console.log(`x_i: ${x_i}, y_i: ${y_i}`);
        return new Point(x_i, y_i);
    }

    static getBallFinalPos() {
        let x_f = StatePara.x_goal;
        let y_f = MathEngine.trajectoryAtX(x_f);
        return new Point(x_f, y_f);
    }

    static y_f_of_theta(theta) {
        let thetaRad = MathEngine.degToRad(theta);
        let r = StatePara.r;
        let h_c = StatePara.h_c;
        let g = StatePara.g;
        let x_f = StatePara.x_goal;

        let y_f = (h_c + r * Math.sin(thetaRad)) + 
                  (x_f + r * Math.cos(thetaRad)) / Math.tan(thetaRad) + 
                  - 0.5 * g * ((x_f + r * Math.cos(thetaRad)) / (StatePara.omega * r * Math.sin(thetaRad))) ** 2;
        return y_f;
    }

    static y_f_of_r(r) {
        let thetaRad = MathEngine.degToRad(StatePara.theta);
        let h_c = StatePara.h_c;
        let g = StatePara.g;
        let x_f = StatePara.x_goal;

        let y_f = (h_c + r * Math.sin(thetaRad)) + 
                  (x_f + r * Math.cos(thetaRad)) / Math.tan(thetaRad) + 
                  - 0.5 * g * ((x_f + r * Math.cos(thetaRad)) / (StatePara.omega * r * Math.sin(thetaRad))) ** 2;
        return y_f;
    }

    static solveForTheta() {
        // solve for theta to satisfy the condition that the ball hits the target
        // at x_goal, y_goal
        // using Newtom-Raphson method
        let y_goal = StatePara.y_goal;
        let theta_result = MathEngine.solveFunctionRoot(MathEngine.y_f_of_theta, y_goal, 89, 1e-6, 1000);
        
        console.log(`theta_result solved to: ${theta_result}`);
        return theta_result;        
    }

    static solveForR() {
        // solve for r to satisfy the condition that the ball hits the target
        // at x_goal, y_goal
        // using Newtom-Raphson method
        let y_goal = StatePara.y_goal;
        let r_result = MathEngine.solveFunctionRoot(MathEngine.y_f_of_r, y_goal, 0.5, 1e-6, 1000);
        
        console.log(`r_result solved to: ${r_result}`);
        return r_result;
    }

    static solveFunctionRoot(f, expected_y, x0=0, tol=1e-6, max_iter=1000) {
        // solve f(x) = expected_y
        // using Newton-Raphson method
        let x = x0;
        let iter = 0;
        let g = function(x) {
            return f(x) - expected_y;
        }
        let dg_dx = MathEngine.getDerivative(g);

        while (Math.abs(g(x)) > tol) {
            if (iter > max_iter) {
                console.log("Max iteration reached");
                break;
            }
            x = x - g(x) / dg_dx(x);
            iter++;
        }

        return x;
    }

    static getDerivative(f, dx=1e-6) {
        return function(x) {
            return (f(x + dx) - f(x)) / dx;
        }
    }
}