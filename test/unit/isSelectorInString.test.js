'use strict';

var test = require('tape');

var isSelectorInString = requireLib('isSelectorInString');

test('should correctly identify if a class selector is being used', function(t){
  t.plan(1);
  t.ok(isSelectorInString('.foo', readFixture('templateOne.html')));
});

test('should correctly identify if an id selector is being used', function(t){
  t.plan(1);
  t.ok(isSelectorInString('#bar', readFixture('templateOne.html')));
});
