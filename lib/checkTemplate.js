'use strict';

var async = require('async');
var _ = require('lodash');
var propEq = require('./util').propEq;
var readFile = require('./util').readFile;
var isSelectorInString = require('./isSelectorInString');

module.exports = function (selectors, result, templatePath, callback) {

  var readTemplate = _.partial(readFile, templatePath);

  var findOccurrences = function(templateString, callback){

    var usedInTemplate = _.partial(isSelectorInString, _, templateString);

    var occurrences = selectors.reduce(function(memo, selector){
      if (usedInTemplate(selector)) {
        memo.push({
          selector: selector,
          occurrences: [templatePath]
        });
      }
      return memo;
    }, []);

    callback(null, occurrences);

  };

  var mergeWithResult = function(occurrences, callback){

    var findIndexInOccurrences = _.partial(_.findIndex, occurrences);
    var spliceFromOccurrences = _.bind([].splice, occurrences, _, 1);

    result.used = result.used.map(function(used){
      var indexInOccurrences = findIndexInOccurrences(propEq('selector', used.selector));
      if (indexInOccurrences !== -1) {
        used.occurrences = used.occurrences.concat(occurrences[indexInOccurrences].occurrences);
        spliceFromOccurrences(indexInOccurrences);
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
