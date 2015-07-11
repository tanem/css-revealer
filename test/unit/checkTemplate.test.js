'use strict';

var test = require('tape');

var checkTemplate = requireLib('checkTemplate');

test('should add selector occurrences to a vanilla result object', function(t){

  t.plan(2);

  var expected = requireFixture('checkTemplateVanillaResult');
  var selectors = requireFixture('stylesheetOneParsed');
  var result = { used: [], unused: [] };
  var templatePath = getFixturePath('templateOne.html');

  checkTemplate(selectors, result, templatePath, function(error, result){
    t.notOk(error);
    t.deepEqual(result, expected);
  });

});

test('should merge selector occurrences in a populated result object', function(t){

  t.plan(2);

  var expected = requireFixture('checkTemplateMergedResult');
  var selectors = requireFixture('stylesheetOneParsed');
  var result = {
    used: [{
      selector: '.foo',
      occurrences: [
        getFixturePath('templateTwo.html')
      ]
    }],
    unused: []
  };
  var templatePath = getFixturePath('templateOne.html');

  checkTemplate(selectors, result, templatePath, function(error, result){
    t.notOk(error);
    t.deepEqual(result, expected);
  });

});
