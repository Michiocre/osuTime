var assert = require('assert');
var math = require('../src/math.js');

describe('basic test', function () {
    it('should be true', function () {
        assert.equal(true, true);
        //throw {myError:'throwing error to fail test'}
    });
});

describe('math test', function () {
    it('should convert dates', function () {
        assert.equal(math.dateConvert("2017-04-05 17:22:23"), 62543);
    });
    it('should average time', function() {
        var top = [{date: "2017-04-05 02:00:00"}, {date: "2017-04-05 20:00:00"}];
        assert.equal(math.timeAverage(top), 82800);
    });
});
