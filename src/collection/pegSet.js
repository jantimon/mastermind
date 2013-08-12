/* global define:false */

define(["backbone", "underscore", "mastermind/model/peg"],
  function (Backbone, _, PegModel) {
    "use strict";

    return Backbone.Collection.extend({
      model: PegModel,

      /**
       * Returns the color count for all colors of this set
       * @return {color:number}
       */
      getColorCount: function() {
        var colors = {};
        this.each(function(peg){
          var color = peg.get("color");
          colors[color] = 1 + (colors[color] || 0);
        });
        return colors;
      },

      /**
       * Returns an array of hints
       *
       * @param anotherPegSet
       * @returns ["black"|"white"|false, ...]
       */
      getMatches: function (anotherPegSet) {
        var hints = [];
        var pegSet = this;
        var pegColors = this.getColorCount();
        var secretColors = anotherPegSet.getColorCount();

        // Get correct positions
        _.each(_.range(pegSet.length), function (peg, i) {
          var color = pegSet.at(i).get("color");
          if (anotherPegSet.at(i).get("color") === color) {
            hints.push("black");
            pegColors[color]--;
            secretColors[color]--;
          }
        });

        // Get correct colors
        _.each(pegColors, function (count, color) {
          var colorMatches = Math.min(count, (secretColors[color] || 0));
          _.each(_.range(colorMatches), function (i) {
            hints.push("white");
          });
        });

        // Fill empty colors
        for (var i = hints.length; i < pegSet.length; i++) {
          hints[i] = false;
        }

        return hints;
      },


      /**
       * @param anotherPegSet
       * @returns {boolean}
       */
      isPerfectMatch : function(anotherPegSet){
        return !this.any(function(peg, i){
          return peg.get("color") !== anotherPegSet.at(i).get("color");
        });
      }

    });

  });



