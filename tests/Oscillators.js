const should = require('should');

describe('Oscillating structures', () => {
    describe('Blinker', () => {
        it('"Blinker" inverted (generation 2)', done => {
            const Grid = require('../entities/Grid');
            const config = {
                dimension: 5,
                generationAge: 10,
                stopOnExtermination: true,
                customInitialState: {
                    2: [1, 2, 3],
                }
            };
            const expected = {
                '0':
                    [ { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' } ],
                '1':
                    [ { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' },
                        { state: 'A', nextState: 'A' },
                        { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' } ],
                '2':
                    [ { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' },
                        { state: 'A', nextState: 'A' },
                        { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' } ],
                '3':
                    [ { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' },
                        { state: 'A', nextState: 'A' },
                        { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' } ],
                '4':
                    [ { state: 'D', nextState: 'D' },
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

        it('"Blinker" turned back (generation 3)', done => {
            const Grid = require('../entities/Grid');
            const config = {
                dimension: 5,
                generationAge: 10,
                stopOnExtermination: true,
                customInitialState: {
                    2: [1, 2, 3],
                }
            };
            const expected = {
                '0':
                    [ { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' } ],
                '1':
                    [ { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' } ],
                '2':
                    [ { state: 'D', nextState: 'D' },
                        { state: 'A', nextState: 'A' },
                        { state: 'A', nextState: 'A' },
                        { state: 'A', nextState: 'A' },
                        { state: 'D', nextState: 'D' } ],
                '3':
                    [ { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' } ],
                '4':
                    [ { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' } ]
            };

            const grid = new Grid(config);

            grid.tick(2);

            should.deepEqual(JSON.parse(JSON.stringify(grid.cells)), expected);
            done();
        });
    });

    describe('Beacon', () => {
        it('"Beacon" blinked (generation 2)', done => {
            const Grid = require('../entities/Grid');
            const config = {
                dimension: 6,
                generationAge: 10,
                stopOnExtermination: true,
                customInitialState: {
                    1: [1, 2],
                    2: [1, 2],
                    3: [3, 4],
                    4: [3, 4],
                }
            };
            const expected =
                { '0':
                    [ { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' } ],
                '1':
                    [ { state: 'D', nextState: 'D' },
                        { state: 'A', nextState: 'A' },
                        { state: 'A', nextState: 'A' },
                        { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' } ],
                '2':
                    [ { state: 'D', nextState: 'D' },
                        { state: 'A', nextState: 'A' },
                        { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' } ],
                '3':
                    [ { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' },
                        { state: 'A', nextState: 'A' },
                        { state: 'D', nextState: 'D' } ],
                '4':
                    [ { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' },
                        { state: 'D', nextState: 'D' },
                        { state: 'A', nextState: 'A' },
                        { state: 'A', nextState: 'A' },
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

        it('"Beacon" turned back (generation 3)', done => {
            const Grid = require('../entities/Grid');
            const config = {
                dimension: 6,
                generationAge: 10,
                stopOnExtermination: true,
                customInitialState: {
                    1: [1, 2],
                    2: [1, 2],
                    3: [3, 4],
                    4: [3, 4],
                }
            };
            const expected =
                { '0':
                        [ { state: 'D', nextState: 'D' },
                            { state: 'D', nextState: 'D' },
                            { state: 'D', nextState: 'D' },
                            { state: 'D', nextState: 'D' },
                            { state: 'D', nextState: 'D' },
                            { state: 'D', nextState: 'D' } ],
                    '1':
                        [ { state: 'D', nextState: 'D' },
                            { state: 'A', nextState: 'A' },
                            { state: 'A', nextState: 'A' },
                            { state: 'D', nextState: 'D' },
                            { state: 'D', nextState: 'D' },
                            { state: 'D', nextState: 'D' } ],
                    '2':
                        [ { state: 'D', nextState: 'D' },
                            { state: 'A', nextState: 'A' },
                            { state: 'A', nextState: 'A' },
                            { state: 'D', nextState: 'D' },
                            { state: 'D', nextState: 'D' },
                            { state: 'D', nextState: 'D' } ],
                    '3':
                        [ { state: 'D', nextState: 'D' },
                            { state: 'D', nextState: 'D' },
                            { state: 'D', nextState: 'D' },
                            { state: 'A', nextState: 'A' },
                            { state: 'A', nextState: 'A' },
                            { state: 'D', nextState: 'D' } ],
                    '4':
                        [ { state: 'D', nextState: 'D' },
                            { state: 'D', nextState: 'D' },
                            { state: 'D', nextState: 'D' },
                            { state: 'A', nextState: 'A' },
                            { state: 'A', nextState: 'A' },
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

            grid.tick(2);

            should.deepEqual(JSON.parse(JSON.stringify(grid.cells)), expected);
            done();
        });
    });
});