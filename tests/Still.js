const should = require('should');

describe('Still structures', () => {
    it('"Block" did not change', done => {
        const Grid = require('../entities/Grid');
        const config = {
            dimension: 4,
            generationAge: 10,
            stopOnExtermination: true,
            customInitialState: {
                1: [1, 2],
                2: [1, 2],
            }
        };
        const expected = {
            '0':
                [ { state: 'D', nextState: 'D' },
                { state: 'D', nextState: 'D' },
                { state: 'D', nextState: 'D' },
                { state: 'D', nextState: 'D' } ],
            '1':
                [ { state: 'D', nextState: 'D' },
                { state: 'A', nextState: 'A' },
                { state: 'A', nextState: 'A' },
                { state: 'D', nextState: 'D' } ],
            '2':
                [ { state: 'D', nextState: 'D' },
                { state: 'A', nextState: 'A' },
                { state: 'A', nextState: 'A' },
                { state: 'D', nextState: 'D' } ],
            '3':
                [ { state: 'D', nextState: 'D' },
                { state: 'D', nextState: 'D' },
                { state: 'D', nextState: 'D' },
                { state: 'D', nextState: 'D' } ]
        };


        const grid = new Grid(config);

        grid.tick();

        should.deepEqual(JSON.parse(JSON.stringify(grid.cells)), expected);
        done();
    });

    it('"Loaf" did not change', done => {
        const Grid = require('../entities/Grid');
        const config = {
            dimension: 6,
            generationAge: 10,
            stopOnExtermination: true,
            customInitialState: {
                1: [2, 3],
                2: [1, 4],
                3: [2, 4],
                4: [3],
            }
        };
        const expected = {
            '0':
                [ { state: 'D', nextState: 'D' },
                    { state: 'D', nextState: 'D' },
                    { state: 'D', nextState: 'D' },
                    { state: 'D', nextState: 'D' },
                    { state: 'D', nextState: 'D' },
                    { state: 'D', nextState: 'D' } ],
            '1':
                [ { state: 'D', nextState: 'D' },
                    { state: 'D', nextState: 'D' },
                    { state: 'A', nextState: 'A' },
                    { state: 'A', nextState: 'A' },
                    { state: 'D', nextState: 'D' },
                    { state: 'D', nextState: 'D' } ],
            '2':
                [ { state: 'D', nextState: 'D' },
                    { state: 'A', nextState: 'A' },
                    { state: 'D', nextState: 'D' },
                    { state: 'D', nextState: 'D' },
                    { state: 'A', nextState: 'A' },
                    { state: 'D', nextState: 'D' } ],
            '3':
                [ { state: 'D', nextState: 'D' },
                    { state: 'D', nextState: 'D' },
                    { state: 'A', nextState: 'A' },
                    { state: 'D', nextState: 'D' },
                    { state: 'A', nextState: 'A' },
                    { state: 'D', nextState: 'D' } ],
            '4':
                [ { state: 'D', nextState: 'D' },
                    { state: 'D', nextState: 'D' },
                    { state: 'D', nextState: 'D' },
                    { state: 'A', nextState: 'A' },
                    { state: 'D', nextState: 'D' },
                    { state: 'D', nextState: 'D' } ],
            '5':
                [ { state: 'D', nextState: 'D' },
                    { state: 'D', nextState: 'D' },
                    { state: 'D', nextState: 'D' },
                    { state: 'D', nextState: 'D' },
                    { state: 'D', nextState: 'D' },
                    { state: 'D', nextState: 'D' } ]
        };


        const grid = new Grid(config);

        grid.tick();

        should.deepEqual(JSON.parse(JSON.stringify(grid.cells)), expected);
        done();
    });
});