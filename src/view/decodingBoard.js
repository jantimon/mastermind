/* global define:false */

define(["backbone", "underscore", "jquery", "mastermind/view/peg", "mastermind/view/guess", "mastermind/model/peg", "tpl!templates/decodingBoard.tpl"],
  function (Backbone, _, $, PegView, GuessView, PegModel, template) {
    "use strict";

    return Backbone.View.extend({

      el: "<div/>",
      canvas: null,
      solution: [],
      guesses: [],
      rows: 12,
      cols: 4,

      initialize: function (options) {
        this.pegSets = options.pegSets;
      },

      /**
       * Renders the template html
       */
      render: function () {
        this.$el.html(template({
          pegColors: PegModel.colors,
          solution: this.solution,
          guessCount: this.pegSets.length
        }));

        var guesses = _.map(this.$(".guess"), _.bind(function(guess, i){
          var guessView = new GuessView({ collection: this.pegSets[i], cols: this.cols });
          guessView.setElement(guess);
          guessView.render();
          return guessView;
        }, this));

        var pegs = _.map(this.$(".peg"), function(peg){
          var pegView = new PegView({color : $(peg).text()});
          pegView.setElement(peg);
          pegView.render();
          return peg;
        });

      }


    });

  });



