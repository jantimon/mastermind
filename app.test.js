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

  var addMemoryUsage = function() {
    if(window.performance && window.performance.memory) {
      $('<p/>')
        .text(JSON.stringify(window.performance.memory))
        .appendTo($('.banner'));
    }
  };

  $(function(){

    // Add memory usage before testing:
    addMemoryUsage();
    // Wait for Jasmine to complete all tests:
    var timer = setInterval(function () {
      if ($('div.alert').children().length) {
        clearInterval(timer);
        addMemoryUsage();
      }
    }, 100);


    $('.alert').empty();
    $('.duration').remove();
    jasmineEnv.execute();
  });

});

require(['bootstrap']);