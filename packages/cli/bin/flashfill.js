#!/usr/bin/env node
'use strict';

const path = require('path');
const resolveFrom = require('resolve-from');

let modulePath = '../dist/index';
try {
  // use local cli if exists
  modulePath = path.join(path.dirname(resolveFrom(process.cwd(), 'flashfill')), 'index.js');
} catch {}

require(modulePath);
