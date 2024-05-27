class DefaultPara {
    // robot parameters
    static omega = 2 * Math.PI * 4; // rad/s
    static rpm = DefaultPara.omega / (2 * Math.PI) * 60; // rpm
    static rps = DefaultPara.omega / (2 * Math.PI); // rps
    static h_c = 0.36825; // m

    // forward parameters
    static theta = 70 // deg
    static r = 0.29 // m
    static z_robot = 0.40 + 0.55/2; // m // z of the robot

    // inverse parameters
    static x_goal = 2.20; // m
    static y_goal = 0.985; // m
    static z_goal = 0.240; // m // z of the ball from triangle origin

    // Error compensations
    static cmpst_theta = 0; // deg
    static cmpst_r = 0; // m
    static cmpst_z_robot = 0; // m // compensate the rotating link from robot center z=0

    // fixed parameters
    static tableHeight = 0.7550; // m
    static triangleSide = 0.55; // m // 0.5498
    static triangleHeight = this.triangleSide/2 * Math.sqrt(3) // m 0.4763
    static goalDiameter = 0.137; // m
    static ballDiameter = 0.040; // m
    static basketZOffset = 0.4; // m // z-position of the basket in the field // to be measured

    static g = 9.783; // m/s^2 at Bangkok

    // UI states
    static thetaRadioChecked = true;
    static rRadioChecked = false;

}

class StatePara {
    // robot parameters
    static state_omega = new State(DefaultPara.omega); // rad/s
    static state_rpm = new State(DefaultPara.rpm); // rpm
    static state_rps = new State(DefaultPara.rps); // rps
    static state_h_c = new State(DefaultPara.h_c); // m

    // forward parameters
    static state_theta = new State(DefaultPara.theta); // deg
    static state_r = new State(DefaultPara.r); // m
    static state_z_robot = new State(DefaultPara.z_robot); // m

    // inverse parameters
    static state_x_goal = new State(DefaultPara.x_goal); // m
    static state_y_goal = new State(DefaultPara.y_goal); // m
    static state_z_goal = new State(DefaultPara.z_goal); // m

    // Error compensations
    static state_cmpst_theta = new State(DefaultPara.cmpst_theta); // deg
    static state_cmpst_r = new State(DefaultPara.cmpst_r); // m
    static state_cmpst_z_robot = new State(DefaultPara.cmpst_z_robot); // m

    // fixed parameters
    static state_tableHeight = new State(DefaultPara.tableHeight); // m
    static state_triangleSide = new State(DefaultPara.triangleSide); // m
    static state_triangleHeight = new State(DefaultPara.triangleHeight); // m
    static state_goalDiameter = new State(DefaultPara.goalDiameter); // m
    static state_ballDiameter = new State(DefaultPara.ballDiameter); // m
    static state_basketZOffset = new State(DefaultPara.basketZOffset); // m

    static state_g = new State(DefaultPara.g); // m/s^2 at Bangkok

    // UI atates -----------------------------------------------------
    static state_thetaRadioChecked = new State(true);
    static state_rRadioChecked = new State(true);

    // getters and setters for each state ----------------------------
    static get omega() { return StatePara.state_omega.getValue(); }
    static set omega(value) { StatePara.state_omega.setValue(value); }

    static get rpm() { return StatePara.state_rpm.getValue(); }
    static set rpm(value) { StatePara.state_rpm.setValue(value); }

    static get rps() { return StatePara.state_rps.getValue(); }
    static set rps(value) { StatePara.state_rps.setValue(value); }

    static get h_c() { return StatePara.state_h_c.getValue(); }
    static set h_c(value) { StatePara.state_h_c.setValue(value); }

    static get theta() { return StatePara.state_theta.getValue(); }
    static set theta(value) { StatePara.state_theta.setValue(value); }

    static get r() { return StatePara.state_r.getValue(); }
    static set r(value) { StatePara.state_r.setValue(value); }

    static get z_robot() { return StatePara.state_z_robot.getValue(); }
    static set z_robot(value) { StatePara.state_z_robot.setValue(value); }

    static get x_goal() { return StatePara.state_x_goal.getValue(); }
    static set x_goal(value) { StatePara.state_x_goal.setValue(value); }

    static get y_goal() { return StatePara.state_y_goal.getValue(); }
    static set y_goal(value) { StatePara.state_y_goal.setValue(value); }

    static get z_goal() { return StatePara.state_z_goal.getValue(); }
    static set z_goal(value) { StatePara.state_z_goal.setValue(value); }

    static get cmpst_theta() { return StatePara.state_cmpst_theta.getValue(); }
    static set cmpst_theta(value) { StatePara.state_cmpst_theta.setValue(value); }

    static get cmpst_r() { return StatePara.state_cmpst_r.getValue(); }
    static set cmpst_r(value) { StatePara.state_cmpst_r.setValue(value); }

    static get cmpst_z_robot() { return StatePara.state_cmpst_z_robot.getValue(); }
    static set cmpst_z_robot(value) { StatePara.state_cmpst_z_robot.setValue(value); }

    // fixed parameters getters and setters --------------------------
    static get tableHeight() { return StatePara.state_tableHeight.getValue(); }
    static set tableHeight(value) { StatePara.state_tableHeight.setValue(value); }

    static get triangleSide() { return StatePara.state_triangleSide.getValue(); }
    static set triangleSide(value) { StatePara.state_triangleSide.setValue(value); }

    static get triangleHeight() { return StatePara.state_triangleHeight.getValue(); }
    static set triangleHeight(value) { StatePara.state_triangleHeight.setValue(value); }

    static get goalDiameter() { return StatePara.state_goalDiameter.getValue(); }
    static set goalDiameter(value) { StatePara.state_goalDiameter.setValue(value); }

    static get ballDiameter() { return StatePara.state_ballDiameter.getValue(); }
    static set ballDiameter(value) { StatePara.state_ballDiameter.setValue(value); }

    static get basketZOffset() { return StatePara.state_basketZOffset.getValue(); }
    static set basketZOffset(value) { StatePara.state_basketZOffset.setValue(value); }

    static get g() { return StatePara.state_g.getValue(); }
    static set g(value) {
        StatePara.state_g.setValue(value); 
        console.log('You are trying to set a new value for g!');
    }

    // UI state getters and setters ----------------------------------
    static get thetaRadioChecked() { return StatePara.state_thetaRadioChecked.getValue(); }
    static set thetaRadioChecked(value) { StatePara.state_thetaRadioChecked.setValue(value); }

    static get rRadioChecked() { return StatePara.state_rRadioChecked.getValue(); }
    static set rRadioChecked(value) { StatePara.state_rRadioChecked.setValue(value); }

    static {
        // bind relation for omega, rpm, rps
        StatePara.state_omega.addReactFunc((val) => {
            StatePara.state_rpm.setValue(val / (2 * Math.PI) * 60);
            StatePara.state_rps.setValue(val / (2 * Math.PI));
        });

        StatePara.state_rpm.addReactFunc((val) => {
            StatePara.state_omega.setValue(val / 60 * 2 * Math.PI);
            StatePara.state_rps.setValue(val / 60);
        });

        StatePara.state_rps.addReactFunc((val) => {
            StatePara.state_omega.setValue(val * 2 * Math.PI);
            StatePara.state_rpm.setValue(val * 60);
        });
        
        // bind relation for theta, r (not necessary)
        StatePara.state_thetaRadioChecked.addReactFunc((val) => {
            StatePara.state_rRadioChecked.setValue(!val);
        });

        StatePara.state_rRadioChecked.addReactFunc((val) => {
            StatePara.state_thetaRadioChecked.setValue(!val);
        });

        // bind relation for triangleSide, triangleHeight
        StatePara.state_triangleSide.addReactFunc((val) => {
            StatePara.state_triangleHeight.setValue(val / 2 * Math.sqrt(3));
        });

        StatePara.state_triangleHeight.addReactFunc((val) => {
            StatePara.state_triangleSide.setValue(val * 2 / Math.sqrt(3));
        });

        this.triangleSide = DefaultPara.triangleSide;
    }
}
