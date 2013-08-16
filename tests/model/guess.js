/* global define: false, require: false, describe: false, it:false, expect: false */

// Define App
define([
  'underscore',
  'mastermind/model/guess',
  'mastermind/model/peg',
  'mastermind/collection/pegSet'
],
  function (_, GuessRowModel, PegModel, PegSetCollection) {
    'use strict';

    var guessRow = new GuessRowModel();
    guessRow.set('pegs', new PegSetCollection());
    guessRow.get('pegs').add(new PegModel({ visible: false, color: 'green'}));
    guessRow.get('pegs').add(new PegModel({ visible: false, color: 'blue'}));
    guessRow.get('pegs').add(new PegModel({ visible: false, color: 'orange'}));

    // Initialization
    describe('Guess row', function () {

      it('should be empty', function () {
        expect(guessRow.isEmpty()).toEqual(true);
      });

      it('should not be full', function () {
        expect(guessRow.isFull()).toEqual(false);
      });

      it('should be locked', function () {
        expect(guessRow.isLocked()).toEqual(true);
      });

      it('should not be empty anymore after adding one peg', function () {
        guessRow.get('pegs').at(0).set('visible', true);
        expect(guessRow.isEmpty()).toEqual(false);
      });

      it('should not be full after showing one peg', function () {
        guessRow.get('pegs').at(0).set('visible', true);
        expect(guessRow.isFull()).toEqual(false);
      });

      it('should be full after showing all pegs', function () {
        guessRow.get('pegs').each(function(peg){peg.set('visible', true);});
        expect(guessRow.isFull()).toEqual(true);
      });

      it('should not be correct for a invalid solution', function () {
        var solution = new PegSetCollection();
        solution.add(new PegModel({ visible: false, color: 'black'}));
        solution.add(new PegModel({ visible: false, color: 'blue'}));
        solution.add(new PegModel({ visible: false, color: 'orange'}));
        expect(guessRow.isCorrect(solution)).toEqual(false);
      });

      it('should be correct for a valid solution', function () {
        var solution = new PegSetCollection();
        solution.add(new PegModel({ visible: false, color: 'green'}));
        solution.add(new PegModel({ visible: false, color: 'blue'}));
        solution.add(new PegModel({ visible: false, color: 'orange'}));
        expect(guessRow.isCorrect(solution)).toEqual(true);
      });


    });

  });