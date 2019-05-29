const assert = require('assert');
const lint = require('mocha-eslint');
const myMath = require('../src/lib/math');
const bigTest = require('./response.json').body.slice(0, 100);

//const bigAverage = 70636.16;

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
        assert.equal(myMath.dateConvert(bigTest[0].date), 3000);
    });
    it('should sort by property', function() {
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
        //assert.equal(myMath.timeAverage(bigTest), bigAverage);
    });
    it('timeAverage and allTimeAverage[lastIndex] should be the same', function() {
        assert.equal(myMath.timeAverage(bigTest), myMath.allTimeAverage(bigTest)[bigTest.length -1]);
    });
    it('should always be the same, independent of sorting', function() {

        bigTest.sort(myMath.dynamicSort('-date'));
        let dateNeg = myMath.timeAverage(bigTest);
        bigTest.sort(myMath.dynamicSort('date'));
        let datePos = myMath.timeAverage(bigTest);

        bigTest.sort(myMath.dynamicSort('-pp'));
        let ppNeg = myMath.timeAverage(bigTest);
        bigTest.sort(myMath.dynamicSort('pp'));
        let ppPos = myMath.timeAverage(bigTest);

        assert.equal(dateNeg, datePos);
        assert.equal(datePos, ppNeg);
        assert.equal(dateNeg, ppNeg);
        assert.equal(datePos, ppPos);
        assert.equal(ppPos, ppNeg);
        assert.equal(dateNeg, ppPos);
    });
});
