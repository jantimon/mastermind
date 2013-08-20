/* global define: false, describe: false, it:false, expect: false, spyOn: false */

// Define App
define([
  'backbone',
  'underscore',
  'jquery',
  'mastermind/controller/level',
  'mastermind/model/guess'
],
  function (Backbone, _, $, levelController, GuessModel) {
    'use strict';

    /**
     * Sets up a new empty level
     *
     * @param callback
     * @param levelIndex int Optional level index
     * @param solution array Optional solution colors
     */
    function levelInitializationHelper(callback, levelIndex, solution) {
      return function () {
        var index = levelIndex || 1;
        var level = levelController.initialize(index);

        _.each(solution || [], function (color, i) {
          level.get('secretCombination').at(i).set('color', color);
        });

        // Mock the router
        var router = new Backbone.Router();
        router.refresh = function(){};
        spyOn(router, 'navigate');
        spyOn(router, 'refresh');

        levelController.execute.call(router, level, index);
        var $domElement = $('.decoding-board:last');
        callback.call(router, level, $domElement, index);
        $domElement.remove();
      };
    }

    // Initialization
    describe('Level controller', function () {

      it('should be able to load level 1', function () {
        expect(levelController.initialize(1)).toBeTruthy();
      });

      it('should be able to load level 2', function () {
        expect(levelController.initialize(2)).toBeTruthy();
      });

      it('should be able to load level 3', function () {
        expect(levelController.initialize(3)).toBeTruthy();
      });

      it('should add a dom element', levelInitializationHelper(function () {
        // Overwrite secret combination
        expect($('.decoding-board:last').length).toEqual(1);
      }));

      it('should start with empty rows', levelInitializationHelper(function (level) {
        var fullRowFound = level.get('guessRows').any(function (guessRow) {
          return guessRow.get('pegs').any(function (peg) {
            return peg.get('visible');
          });
        });
        expect(fullRowFound).toBeFalsy();
      }));

      it('should be playable', levelInitializationHelper(function (level) {
        expect(level.get('gameOver')).toBeFalsy();
      }));

      it('should hide the secret combination during the game', levelInitializationHelper(function (level, $rootDomElement) {
        expect($rootDomElement.find('.solution.revealed').length).toBeFalsy();
      }));


      it('should set the row to confirmed after the state was set to complete', levelInitializationHelper(function (level) {
        var row = level.getCurrentGuessRow();
        row.get('pegs').each(function (peg) {
          peg.set({
            visible: true,
            color: 'white'
          });
        });
        row.set('state', GuessModel.states.Complete);
        expect(row.get('state')).toEqual(GuessModel.states.Confirmed);
      }));

      it('should not end the game after receiving a wrong guess', levelInitializationHelper(function (level) {
        var row = level.getCurrentGuessRow();
        row.get('pegs').each(function (peg) {
          peg.set({
            visible: true,
            color: 'white'
          });
        });
        row.set('state', GuessModel.states.Complete);
        expect(level.get('gameOver')).toBeFalsy();
      }, 1, ['black', 'white', 'white', 'black']));

      it('should enable the next row after receiving a wrong guess', levelInitializationHelper(function (level) {
        var nextRow = level.getNextRow();
        var row = level.getCurrentGuessRow();
        row.get('pegs').each(function (peg) {
          peg.set({
            visible: true,
            color: 'white'
          });
        });
        row.set('state', GuessModel.states.Complete);
        expect(level.getCurrentGuessRow()).toEqual(nextRow);
      }, 1, ['black', 'white', 'white', 'black']));

      it('should give correct hints', levelInitializationHelper(function (level) {
        var row = level.getCurrentGuessRow();
        row.get('pegs').at(0).set('color', 'black');
        row.get('pegs').at(1).set('color', 'white');
        row.get('pegs').at(2).set('color', 'black');
        row.get('pegs').at(3).set('color', 'white');
        row.set('state', GuessModel.states.Complete);
        var matches = (row.get('pegs').getMatches(level.get('secretCombination')));
        expect(matches).toEqual(['black', 'black', 'white', 'white']);
      }, 1, ['black', 'white', 'white', 'black']));

      it('should give correct hints', levelInitializationHelper(function (level) {
        var row = level.getCurrentGuessRow();
        row.get('pegs').at(0).set('color', 'white');
        row.get('pegs').at(1).set('color', 'white');
        row.get('pegs').at(2).set('color', 'black');
        row.get('pegs').at(3).set('color', 'white');
        row.set('state', GuessModel.states.Complete);
        var matches = (row.get('pegs').getMatches(level.get('secretCombination')));
        expect(matches).toEqual(['black', 'white', 'white', false]);
      }, 1, ['black', 'white', 'white', 'black']));

      it('should end after receiving only wrong guesses', levelInitializationHelper(function (level) {
        level.get('guessRows').each(function () {
          var row = level.getCurrentGuessRow();
          if (row.isChangeable()) {
            row.get('pegs').at(0).set('color', 'white');
            row.get('pegs').at(1).set('color', 'white');
            row.get('pegs').at(2).set('color', 'white');
            row.get('pegs').at(3).set('color', 'white');
            row.set('state', GuessModel.states.Complete);
          }
        });
        expect(level.get('gameOver')).toBeTruthy();
      }, 1, ['black', 'white', 'white', 'black']));

      it('should repeat the level after receiving only wrong guesses', levelInitializationHelper(function (level) {
        level.get('guessRows').each(function () {
          var row = level.getCurrentGuessRow();
          if (row.isChangeable()) {
            row.get('pegs').at(0).set('color', 'white');
            row.get('pegs').at(1).set('color', 'white');
            row.get('pegs').at(2).set('color', 'white');
            row.get('pegs').at(3).set('color', 'white');
            row.set('state', GuessModel.states.Complete);
          }
        });
        expect(this.refresh).toHaveBeenCalled();
      }, 1, ['black', 'white', 'white', 'black']));

      it('should know that the player lost  after receiving only wrong guesses', levelInitializationHelper(function (level) {
        level.get('guessRows').each(function () {
          var row = level.getCurrentGuessRow();
          if (row.isChangeable()) {
            row.get('pegs').at(0).set('color', 'white');
            row.get('pegs').at(1).set('color', 'white');
            row.get('pegs').at(2).set('color', 'white');
            row.get('pegs').at(3).set('color', 'white');
            row.set('state', GuessModel.states.Complete);
          }
        });
        expect(level.isWon()).toBeFalsy();
      }, 1, ['black', 'white', 'white', 'black']));

      it('should end the game after receiving a correct guess', levelInitializationHelper(function (level) {
        var row = level.getCurrentGuessRow();
        row.get('pegs').at(0).set('color', 'black');
        row.get('pegs').at(1).set('color', 'white');
        row.get('pegs').at(2).set('color', 'white');
        row.get('pegs').at(3).set('color', 'black');
        row.set('state', GuessModel.states.Complete);
        expect(level.get('gameOver')).toBeTruthy();
      }, 1, ['black', 'white', 'white', 'black']));


      it('should know that the player won after receiving a correct guess', levelInitializationHelper(function (level) {
        var row = level.getCurrentGuessRow();
        row.get('pegs').at(0).set('color', 'black');
        row.get('pegs').at(1).set('color', 'white');
        row.get('pegs').at(2).set('color', 'white');
        row.get('pegs').at(3).set('color', 'black');
        row.set('state', GuessModel.states.Complete);
        expect(level.isWon()).toBeTruthy();
      }, 1, ['black', 'white', 'white', 'black']));

      it('should go to the next level after the player won', levelInitializationHelper(function (level, $rootDomElement, levelIndex) {
        var row = level.getCurrentGuessRow();
        row.get('pegs').at(0).set('color', 'black');
        row.get('pegs').at(1).set('color', 'white');
        row.get('pegs').at(2).set('color', 'white');
        row.get('pegs').at(3).set('color', 'black');
        row.set('state', GuessModel.states.Complete);
        expect(this.navigate).toHaveBeenCalledWith('level/' + (parseInt(levelIndex, 10) + 1), {trigger: true});
      }, 1, ['black', 'white', 'white', 'black']));

      it('should reveal the secret combination after the game ended', levelInitializationHelper(function (level, $rootDomElement) {
        var row = level.getCurrentGuessRow();
        row.get('pegs').at(0).set('color', 'black');
        row.get('pegs').at(1).set('color', 'white');
        row.get('pegs').at(2).set('color', 'white');
        row.get('pegs').at(3).set('color', 'black');
        row.set('state', GuessModel.states.Complete);
        expect($rootDomElement.find('.solution.revealed').length).toBeTruthy();
      }, 1, ['black', 'white', 'white', 'black']));

    });

  });