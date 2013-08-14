/* global define: false, require: false */

// Define App
define('bootstrap', [
  'backbone',
  'jquery',
  'router',
  'underscore',
  'mastermind/view/decodingBoard',
  'mastermind/model/level'],
  function (Backbone, $, router, _, MastermindView, Level) {
    'use strict';

    var gameView;
    var levelConfiguration = {
      // Level 1
      1: {cols: 4, colors: ['black', 'white']},
      // Level 2
      2 : {cols: 4},
      // Level 3
      3 : {cols: 5}
    };

    router().on('route:default', function() {
      this.navigate('level/1', {trigger: true, replace: true});

    });

    router().on('route:game', function (level) {

      if(isNaN(level) || !levelConfiguration[level]) {
        // Default level:
        this.navigate('level/1', {trigger: true, replace: true});
        return;
      }

      var levelModel = new Level(levelConfiguration[level]);
      levelModel.reset();

      // Destroy old view
      if (gameView) {
        gameView.remove();
      }

      // View
      gameView = new MastermindView({
        level: levelModel
      });
      gameView.$el.appendTo(document.body);
      gameView.render();

      // Game over event:
      levelModel.on('change:gameOver', function (change) {
        if (levelModel.get('gameOver')) {
          setTimeout(function () {
            if(levelModel.isWon()) {
              // Go to the next level!!
              router().navigate('level/' + (level + 1), {trigger: true});
            } else {
              // Try this level again
              levelModel.reset();
              levelModel.generateSecretCombination();
            }
          }, 3500);
        }
      });

    });

    // Start router
    Backbone.history.start({
      pushState: false
    });

  });

// Launch app
require(['bootstrap']);