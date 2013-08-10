/* global define:false */

define(["backbone", "underscore", "jquery", "mastermind/model/peg", "tpl!templates/decodingBoard.tpl"],
  function (Backbone, _, $, Peg, template) {
    "use strict";

    return Backbone.View.extend({

      el: "<div/>",
      canvas: null,
      solution: [],
      attempts: [],

      initialize: function (options) {
        this.$el.appendTo(options.parent || document.body);
        this.render();
      },

      /**
       * Renders the template html
       */
      render: function () {
        this.$el.html(template({
          pegColors: Peg.colors,
          solution: this.solution,
          attempts: this.attempts
        }));
      }


    });

  });



