'use strict';

var test = require('tape');

var formatResult = requireLib('formatResult');

test('should format the result as json', function(t){

  t.plan(1);

  var actual = formatResult.json(requireFixture('result.js'));
  var expected = readFixture('format.json');

  t.deepEqual(actual, expected);

});

test('should format the result as markdown', function(t){

  t.plan(1);

  var actual = formatResult.markdown(requireFixture('result.js'));
  var expected = readFixture('format.md');

  t.deepEqual(actual, expected);

});
