'use strict';

var R = require('ramda');

exports.json = R.curry(JSON.stringify)(R.__, null, 2);

exports.markdown = function(result){

  var markdown = '';

  markdown += '\n### Used\n';

  markdown += R.reduce(function(memo, occurrence){
    memo += '\n#### `' + occurrence.selector + '`\n\n';
    memo += R.reduce(function(memo, occurrence){
      return memo + '* ' + occurrence + '\n';
    }, '', occurrence.occurrences);
    return memo;
  }, '', result.used);

  markdown += '\n### Unused\n\n';

  markdown += R.reduce(function(memo, selector){
    return memo + '* `' + selector + '`\n';
  }, '', result.unused);

  return markdown;

};
