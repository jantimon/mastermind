/* global define:false */

define(["backbone", "mastermind/collection/pegSet"],
  function (Backbone, PegSet) {
    "use strict";

    var Guess = Backbone.Model.extend({
      defaults: {
        pegs: new PegSet(),
        active: false
      },

      isEmpty: function() {
        return !this.get("pegs").any(function (peg) {
          return peg.get("visible");
        });
      },

      isFull: function(){
        return !this.get("pegs").any(function (peg) {
          return !peg.get("visible");
        });
      }

    });

    return Guess;
  });



