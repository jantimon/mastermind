/* global define:false */

define(["backbone", "underscore", "jquery", "mastermind/view/peg", "mastermind/view/guessRow", "mastermind/view/hintRow", "mastermind/model/peg", "tpl!templates/decodingBoard.tpl"],
  function (Backbone, _, $, PegView, GuessRowView, HintRowView, PegModel, template) {
    "use strict";

    return Backbone.View.extend({

      el: "<div/>",
      canvas: null,
      solution: [],
      gameOver: false,

      initialize: function (options) {
        this.current_row = options.current_row || options.guesses.length - 1;
        this.guesses = options.guesses;
        this.colors = options.colors;
        this.secretCombination = options.secretCombination;
        this.$el.addClass("decoding-board");

        // Allow pegs to be dropped into the last row:
        this.guesses[this.current_row].set("enabled", true);
      },

      events: {
        "guess-complete": "guessComplete"
      },

      guessComplete: function () {
        if(this.guesses[this.current_row].get("pegs").isPerfectMatch(this.secretCombination)) {
          this.gameOver = true;
          this.render();
        } else {
          this.current_row--;
          if (this.guesses[this.current_row]) {
            this.guesses[this.current_row].set("enabled", true);
          } else {
            this.gameOver = true;
            this.render();
          }
        }
      },

      /**
       * Renders the template html
       */
      render: function () {
        if (this.gameOver) {
          this.solution = this.secretCombination.models;
        } else {
          this.solution = [];
        }

        this.$el.html(template({
          pegColors: this.colors,
          solution: this.solution,
          guessCount: this.guesses.length
        }));

        _.map(this.$(".guess"), _.bind(function (guess, i) {
          var guessView = new GuessRowView({ guess: this.guesses[i], cols: this.cols });
          guessView.setElement(guess);
          guessView.render();
          return guessView;
        }, this));

        _.map(this.$(".hint"), _.bind(function (hint, i) {
          var hintView = new HintRowView({ guess: this.guesses[i], cols: this.cols, secretCombination: this.secretCombination });
          hintView.setElement(hint);
          hintView.render();
          return hintView;
        }, this));

        _.map(this.$(".pegColors .peg"), _.bind(function (peg, i) {
          var pegView = new PegView({model: this.colors.at(i)});
          pegView.setElement(peg);
          pegView.render();
          return peg;
        }, this));

      }


    });

  });



