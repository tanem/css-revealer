'use strict';

var R = require('ramda');
var path = require('path');
var fs = require('fs');

var readFile = R.curry(fs.readFileSync)(R.__, { encoding: 'utf-8' });
var getLibPath = R.curryN(3, path.join)(__dirname, '../../lib');

global.getFixturePath = R.curryN(3, path.join)(__dirname, '../fixtures');
global.readFixture = R.compose(readFile, getFixturePath);
global.requireFixture = R.compose(require, getFixturePath);
global.requireLib = R.compose(require, getLibPath);
