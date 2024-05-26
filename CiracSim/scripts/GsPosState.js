class GsPosState {
    // the state for one goal simulator's position, containing original and rotated positions
    constructor(defaultPos = new Point(0, 0, 0), rotateAng_state) {
        this.defaultPos = defaultPos;
        this.originalPos_state = new State(new Point(defaultPos.x, defaultPos.y, defaultPos.z));
        this.rotatedPos_state = new State(new Point(defaultPos.x, defaultPos.y, defaultPos.z));

        this.rotateAng_state = rotateAng_state;

        // bind originalPos effect to rotatedPos
        this.originalPos_state.addReactFunc((pos) => {
            console.log('original', pos);
            let rotatedPos = GsEngine.rotateGsPos(pos, rotateAng_state.getValue());
            if (!rotatedPos.equals(this.rotatedPos_state.getValue())) { //prevent circular call
                this.rotatedPos_state.setValue(rotatedPos);
            }
        });

        // bind rotatedPos effect to originalPos
        this.rotatedPos_state.addReactFunc((pos) => {
            console.log('rotated', pos);
            let originalPos = GsEngine.rotateGsPos(pos, -rotateAng_state.getValue());
            if (!originalPos.equals(this.originalPos_state.getValue())) { //prevent circular call
                this.originalPos_state.setValue(originalPos);
            }
        });

        this.originalPos = defaultPos; // innitialize rotated position

        // bind rotateAng effect to update rotatedPos
        rotateAng_state.addReactFunc((ang) => {
            let rotatedPos = GsEngine.rotateGsPos(this.originalPos, ang);
            this.rotatedPos_state.setValue(rotatedPos);
        });
    }

    get originalPos() { // : Point
        return this.originalPos_state.getValue();
    }

    set originalPos(pos) {
        this.originalPos_state.setValue(pos);
        // this will calculate and set rotated position
    }

    get rotatedPos() { // : Point
        return this.rotatedPos_state.getValue();
    }

    set rotatedPos(pos) {
        this.rotatedPos_state.setValue(pos);
        // this will  calculate and set original position
    }
}