/* global define:false */

define(["backbone", "underscore", "jquery", "mastermind/view/peg", "mastermind/view/guessRow", "mastermind/model/peg", "tpl!templates/decodingBoard.tpl"],
  function (Backbone, _, $, PegView, GuessRowView, PegModel, template) {
    "use strict";

    return Backbone.View.extend({

      el: "<div/>",
      canvas: null,
      solution: [],
      guesses: [],
      rows: 12,
      cols: 4,

      initialize: function (options) {
        this.guesses = options.guesses;
        this.colors = options.colors;
      },

      /**
       * Renders the template html
       */
      render: function () {
        this.$el.html(template({
          pegColors: this.colors,
          solution: this.solution,
          guessCount: this.guesses.length
        }));

        var guesses = _.map(this.$(".guess"), _.bind(function(guess, i){
          var guessView = new GuessRowView({ model: this.guesses[i], cols: this.cols });
          guessView.setElement(guess);
          guessView.render();
          return guessView;
        }, this));

        var pegs = _.map(this.$(".pegColors .peg"), _.bind(function(peg,i){
          var pegView = new PegView({model : this.colors.at(i)});
          pegView.setElement(peg);
          pegView.render();
          return peg;
        }, this));

      }


    });

  });



