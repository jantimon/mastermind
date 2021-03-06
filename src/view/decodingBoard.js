/* global define:false */

define(['backbone', 'underscore', 'jquery', 'mastermind/view/peg', 'mastermind/view/guessRow', 'mastermind/view/hintRow', 'mastermind/model/peg', 'tpl!templates/decodingBoard.tpl'],
  function (Backbone, _, $, PegView, GuessRowView, HintRowView, PegModel, template) {
    'use strict';

    return Backbone.View.extend({

      el: '<div/>',
      canvas: null,

      initialize: function (options) {
        this.level = options.level;
        this.$el.addClass('decoding-board');
        this.listenTo(this.level, 'change', this.render);
      },

      /**
       * Renders the template html
       */
      render: function () {

        var solution = [];
        // Reveal the solution if the game is over
        if (this.level.get('gameOver')) {
          solution = this.level.get('secretCombination').models;
        }

        // Render the template html
        this.$el.html(template({
          pegColors: this.level.get('colors'),
          solution: solution,
          guessCount: this.level.get('guessRows').length
        }));

        var colors = this.level.get('colors');
        var guessRows = this.level.get('guessRows');

        // Map dom elements with views
        _.map(this.$('.guess'), _.bind(function (guess, i) {
          var guessView = new GuessRowView({ guess: guessRows.at(i), cols: this.level.get('cols') });
          guessView.setElement(guess);
          guessView.render();
          return guessView;
        }, this));

        // Map dom elements with views
        _.map(this.$('.hint'), _.bind(function (hint, i) {
          var hintView = new HintRowView({ guess: guessRows.at(i), cols: this.level.get('cols'), secretCombination: this.level.get('secretCombination') });
          hintView.setElement(hint);
          hintView.render();
          return hintView;
        }, this));

        // Map dom elements with views
        _.map(this.$('.pegColors .peg'), _.bind(function (peg, i) {
          var pegView = new PegView({model: colors.at(i)});
          pegView.setElement(peg);
          pegView.render();
          return peg;
        }, this));

        this.$('.solution').toggleClass('revealed', this.level.get('gameOver'));
        this.$el
          .toggleClass('four-balls', this.level.get('cols') === 4)
          .toggleClass('five-balls', this.level.get('cols') === 5);
      }
    });
  });



