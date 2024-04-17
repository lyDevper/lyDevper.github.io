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
            this.input.value = val;
        });

        this.input.value = this.defaultVal;
        this.input.step = numStep;
    }
    
    getValue() {
        return this.input.value;
    }

    setValue(value) {
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

        this.theta_handler = new ParaInpHandler('inp_theta', 'reset_theta',
                        StatePara.state_theta, DefaultPara.theta, 0.1);

        this.r_handler = new ParaInpHandler('inp_r', 'reset_r',
                        StatePara.state_r, DefaultPara.r, 0.005);

        this.x_f_handler = new ParaInpHandler('inp_x_f', 'reset_x_f',
                        StatePara.state_x_f, DefaultPara.x_f, 0.01);

        this.y_f_handler = new ParaInpHandler('inp_y_f', 'reset_y_f',
                        StatePara.state_y_f, DefaultPara.y_f, 0.005);

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