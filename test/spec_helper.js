// Copyright IBM Corp. 2011,2016. All Rights Reserved.
// Node module: loopback-datasource-juggler
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
'use strict';

/* eslint-disable camelcase */

/*
 if (!process.env.TRAVIS) {
 var semicov = require('semicov');
 semicov.init('lib', 'LoopbackData');
 process.on('exit', semicov.report);
 }
 */

var group_name = false, EXT_EXP;
function it(should, test_case) {
  check_external_exports();
  if (group_name) {
    EXT_EXP[group_name][should] = test_case;
  } else {
    EXT_EXP[should] = test_case;
  }
}

global.it = it;

function context(name, tests) {
  check_external_exports();
  EXT_EXP[name] = {};
  group_name = name;
  tests({
    before: function(f) {
      it('setUp', f);
    },
    after: function(f) {
      it('tearDown', f);
    },
  });
  group_name = false;
}

global.context = context;

exports.init = function init(external_exports) {
  EXT_EXP = external_exports;
  if (external_exports.done) {
    external_exports.done();
  }
};

function check_external_exports() {
  if (!EXT_EXP) throw new Error(
    'Before run this, please ensure that ' +
      'require("spec_helper").init(exports); called');
}

