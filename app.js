/* global define: false, require: false */

// Define App
define('bootstrap', [
  'backbone',
  'router',
  'mastermind/controller/level',
  ],
  function (Backbone, router, levelController) {
    'use strict';

    router().on('route:default', function() {
      this.navigate('level/1', {trigger: true, replace: true});
    });

    router().on('route:game', levelController);

    // Start router
    Backbone.history.start({
      pushState: false
    });

  });

// Launch app
require(['bootstrap']);