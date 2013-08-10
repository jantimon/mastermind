/* global define:false */

define(["backbone", "underscore", "mastermind/model/peg"],
  function (Backbone, _, Target) {
    "use strict";

    return Backbone.Collection.extend({
      model: Target
    });

  });



