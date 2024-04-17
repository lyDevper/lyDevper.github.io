class DefaultPara {
    // robot parameters
    static omega = 2 * Math.PI * 4; // rad/s
    static rpm = DefaultPara.omega / (2 * Math.PI) * 60; // rpm
    static rps = DefaultPara.omega / (2 * Math.PI); // rps
    static h_c = 0.36825; // m

    // forward parameters
    static theta = 64 // deg
    static r = 0.29 // m

    // inverse parameters
    static x_f = 2.20; // m
    static y_f = 0.985; // m

    // fixed parameters
    static tableHeight = 0.7550; // m
    static triangleHeight = 0.4763; // m
    static goalDiameter = 0.137; // m
    static ballDiameter = 0.040; // m

    static g = 9.783; // m/s^2 at Bangkok

    // UI states
    static thetaRadioChecked = true;
    static rRadioChecked = false;

}

class StatePara {
    static state_omega = new State(DefaultPara.omega); // rad/s
    static state_rpm = new State(DefaultPara.rpm); // rpm
    static state_rps = new State(DefaultPara.rps); // rps
    static state_h_c = new State(DefaultPara.h_c); // m

    // forward parameters
    static state_theta = new State(DefaultPara.theta); // deg
    static state_r = new State(DefaultPara.r); // m

    // inverse parameters
    static state_x_f = new State(DefaultPara.x_f); // m
    static state_y_f = new State(DefaultPara.y_f); // m

    // fixed parameters
    static state_tableHeight = new State(DefaultPara.tableHeight); // m
    static state_triangleHeight = new State(DefaultPara.triangleHeight); // m
    static state_goalDiameter = new State(DefaultPara.goalDiameter); // m
    static state_ballDiameter = new State(DefaultPara.ballDiameter); // m

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

    static get x_f() { return StatePara.state_x_f.getValue(); }
    static set x_f(value) { StatePara.state_x_f.setValue(value); }

    static get y_f() { return StatePara.state_y_f.getValue(); }
    static set y_f(value) { StatePara.state_y_f.setValue(value); }

    static get tableHeight() { return StatePara.state_tableHeight.getValue(); }
    static set tableHeight(value) { StatePara.state_tableHeight.setValue(value); }

    static get triangleHeight() { return StatePara.state_triangleHeight.getValue(); }
    static set triangleHeight(value) { StatePara.state_triangleHeight.setValue(value); }

    static get goalDiameter() { return StatePara.state_goalDiameter.getValue(); }
    static set goalDiameter(value) { StatePara.state_goalDiameter.setValue(value); }

    static get ballDiameter() { return StatePara.state_ballDiameter.getValue(); }
    static set ballDiameter(value) { StatePara.state_ballDiameter.setValue(value); }

    static get g() { return StatePara.state_g.getValue(); }
    static set g(value) { StatePara.state_g.setValue(value); }

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
    }
}
