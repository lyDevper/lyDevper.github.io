class DefaultGsPos {
    // as announced in the mission
    static pos1 = new Point(0, 0.070, StatePara.triangleSide/2 - 0.120);
    static pos2 = new Point(0, 0.070, StatePara.triangleSide/2 + 0.075);
    static pos3 = new Point(0, 0.210, StatePara.triangleSide/2 + 0.045);
}

class GoalSimStates {
    static rotateAng_state = new State(0); // deg

    static gsPosState1 = new GsPosState(DefaultGsPos.pos1, GoalSimStates.rotateAng_state);
    static gsPosState2 = new GsPosState(DefaultGsPos.pos2, GoalSimStates.rotateAng_state);
    static gsPosState3 = new GsPosState(DefaultGsPos.pos3, GoalSimStates.rotateAng_state);

    static get rotateAng() { return GoalSimStates.rotateAng_state.getValue(); }
    static set rotateAng(value) { GoalSimStates.rotateAng_state.setValue(value); }
    static {
        GoalSimStates.rotateAng_state.addReactFunc((ang) => {
            // value can be in 0 - 360
            ang = ang % 360;
            if (ang < 0) {
                ang += 360;
            }
            GoalSimStates.rotateAng_state.setValue(ang);
        });
    }
}