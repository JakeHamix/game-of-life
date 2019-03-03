class Cell {
    constructor(state) {
        this.state = state;
        this.nextState = null;
    }

    static constants() {
        return {
            STATUS_ALIVE: 'A',
            STATUS_DEAD: 'D',
        };
    }
}

module.exports = Cell;