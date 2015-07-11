'use strict';

var _ = require('lodash');

exports.json = function(result){
  return JSON.stringify(result, null, 2);
};

exports.markdown = function(result){

  var markdown = '';

  markdown += '\n### Used\n';

  markdown += _.reduce(result.used, function(memo, occurrence){
    memo += '\n#### `' + occurrence.selector + '`\n\n';
    memo += _.reduce(occurrence.occurrences, function(memo, occurrence){
      return memo + '* ' + occurrence + '\n';
    }, '');
    return memo;
  }, '');

  markdown += '\n### Unused\n\n';

  markdown += result.unused.reduce(function(memo, selector){
    return memo + '* `' + selector + '`\n';
  }, '');

  return markdown;

};
