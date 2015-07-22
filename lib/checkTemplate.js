'use strict';

var async = require('async');
var R = require('ramda');

var propEq = require('./util').propEq;
var readFile = require('./util').readFile;
var isSelectorInString = require('./isSelectorInString');

module.exports = function (selectors, result, templatePath, callback) {

  var readTemplate = R.partial(readFile, templatePath);

  var findOccurrences = function(templateString, callback){

    var usedInTemplate = R.curry(isSelectorInString, R.__, templateString);

    var occurrences = R.reduce(function(memo, selector){
      if (usedInTemplate(selector)) {
        memo.push({
          selector: selector,
          occurrences: [templatePath]
        });
      }
      return memo;
    }, [], selectors);

    callback(null, occurrences);

  };

  var mergeWithResult = function(occurrences, callback){

    var findIndexInOccurrences = R.partial(R.findIndex, occurrences);
    var spliceFromOccurrences = R.curry(R.bind([].splice, occurrences), R.__, 1);

    result.used = result.used.map(function(used){
      var indexInOccurrences = findIndexInOccurrences(propEq('selector', used.selector));
      if (indexInOccurrences !== -1) {
        used.occurrences = used.occurrences.concat(occurrences[indexInOccurrences].occurrences);
        occurrences = R.remove(indexInOccurrences, 1, occurrences);
      }
      return used;
    }).concat(occurrences);

    callback(null, result);

  };

  async.waterfall([
    readTemplate,
    findOccurrences,
    mergeWithResult
  ], callback);

};
