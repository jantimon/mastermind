/* global define:false */

define(["backbone",
  "underscore",
  "mastermind/model/peg",
  "mastermind/model/guess",
  "mastermind/collection/pegSet"],
  function (Backbone, _, PegModel, GuessModel, PegSetCollection) {
    "use strict";

    return Backbone.Model.extend({
      defaults: {
        cols: 4,
        rows: 8,
        guesses: null,
        secretCombination: new PegSetCollection(),
        colors: null,
        currentRow: null,
        gameOver: false
      },

      initialize: function () {
        this.initializeGuesses();
        this.initializeColors();
        this.reset();
      },

      /**
       * Resets the level
       */
      reset: function() {
        this.get("secretCombination").reset([]);
        this.set("gameOver", false);
        // Disable and clear all rows
        _.each(this.get("guesses"), function(guess){
          guess.set({
            enabled : false
          });
          guess.get("pegs").each(function(peg){
            peg.set({
              visible: false
            });
          });
        });
        // Enable last row
        this.set("currentRow", this.get("rows") - 1);
        this.get("guesses")[this.get("rows") - 1].set("enabled", true);
        // Generate new combination
        this.generateSecretCombination();
      },

      initializeGuesses: function () {
        var guesses = [];
        for (var rowIndex = 0; rowIndex < this.get("rows"); rowIndex++) {
          var pegSet = new PegSetCollection();
          for (var colIndex = 0; colIndex < this.get("cols"); colIndex++) {
            pegSet.add(new PegModel({visible: false}));
          }
          guesses.push(new GuessModel({pegs: pegSet}));
        }
        this.set("guesses", guesses);
      },


      initializeColors: function(){
        var colors = new PegSetCollection();
        _.each(PegModel.colors, function (color) {
          colors.add(new PegModel({color: color, visible: true}));
        });
        this.set("colors", colors);
      },

      generateSecretCombination: function() {
        this.get("secretCombination").reset([]);
        var secretCombination = this.get("secretCombination");
        for (var colIndex = 0; colIndex < this.get("cols"); colIndex++) {
          var random = Math.floor(Math.random() * this.get("colors").length);
          secretCombination.add(new PegModel({color: this.get("colors").at(random).get("color")}));
        }
        this.set("secretCombination", secretCombination);
      }

    });
  });



