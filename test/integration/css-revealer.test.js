'use strict';

var test = require('tape');
var _ = require('lodash');
var cssRevealer = require('../..');

var formatResult = requireLib('formatResult');
var replace = requireLib('util').replace;

test('should handle arrays of glob patterns', function(t){

  t.plan(2);

  var expected = readFixture('format.json');

  cssRevealer({
    stylesheets: ['test/fixtures/stylesheetOne.css', 'test/fixtures/stylesheetTwo.css'],
    templates: ['test/fixtures/templateOne.html', 'test/fixtures/templateTwo.html'],
    done: function(error, result){
      t.notOk(error);
      t.deepEqual(result, expected);
    }
  });

});

test('should generate a json report', function(t){

  t.plan(2);

  var expected = readFixture('format.json');

  cssRevealer({
    stylesheets: ['test/fixtures/*.css'],
    templates: ['test/fixtures/*.html'],
    done: function(error, result){
      t.notOk(error);
      t.deepEqual(result, expected);
    }
  });

});

test('should generate a markdown report', function(t){

  t.plan(2);

  var expected = readFixture('format.md');

  cssRevealer({
    stylesheets: ['test/fixtures/*.css'],
    templates: ['test/fixtures/*.html'],
    format: 'markdown',
    done: function(error, result){
      t.notOk(error);
      t.deepEqual(result, expected);
    }
  });

});

test('should allow specification of a custom formatter', function(t){

  t.plan(2);

  var customFormatter = _.compose(replace(/test\/fixtures\//g, ''), formatResult.markdown);
  var expected = readFixture('customFormat.md');

  cssRevealer({
    stylesheets: ['test/fixtures/*.css'],
    templates: ['test/fixtures/*.html'],
    format: customFormatter,
    done: function(error, result){
      t.notOk(error);
      t.deepEqual(result, expected);
    }
  });

});
