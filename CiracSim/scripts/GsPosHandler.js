class GsPosHandler {
    constructor(original_z_inpId, original_y_inpId, rotated_z_inpId, rotated_y_inpId, useBtnId, resetBtnId, gsPosState) {
        this.original_z_inp = document.getElementById(original_z_inpId);
        this.original_y_inp = document.getElementById(original_y_inpId);
        this.rotated_z_inp = document.getElementById(rotated_z_inpId);
        this.rotated_y_inp = document.getElementById(rotated_y_inpId);
        
        this.useBtn = document.getElementById(useBtnId);
        this.resetBtn = document.getElementById(resetBtnId);
        
        this.gsPosState = gsPosState;
    
        this.updateOriginalPos_inp();
        this.updateRotatedPos_inp();

        // event when input value changes
        this.original_z_inp.addEventListener('change', () => {
            this.updateOriginalPos_state();
        });

        this.original_y_inp.addEventListener('change', () => {
            this.updateOriginalPos_state();
        });

        this.rotated_z_inp.addEventListener('change', () => {
            this.updateRotatedPos_state();
        });

        this.rotated_y_inp.addEventListener('change', () => {
            this.updateRotatedPos_state();
        });

        // bind reaction to gsPosState
        this.gsPosState.originalPos_state.addReactFunc(() => {
            this.updateOriginalPos_inp();
        });

        this.gsPosState.rotatedPos_state.addReactFunc(() => {
            this.updateRotatedPos_inp();
        });
        
        // use button: apply position to y_goal and z_goal
        this.useBtn.addEventListener('click', () => {
            this.useValue();
        });
        this.useBtn.addEventListener('dblclick', () => {
            this.useValue();
            ParaInpHandler.solveForAnswer();
        });

        // reset button: reset to default position
        this.resetBtn.addEventListener('click', () => {
            this.gsPosState.originalPos = this.gsPosState.defaultPos; // setter
        });
    }

    setOriginalPos(pos) {
        // set UI elm display value
        this.original_z_inp.value = pos.z.toFixed(4);
        this.original_y_inp.value = pos.y.toFixed(4);
    }

    setRotatedPos(pos) {
        // set UI elm display value
        this.rotated_z_inp.value = pos.z.toFixed(4);
        this.rotated_y_inp.value = pos.y.toFixed(4);
    }

    updateOriginalPos_inp() {
        this.setOriginalPos(this.gsPosState.originalPos);
    }

    updateRotatedPos_inp() {
          this.setRotatedPos(this.gsPosState.rotatedPos);
    }

    updateOriginalPos_state() {
        let z = parseFloat(this.original_z_inp.value);
        let y = parseFloat(this.original_y_inp.value);
        this.gsPosState.originalPos = new Point(0, y, z); // trigger setter
    }

    updateRotatedPos_state() {
        let z = parseFloat(this.rotated_z_inp.value);
        let y = parseFloat(this.rotated_y_inp.value);
        this.gsPosState.rotatedPos = new Point(0, y, z); // trigger setter
    }

    useValue() {
        // apply this position to y_goal and z_goal
        StatePara.y_goal = this.gsPosState.rotatedPos.y + StatePara.tableHeight;
        StatePara.z_goal = this.gsPosState.rotatedPos.z;
    }

    static buildHandlers() {
        this.gsPos1_handler = new GsPosHandler(
            'inp_gsPos1_original_z', 'inp_gsPos1_original_y',
            'inp_gsPos1_rotated_z', 'inp_gsPos1_rotated_y',
            'usePos1_btn', 'reset_gsPos1', GoalSimStates.gsPosState1
        );

        this.gsPos2_handler = new GsPosHandler(
            'inp_gsPos2_original_z', 'inp_gsPos2_original_y',
            'inp_gsPos2_rotated_z', 'inp_gsPos2_rotated_y',
            'usePos2_btn', 'reset_gsPos2', GoalSimStates.gsPosState2
        );

        this.gsPos3_handler = new GsPosHandler(
            'inp_gsPos3_original_z', 'inp_gsPos3_original_y',
            'inp_gsPos3_rotated_z', 'inp_gsPos3_rotated_y',
            'usePos3_btn', 'reset_gsPos3', GoalSimStates.gsPosState3
        );

        // handle rotate angle
        this.gsRotateAng_Handler = new ParaInpHandler('inp_gsRotateAng', 'reset_gsRotateAng', 
            GoalSimStates.rotateAng_state, 0, 120);

        // handle rotate buttons
        q('rotateLeftBtn').addEventListener('click', () => {
            GoalSimStates.rotateAng -= 120;
        });

        q('rotateRightBtn').addEventListener('click', () => {
            GoalSimStates.rotateAng += 120;
        });

    }
}