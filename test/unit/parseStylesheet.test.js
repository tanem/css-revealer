'use strict';

var test = require('tape');

var parseStylesheet = requireLib('parseStylesheet');

test('should correctly parse a stylesheet', function(t){

  t.plan(1);

  var actual = parseStylesheet(readFixture('stylesheetOne.css'));
  var expected = requireFixture('stylesheetOneParsed.js');

  t.deepEqual(actual, expected);

});
