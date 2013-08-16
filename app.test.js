/* global define: false, require: false, jasmine: true */


define('bootstrap', [
  'jquery',
  'mastermind/tests/model/level',
  'mastermind/tests/model/guess',
  'mastermind/tests/controller/level'
], function($){
  'use strict';
  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 250;

  $(function(){
    $('.alert').empty();
   jasmineEnv.execute();
  });

});

require(['bootstrap']);