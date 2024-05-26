class DefaultGsPos {
    // as announced in the mission
    static pos1 = new Point(0, 0, 0);
    static pos2 = new Point(0, 0.2, 0.5);
    static pos3 = new Point(0, 0.5, 0.3);
}

class GoalSimStates {
    static rotateAng_state = new State(0); // deg

    static gsPosState1 = new GsPosState(DefaultGsPos.pos1, GoalSimStates.rotateAng_state);
    static gsPosState2 = new GsPosState(DefaultGsPos.pos2, GoalSimStates.rotateAng_state);
    static gsPosState3 = new GsPosState(DefaultGsPos.pos3, GoalSimStates.rotateAng_state);

    static get rotateAng() { return GoalSimStates.rotateAng_state.getValue(); }
    static set rotateAng(value) { GoalSimStates.rotateAng_state.setValue(value); }
}