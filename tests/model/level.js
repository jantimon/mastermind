/* global define: false, require: false, describe: false, it:false, expect: false */

// Define App
define([
  'underscore',
  'mastermind/model/level'
],
  function (_, LevelModel) {
    'use strict';

    var config = {
      cols: 4,
      rows: 8,
      colors: ['black', 'green', 'blue']
    };

    var levelModel = new LevelModel(config);
    levelModel.reset();

    // Initialization
    describe('Level', function () {

      it('should generate the specified guess rows', function () {
        expect(config.rows).toEqual(levelModel.get('guessRows').length);
      });

      it('should generate the specified column count', function() {
        var cellCount = levelModel.get('guessRows').reduce(function(memo, guessRow){
          return (isNaN(memo) ? memo.get('pegs').length : memo) + guessRow.get('pegs').length;
        });
        expect(config.cols * config.rows).toEqual(cellCount);
      });

      it('should generate the specified color table', function(){
        expect(config.colors.length).toEqual(levelModel.get('colors').length);
      });

      it('should generate a secret combination', function(){
        expect(config.cols).toEqual(levelModel.get('secretCombination').length);
      });

      it('should generate the secret combination out of the specified colors', function() {
        var differs = levelModel.get('secretCombination').any(function(peg){
          return !_.contains(config.colors, peg.get('color'));
        });
        expect(differs).toEqual(false);
      });

      it('should return the last row as current cow', function () {
        expect(levelModel.getCurrentGuessRow()).toEqual(levelModel.get('guessRows').last());
      });

      it('should return the second to last row as next cow', function () {
        expect(levelModel.getNextRow()).toEqual(levelModel.get('guessRows').at(config.rows - 2));
      });


    });

  });