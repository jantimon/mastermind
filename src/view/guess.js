/* global define:false */

define(["backbone", "underscore", "jquery", "mastermind/collection/pegSet", "tpl!templates/guessRow.tpl"],
  function (Backbone, _, $, PegSet, template) {
    "use strict";

    var GuessView = Backbone.View.extend({

      el: "<div/>",

      events: {
        "drop .pegContainer": "drop"
      },

      initialize: function (options) {
        this.collection = options.collection;
        this.cols = options.cols;
      },

      drop: function (event, pegView) {
        
      },

      /**
       * Renders the template html
       */
      render: function () {
        this.$el.html(template({
          // pegContainer array with a length of this.cols
          pegContainers: _.map(_.range(this.cols), _.bind(function (i) {
            return this.collection.length >= i ? this.collection.at(i) : false;
          }, this))

        }));
      }

    });

    return GuessView;

  });



