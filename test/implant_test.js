'use strict';

var grunt = require('grunt')
  , fs = require('fs')
  ;


/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/



exports.implant = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },


  basic_config: function(test) {
    test.expect(1);

    var actual = grunt.file.read('dest/basic/basic-config.html');
    var expected = grunt.file.read('test/expected/basic-config.html');

    test.equal(actual, expected, 'basic-config should work.');
    test.done();
  },

};