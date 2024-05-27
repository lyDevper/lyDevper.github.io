class OutTextHandler {
    constructor(textId, state, onStateChange = null) {
        this.textId = textId;
        this.textElm = document.getElementById(textId);
        this.state = state;

        if (onStateChange !== null) {
            this.onStateChange = onStateChange;
        }

        State.addStateChangeFunc((state) => {
            this.onStateChange(state);
        });

        this.onStateChange(this.state);
    }

    onStateChange(state) {
        // may be overridden for special text updating
        try {
            if (state === this.state) {
                this.setText(state.getValue().toFixed(4));
            }
        } catch (error) {
            console.error(error);
        }
    }

    setText(text) {
        this.textElm.innerText = text;
    }

    getText() {
        return this.textElm.innerText;
    }

    static buildHandlers() {
        // instantiate each handler as a static property
        this.theta_handler = new OutTextHandler('outTxt_theta', StatePara.state_theta);
        this.r_handler = new OutTextHandler('outTxt_r', StatePara.state_r);
        this.z_robot_handler = new OutTextHandler('outTxt_z_robot', StatePara.state_z_robot);
        this.x_goal_handler = new OutTextHandler('outTxt_x_goal', StatePara.state_x_goal);
        this.y_goal_handler = new OutTextHandler('outTxt_y_goal', StatePara.state_y_goal);
        this.z_goal_handler = new OutTextHandler('outTxt_z_goal', StatePara.state_z_goal);

        // results thae must be calculated
        this.y_intercept_handler = new OutTextHandler('outTxt_y_intercept', null, function(state) {
            let y_goal = MathEngine.getBallFinalPos().y;
            this.setText(y_goal.toFixed(4));
        });
        
        this.error_y_handler = new OutTextHandler('outTxt_error_y', null, function(state) {
            let y_f = MathEngine.getBallFinalPos().y;
            let y_goal = StatePara.y_goal;
            let error_y = y_f - y_goal;
            this.setText(error_y.toFixed(4));
        });

        this.error_y_cm_handler = new OutTextHandler('outTxt_error_y_cm', null, function(state) {
            let y_f = MathEngine.getBallFinalPos().y;
            let y_goal = StatePara.y_goal;
            let error_y_cm = (y_f - y_goal) * 100;
            this.setText(error_y_cm.toFixed(2));
        });

        this.cmpsted_theta_handler = new OutTextHandler('outTxt_cmpsted_theta', null, function(state) {
            this.setText((StatePara.theta + StatePara.cmpst_theta).toFixed(2));
        });

        this.cmpsted_r_handler = new OutTextHandler('outTxt_cmpsted_r', null, function(state) {
            this.setText((StatePara.r + StatePara.cmpst_r).toFixed(4));
        })

        this.cmpsted_z_robot_handler = new OutTextHandler('outTxt_cmpsted_z_robot', null, function(state) {
            this.setText((StatePara.z_robot + StatePara.cmpst_z_robot).toFixed(4));
        })
    }

}