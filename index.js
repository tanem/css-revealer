'use strict';

var _ = require('lodash');
var glob = require('glob');
var async = require('async');

var readFile = require('./lib/util').readFile;
var concat = require('./lib/util').concat;
var propEq = require('./lib/util').propEq;
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

    getStylesheetList: _.partial(async.concat, stylesheets, glob),

    getTemplateList: _.partial(async.concat, templates, glob),

    readStylesheets: ['getStylesheetList', function(callback, results){
      async.mapSeries(results.getStylesheetList, readFile, callback);
    }],

    concatStylesheets: ['readStylesheets', function(callback, results){
      callback(null, results.readStylesheets.reduce(concat, ''));
    }],

    parseStylesheets: ['concatStylesheets', function(callback, results){
      callback(null, parseStylesheet(results.concatStylesheets));
    }],

    checkTemplates: ['getTemplateList', 'parseStylesheets', function(callback, results){
      async.reduce(
        results.getTemplateList,
        { used: [], unused: [] },
        _.partial(checkTemplate, results.parseStylesheets),
        callback
      );
    }],

    sortResult: ['checkTemplates', function(callback, results){
      callback(null, results.parseStylesheets.reduce(function(memo, selector){
        var matchingOccurrence = _.find(results.checkTemplates.used, propEq('selector', selector));
        if (matchingOccurrence) {
          memo.used.push(matchingOccurrence);
        } else {
          memo.unused.push(selector);
        }
        return memo;
      }, { used: [], unused: [] }));
    }],

    formatResult: ['sortResult', function(callback, results){
      var formatter = _.isFunction(format) ? format : formatResult[format];
      callback(null, formatter(results.sortResult));
    }]

  }, function(error, results){
    done(error, results.formatResult);
  });

};
