class State {
    // called when any state changes
    static stateChangeFunctions = [];    
    static addStateChangeFunc(func) {
        State.stateChangeFunctions.push(func); // func(state: State)
    }
    static stateChangeCall(state) {
        for (let func of State.stateChangeFunctions) {
            func(state);
        }
    }

    constructor(value = null) {
        this.value = value;
        this.reactFunctions = [];
    }

    getValue() {
        return this.value;
    }

    setValue(value) {
        if (value === this.value) {
            return;
        }

        this.value = value;
        for (let func of this.reactFunctions) {
            func(value);
        }
        State.stateChangeCall(this);
    }

    addReactFunc(func) {
        this.reactFunctions.push(func);
    }

}
