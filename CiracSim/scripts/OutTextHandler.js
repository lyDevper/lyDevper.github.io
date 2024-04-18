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
        this.y_f_handler = new OutTextHandler('outTxt_y_f', StatePara.state_y_f);

        // results thae must be calculated
        this.y_intercept = new OutTextHandler('outTxt_y_intercept', null, function(state) {
            let y_f = MathEngine.getBallFinalPos().y;
            this.setText(y_f.toFixed(4));
        });
        
        this.error_y = new OutTextHandler('outTxt_error_y', null, function(state) {
            let y_f = MathEngine.getBallFinalPos().y;
            let y_goal = StatePara.y_f;
            let error_y = y_f - y_goal;
            this.setText(error_y.toFixed(4));
        });

        this.error_y_cm = new OutTextHandler('outTxt_error_y_cm', null, function(state) {
            let y_f = MathEngine.getBallFinalPos().y;
            let y_goal = StatePara.y_f;
            let error_y_cm = (y_f - y_goal) * 100;
            this.setText(error_y_cm.toFixed(2));
        });
    }

}