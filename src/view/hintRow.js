/* global define:false */

define(['backbone', 'underscore', 'jquery', 'mastermind/view/peg', 'mastermind/collection/pegSet', 'tpl!templates/hintRow.tpl'],
  function (Backbone, _, $, PegView, PegSet, template) {
    'use strict';

    return Backbone.View.extend({

      el: '<div/>',

      initialize: function (options) {
        this.guess = options.guess;
        this.guess.on('change', this.render, this);
        this.secretCombination = options.secretCombination;
      },

      /**
       * Renders the template html
       */
      render: function () {
        // Render pegs
        if (this.guess.isFull() && this.guess.isConfirmed()) {

          // Replace empty hints with 'hole'
          var hints = _.map(this.guess.get('pegs').getMatches(this.secretCombination), function (hint) {
            return hint || 'mismatch';
          });

          var hintText = {
            'black': 'correct guess in both color and position',
            'white': 'correct color guess',
            'mismatch': 'wrong color and position'
          };

          this.$el.html(template({hints: hints, hintText: hintText}));
        } else {
          this.$el.empty();
        }
      }

    });

  });



