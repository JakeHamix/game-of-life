const Cell = require('./Cell');

class Grid {

    /**
     * Spawns grid full of dead cells with the provided configuration
     *
     * @param config
     */
    constructor(config) {
        this._generationCount = 0;
        this._initialized = false;
        this._config = config;
        this._dimension = this._config.dimension || 17;
        console.log(`Spawing grid ${this._dimension} x ${this._dimension}`);

        this.cells = {};

        const range = n => [...Array(n).keys()];
        range(this._dimension).forEach(row => {
            this.cells[row] = [];
            range(this._dimension).forEach(column => {
                this.cells[row].push(new Cell(Cell.constants().STATUS_DEAD));
            });
        })

    }

    /**
     * Searches in config for user input of grid configuration
     * If none is found, uses the default
     */
    applyInitialState() {
        this._delay = this._config.generationAge || 500;

        if (this._config.customInitialState && Object.keys(this._config.customInitialState).length) {
            console.log('Found custom initial state. Applying ...');
            this._initialState = this._config.customInitialState;
        } else {
            console.log('No custom initial state found. Using default...');
            this._initialState = this._config.defaultInitialState;
        }

        Object.keys(this._initialState).forEach(row => {
            this._initialState[row].forEach(column => {
                this.cells[row][column].state = Cell.constants().STATUS_ALIVE;
            });
        });

        this._generationCount += 1;
        this.showGrid();
        this._initialized = true;
    }

    /**
     * Displays the current cells in .console (with colors!)
     */
    showGrid() {
        const rows = [];
        Object.keys(this.cells).forEach(row => {
            const rowArray = [''];
            this.cells[row].forEach(cell => {
                switch (cell.state) {
                    case Cell.constants().STATUS_ALIVE:
                        rowArray[0] += '\x1b[32m%s\x1b[0m';
                        rowArray.push('██');
                        break;
                    case Cell.constants().STATUS_DEAD:
                        rowArray[0] += '\x1b[37m%s\x1b[0m';
                        rowArray.push('██'); // ◯, ⛞
                        break;
                }
            });
            rows.push(rowArray);
        });

        if (this._config.clearConsole) {
            console.clear();
        }

        console.log(`Spawning generation number '${this._generationCount}'`);
        console.log();
        rows.forEach(row => {
            console.log(...row);
        });
        console.log();
    }

    /**
     * Turns the game on
     */
    play() {
        this.applyInitialState();
        setInterval(this.tick.bind(this), this._delay);
    }

    /**
     * Spawns the next generation
     *
     * @param {Number} tickCount - tick more times immediately
     */
    tick(tickCount = 1) {
        // Are default settings applied to Grid?
        if (!this._initialized) {
            this.applyInitialState();
        }
        this._generationCount += 1;

        // Determine state of the Cell in the next generation
        Object.keys(this.cells).forEach(row => {
            this.cells[row].forEach((cell, index) => {
                const neighbors = this.getNeighbors(row, index);
                const neighborsAlive = neighbors.filter(cell => {
                    return cell.state === Cell.constants().STATUS_ALIVE;
                });

                // Apply specific rules
                switch (cell.state) {
                    case Cell.constants().STATUS_ALIVE:
                        // Any live cell with fewer than two live neighbors dies, as if by underpopulation.
                        if (neighborsAlive.length < 2) {
                            cell.nextState = Cell.constants().STATUS_DEAD;
                        }
                        // Any live cell with more than three live neighbors dies, as if by overpopulation.
                        else if (neighborsAlive.length > 3) {
                            cell.nextState = Cell.constants().STATUS_DEAD;
                        }
                        // Any live cell with two or three live neighbors lives on to the next generation.
                        else {
                            cell.nextState = Cell.constants().STATUS_ALIVE;
                        }
                        break;
                    case Cell.constants().STATUS_DEAD:
                        // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
                        if (neighborsAlive.length === 3) {
                            cell.nextState = Cell.constants().STATUS_ALIVE;
                        } else {
                            cell.nextState = Cell.constants().STATUS_DEAD;
                        }
                        break;
                }
            });
        });

        // Spawn next generation
        Object.keys(this.cells).forEach(row => {
            this.cells[row].forEach(cell => {
                cell.state = cell.nextState;
            });
        });

        this.showGrid();

        // Stop if every Cell is dead?
        if (this._config.stopOnExtermination) {
            let cellsAlive = 0;
            Object.keys(this.cells).forEach(row => {
                this.cells[row].forEach(cell => {
                    if (cell.state === Cell.constants().STATUS_ALIVE) {
                        cellsAlive += 1;
                    }
                });
            });

            if (!cellsAlive) {
                throw new Error('All cells are dead. Try again!');
            }
        }

        // Additional ticks?
        if (tickCount > 1) {
            const tick = this.tick.bind(this);
            return tick(tickCount - 1);
        }
    }

    /**
     * Returns all neighbors of a given cell
     *
     * @param row
     * @param column
     */
    getNeighbors(row, column) {
        const neighbors = [];

        // Get rows -> detect edges (grid is finite)
        const validRows = [Number(row) -1, Number(row), Number(row) + 1].filter(item => {
            return item > -1 && item < this._dimension;
        });

        // Get columns -> detect edges (grid is finite)
        const validColumns = [column -1, column, column + 1].filter(item => {
            return item > -1 && item < this._dimension;
        });

        validRows.forEach(validRow => {
            validColumns.forEach(validColumn => {
                if (validRow === Number(row) && validColumn === column) {
                    // Ignore the 'relative' cell
                } else {
                    neighbors.push(this.cells[validRow][validColumn]);
                }
            });
        });

        return neighbors;
    }

}

module.exports = Grid;