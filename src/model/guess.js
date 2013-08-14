/* global define:false */

define(['backbone', 'mastermind/collection/pegSet'],
  function (Backbone, PegSet) {
    'use strict';

    return Backbone.Model.extend({
      defaults: {
        pegs: new PegSet(),
        enabled: false
      },

      isEmpty: function () {
        return !this.get('pegs').any(function (peg) {
          return peg.get('visible');
        });
      },

      isFull: function () {
        return !this.get('pegs').any(function (peg) {
          return !peg.get('visible');
        });
      }

    });
  });



