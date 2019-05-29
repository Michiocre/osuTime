const assert = require('assert');
const lint = require('mocha-eslint');
const myMath = require('../src/lib/math');
const bigTest = require('./response.json').body;
const smallTest = [{date: '2017-04-05 02:00:00', index: 1}, {date: '2017-04-05 20:00:00', index: 2}, {date: '2019-04-05 03:00:00', index: 3}];

const bigAverage = 70636.16;
// const smallAverage = 1200;

// Array of paths to lint
// Note: a seperate Mocha test will be run for each path and each file which
// matches a glob pattern
var paths = [
    'src',
    'test'
];

var options = {
    contextName: 'eslint'
};

// Run the tests
lint(paths, options);

describe('basic test', function () {
    it('should be true', function () {
        assert.equal(true, true);
        //throw {myError:'throwing error to fail test'}
    });
});

describe('math test', function () {
    it('should convert dates', function () {
        assert.equal(myMath.dateConvert('2017-04-05 17:22:23'), 62543);
    });
    it('should sort by property', function() {
        smallTest.sort(myMath.dynamicSort('date'));
        assert(smallTest[0].date < smallTest[1].date);
        smallTest.sort(myMath.dynamicSort('-date'));
        assert(smallTest[0].date > smallTest[1].date);

        smallTest.sort(myMath.dynamicSort('index'));
        assert(smallTest[0].index < smallTest[1].index);
        smallTest.sort(myMath.dynamicSort('-index'));
        assert(smallTest[0].index > smallTest[1].index);

        bigTest.sort(myMath.dynamicSort('date'));
        assert(bigTest[0].date < bigTest[1].date);
        bigTest.sort(myMath.dynamicSort('-date'));
        assert(bigTest[0].date > bigTest[1].date);

        bigTest.sort(myMath.dynamicSort('pp'));
        assert(bigTest[0].pp < bigTest[1].pp);
        bigTest.sort(myMath.dynamicSort('-pp'));
        assert(bigTest[0].pp > bigTest[1].pp);
    });
    it('should average time', function() {
        // assert.equal(myMath.timeAverage(smallTest), smallAverage);
        assert.equal(myMath.timeAverage(bigTest), bigAverage);
    });
    // it('timeAverage and allTimeAverage[lastIndex] should be the same', function() {
    //     assert.equal(myMath.timeAverage(smallTest), myMath.allTimeAverage(smallTest)[smallTest.length -1]);
    //     assert.equal(myMath.timeAverage(bigTest), myMath.allTimeAverage(bigTest)[bigTest.length -1]);
    // });
    // it('should always be the same, independent of sorting', function() {
    //     smallTest.sort(myMath.dynamicSort('-date'));
    //     assert.equal(myMath.timeAverage(smallTest), smallAverage);
    //     smallTest.sort(myMath.dynamicSort('date'));
    //     assert.equal(myMath.timeAverage(smallTest), smallAverage);
    //
    //     smallTest.sort(myMath.dynamicSort('-index'));
    //     assert.equal(myMath.timeAverage(smallTest), smallAverage);
    //     smallTest.sort(myMath.dynamicSort('index'));
    //     assert.equal(myMath.timeAverage(smallTest), smallAverage);
    //
    //     bigTest.sort(myMath.dynamicSort('-date'));
    //     assert.equal(myMath.timeAverage(bigTest), bigAverage);
    //     bigTest.sort(myMath.dynamicSort('date'));
    //     assert.equal(myMath.timeAverage(bigTest), bigAverage);
    //
    //     bigTest.sort(myMath.dynamicSort('-pp'));
    //     assert.equal(myMath.timeAverage(bigTest), bigAverage);
    //     bigTest.sort(myMath.dynamicSort('pp'));
    //     assert.equal(myMath.timeAverage(bigTest), bigAverage);
    // });
});
