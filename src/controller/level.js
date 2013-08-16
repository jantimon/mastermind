/* global define:false */

define(['underscore',
  'jquery',
  'mastermind/view/decodingBoard',
  'mastermind/model/guess',
  'mastermind/model/level'
],
  function (_, $, DecodingBoardView, GuessRowModel, LevelModel) {
    'use strict';

    var gameView;
    var levelConfiguration = {
      // Level 1
      1: {cols: 4, colors: ['black', 'white']},
      // Level 2
      2: {cols: 4},
      // Level 3
      3: {cols: 5}
    };

    /**
     * Turns a levelIndex into a levelModel
     * @param level
     * @returns LevelModel||false
     */
    function initialize(level) {
      if (isNaN(level) || !levelConfiguration[level]) {
        return false;
      } else {
        var levelModel = new LevelModel(levelConfiguration[level]);
        levelModel.reset();
        return levelModel;
      }
    }


    /**
     * Controller main function
     *
     * @param levelModel
     * @param level
     */
    function execute(levelModel, level) {
      /*jshint validthis:true */
      var router = this;

      // Destroy old view
      if (gameView) {
        gameView.remove();
      }

      // View
      gameView = new DecodingBoardView({
        level: levelModel
      });
      gameView.$el.appendTo(document.body);
      gameView.render();

      // Game row status changes
      levelModel.get('guessRows').on('change:state', function (guessRow) {
        switch (guessRow.get('state')) {
          case GuessRowModel.states.Locked :
            break;
          case GuessRowModel.states.Changeable :
            break;
          case GuessRowModel.states.Complete :
            guessRow.set('state', GuessRowModel.states.Confirmed);
            break;
          case GuessRowModel.states.Confirmed :

            // Check if the game is one
            if (guessRow.isCorrect(levelModel.get('secretCombination'))) {
              levelModel.set('gameOver', true);
            } else {
              // Enable the guess row if there is at least one left
              var nextRow = levelModel.getNextRow();
              if (nextRow) {
                nextRow.set('state', GuessRowModel.states.Changeable);
              } else {
                levelModel.set('gameOver', true);
              }
            }
            break;
        }
      });


      // Game over event:
      levelModel.on('change:gameOver', function () {
        if (levelModel.get('gameOver')) {
          setTimeout(_.bind(function () {
            if (levelModel.isWon()) {
              // Go to the next level!!
              router.navigate('level/' + (parseInt(level, 10) + 1), {trigger: true});
            } else {
              // Try this level again
              levelModel.reset();
              levelModel.generateSecretCombination();
            }
          }, this), 3500);
        }
      });
    }

    /**
     * Backbone router handler
     *
     * @param level
     */
    function routeHandler(level) {
      /*jshint validthis:true */
      var router = this;
      var levelModel = initialize(level);
      if (levelModel) {
        // Start level:
        execute.call(router, levelModel, level);
      } else {
        // Default level:
        router.navigate('level/1', {trigger: true, replace: true});
      }
    }

    return {
      initialize: initialize,
      execute: execute,
      routeHandler: routeHandler
    };

  });