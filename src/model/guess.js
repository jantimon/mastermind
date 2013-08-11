/* global define:false */

define(["backbone", "mastermind/collection/pegSet"],
  function (Backbone, PegSet) {
    "use strict";

    var Guess = Backbone.Model.extend({
      defaults: {
        pegs: new PegSet(),
        active: false
      }
    });

    return Guess;
  });



