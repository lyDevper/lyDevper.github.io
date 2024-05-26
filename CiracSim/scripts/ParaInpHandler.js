class ParaInpHandler {
    /* This class is a template for objects that will handle component
    of parameter input.
    One component contains text input, reset button.
    This will handle events when text input is changed or reset button is clicked,
    and update with StatePara.
    */

    constructor(inputId, resetId, state, defaultVal, numStep=0.1) {
        this.input = document.getElementById(inputId);
        this.resetBtn = document.getElementById(resetId);
        this.state = state;
        this.defaultVal = defaultVal;

        // use arrow function to bind this
        this.input.addEventListener('change', () => {
            this.state.setValue(parseFloat(this.input.value));
        });

        this.resetBtn.addEventListener('click', () => {
            this.state.setValue(this.defaultVal);
        });

        // bind state to input appearance
        this.state.addReactFunc((val) => {
            this.setValue(val);
        });

        this.setValue(this.defaultVal);
        this.input.step = numStep;
    }
    
    getValue() {
        return this.input.value;
    }

    setValue(value) {
        // to be considered about decimal places
        this.input.value = value;
    }

    static buildHandlers() {
        // instantiate each handler as a static property
        this.rpm_handler = new ParaInpHandler('inp_rpm', 'reset_rpm', 
                        StatePara.state_rpm, DefaultPara.rpm, 1);

        this.rps_handler = new ParaInpHandler('inp_rps', 'reset_rps', 
                        StatePara.state_rps, DefaultPara.rps, 0.1);

        this.omega_handler = new ParaInpHandler('inp_omega', 'reset_omega',
                        StatePara.state_omega, DefaultPara.omega, 0.1);

        this.h_c_handler = new ParaInpHandler('inp_h_c', 'reset_h_c',
                        StatePara.state_h_c, DefaultPara.h_c, 0.01);

        this.tableHeight_handler = new ParaInpHandler('inp_tableHeight', 'reset_tableHeight',
                        StatePara.state_tableHeight, DefaultPara.tableHeight, 0.01);

        this.triangleSide_handler = new ParaInpHandler('inp_triangleSide', 'reset_triangleSide',
                        StatePara.state_triangleSide, DefaultPara.triangleSide, 0.01);

        this.triangleHeight_handler = new ParaInpHandler('inp_triangleHeight', 'reset_triangleHeight',
                        StatePara.state_triangleHeight, DefaultPara.triangleHeight, 0.01);

        this.goalDiameter = new ParaInpHandler('inp_goalDiameter', 'reset_goalDiameter',
                        StatePara.state_goalDiameter, DefaultPara.goalDiameter, 0.01);

        this.ballDiameter = new ParaInpHandler('inp_ballDiameter', 'reset_ballDiameter',
                        StatePara.state_ballDiameter, DefaultPara.ballDiameter, 0.005);

        this.basketZOffset_handler = new ParaInpHandler('inp_basketZOffset', 'reset_basketZOffset',
                        StatePara.state_basketZOffset, DefaultPara.basketZOffset, 0.01);

        this.theta_handler = new ParaInpHandler('inp_theta', 'reset_theta',
                        StatePara.state_theta, DefaultPara.theta, 0.1);

        this.r_handler = new ParaInpHandler('inp_r', 'reset_r',
                        StatePara.state_r, DefaultPara.r, 0.005);

        this.z_robot_handler = new ParaInpHandler('inp_z_robot', 'reset_z_robot',
                        StatePara.state_z_robot, DefaultPara.z_robot, 0.01);

        this.x_goal_handler = new ParaInpHandler('inp_x_goal', 'reset_x_goal',
                        StatePara.state_x_goal, DefaultPara.x_goal, 0.01);

        this.y_goal_handler = new ParaInpHandler('inp_y_goal', 'reset_y_goal',
                        StatePara.state_y_goal, DefaultPara.y_goal, 0.005);

        this.z_goal_handler = new ParaInpHandler('inp_z_goal', 'reset_z_goal',
                        StatePara.state_z_goal, DefaultPara.z_goal, 0.01);

        this.cmpst_theta_handler = new ParaInpHandler('inp_cmpst_theta', 'reset_cmpst_theta',
                        StatePara.state_cmpst_theta, DefaultPara.cmpst_theta, 0.1);

        this.cmpst_r_handler = new ParaInpHandler('inp_cmpst_r', 'reset_cmpst_r',
                        StatePara.state_cmpst_r, DefaultPara.cmpst_r, 0.001);

        this.cmpst_z_robot_handler = new ParaInpHandler('inp_cmpst_z_robot', 'reset_cmpst_z_robot',
                        StatePara.state_cmpst_z_robot, DefaultPara.cmpst_z_robot, 0.01);

        // handle solve button
        document.getElementById('solveBtn').addEventListener('click', () => {
            if(StatePara.thetaRadioChecked) {
                let theta_solved = MathEngine.solveForTheta();
                StatePara.state_theta.setValue(theta_solved);
            }
            else if(StatePara.rRadioChecked) {
                let r_solved = MathEngine.solveForR();
                StatePara.state_r.setValue(r_solved);
            }
        });
        
        // handle theta, r selection radio button
        
        document.getElementById('theta_radio').addEventListener('change', () => {
            StatePara.state_thetaRadioChecked.setValue(true);
            StatePara.state_rRadioChecked.setValue(false);
        });
        StatePara.state_thetaRadioChecked.addReactFunc((val) => {
            document.getElementById('theta_radio').checked = val;
        });

        document.getElementById('r_radio').addEventListener('change', () => {
            StatePara.state_thetaRadioChecked.setValue(false);
            StatePara.state_rRadioChecked.setValue(true);
        });
        StatePara.state_rRadioChecked.addReactFunc((val) => {
            document.getElementById('r_radio').checked = val;
        });

        document.getElementById('theta_radio').checked = true;
        
    }
}