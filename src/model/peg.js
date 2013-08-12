/* global define:false */

define(["backbone"],
  function (Backbone) {
    "use strict";
    var colors = ['red', 'purple', 'blue', 'orange', 'green'];

    var Peg = Backbone.Model.extend({
      defaults: {
        color: colors[0],
        visible: true
      }
    });

    Peg.colors = colors;
    return Peg;
  });



