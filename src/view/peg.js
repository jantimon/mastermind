/* global define:false */

define(["backbone", "underscore", "jquery", "mastermind/model/peg", "hammer-jquery"],
  function (Backbone, _, $, PegModel) {
    "use strict";

    function getFirstTouchPosition(gesture) {
      if (gesture && gesture.touches && gesture.touches[0]) {
        return gesture.touches[0];
      }
      return {pageX: 0, pageY: 0, clientX: 0, clientY: 0};
    }

    var PegView = Backbone.View.extend({

      el: "<span/>",
      $ghost: null,
      color: "",

      events: {
        "dragstart": "dragStart",
        "dragend": "dragEnd",
        "drag": "dragging"
      },

      initialize: function (options) {
        this.color = options.color;
        this.$el.addClass("peg");
      },

      render: function () {
        this.$el.hammer();
      },

      /**
       * Hammer.js drag start listener
       * @param ev
       */
      dragStart: function (ev) {
        this.$ghost = this.$el
          .clone()
          .addClass("ghost")
          .appendTo(document.body);
        this.dragging(ev);
      },

      /**
       * Hammer.js drag end listener
       * @param ev
       */
      dragEnd: function (ev) {
        ev.gesture.preventDefault();
        this.$ghost.remove();
        var position = getFirstTouchPosition(ev.gesture),
          dropTarget = document.elementFromPoint(position.clientX, position.clientY);
        $(dropTarget).trigger("drop", this);
      },

      /**
       * Hammer.js drag listener
       * @param ev
       */
      dragging: function (ev) {
        var position = getFirstTouchPosition(ev.gesture);
        ev.gesture.preventDefault();
        this.$ghost.css({
          left: position.pageX - this.$ghost.width() / 2,
          top: position.pageY - this.$ghost.height() / 2
        });
      }

    });

    return PegView;

  });



