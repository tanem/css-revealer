'use strict';

var _ = require('lodash');
var path = require('path');
var fs = require('fs');

var readFile = _.partial(fs.readFileSync, _, { encoding: 'utf-8' });
var getLibPath = _.partial(path.join, __dirname, '../../lib');

global.getFixturePath = _.partial(path.join, __dirname, '../fixtures');
global.readFixture = _.compose(readFile, getFixturePath);
global.requireFixture = _.compose(require, getFixturePath);
global.requireLib = _.compose(require, getLibPath);
