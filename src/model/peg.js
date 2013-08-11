/* global define:false */

define(["backbone"],
  function (Backbone) {
    "use strict";
    var colors = ['black', 'red', 'purple', 'blue', 'yellow', 'orange', 'green', 'white'];

    var Peg = Backbone.Model.extend({
      defaults: {
        color: colors[0],
        visible: true
      }
    });

    Peg.colors = colors;
    return Peg;
  });



