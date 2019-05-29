var assert = require('assert');
var lint = require('mocha-eslint');

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
