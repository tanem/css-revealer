'use strict';

var R = require('ramda');
var glob = require('glob');
var async = require('async');
var readFile = require('./lib/util').readFile;
var isFunction = require('./lib/util').isFunction;
var parseStylesheet = require('./lib/parseStylesheet');
var formatResult = require('./lib/formatResult');
var checkTemplate = require('./lib/checkTemplate');

module.exports = function(options){

  options = options || {};

  var stylesheets = options.stylesheets;
  var templates = options.templates;
  var format = options.format || 'json';
  var done = options.done || function(){};

  async.auto({

    getStylesheetList: R.curry(async.concat)(stylesheets, glob),

    getTemplateList: R.curry(async.concat)(templates, glob),

    readStylesheets: ['getStylesheetList', function(callback, results){
      async.mapSeries(results.getStylesheetList, readFile, callback);
    }],

    concatStylesheets: ['readStylesheets', function(callback, results){
      callback(null, results.readStylesheets.reduce(R.concat, ''));
    }],

    parseStylesheets: ['concatStylesheets', function(callback, results){
      callback(null, parseStylesheet(results.concatStylesheets));
    }],

    checkTemplates: ['getTemplateList', 'parseStylesheets', function(callback, results){
      async.reduce(
        results.getTemplateList,
        { used: [], unused: [] },
        R.curry(checkTemplate)(results.parseStylesheets),
        callback
      );
    }],

    sortResult: ['checkTemplates', function(callback, results){
      callback(null, results.parseStylesheets.reduce(function(memo, selector){
        var matchingOccurrence = R.find(R.propEq('selector', selector))(results.checkTemplates.used);
        if (matchingOccurrence) {
          memo.used.push(matchingOccurrence);
        } else {
          memo.unused.push(selector);
        }
        return memo;
      }, { used: [], unused: [] }));
    }],

    formatResult: ['sortResult', function(callback, results){
      var formatter = isFunction(format) ? format : formatResult[format];
      callback(null, formatter(results.sortResult));
    }]

  }, function(error, results){
    done(error, results.formatResult);
  });

};
