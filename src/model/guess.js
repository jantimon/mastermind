/* global define:false */

define(['backbone', 'mastermind/collection/pegSet'],
  function (Backbone, PegSet) {
    'use strict';

    var states = {
      'Locked' : 0,
      'Changeable' : 1,
      'Complete' : 2,
      'Confirmed' : 3
    };

    var GuessRowModel = Backbone.Model.extend({
      defaults: {
        pegs: new PegSet(),
        state: states.Locked
      },

      isEmpty: function () {
        return !this.get('pegs').any(function (peg) {
          return peg.get('visible');
        });
      },

      isFull: function () {
        return !this.get('pegs').any(function (peg) {
          return !peg.get('visible');
        });
      },

      isLocked: function () {
        return this.get('state') === states.Locked;
      },

      isChangeable: function () {
        return this.get('state') === states.Changeable;
      },

      isComplete: function() {
        return this.get('state') === status.Complete;
      },

      isConfirmed: function() {
        return this.get('state') === states.Confirmed;
      },

      isCorrect: function(solution) {
        return solution.isPerfectMatch(this.get('pegs'));
      }

    });

    GuessRowModel.states = states;
    return GuessRowModel;

  });



