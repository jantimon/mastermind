/* global define:false */

define(["backbone", "underscore", "jquery", "hammer-jquery"],
  function (Backbone, _, $) {
    "use strict";

    function getFirstTouchPosition(gesture) {
      if (gesture && gesture.touches && gesture.touches[0]) {
        return gesture.touches[0];
      }
      return {pageX: 0, pageY: 0, clientX: 0, clientY: 0};
    }

    return Backbone.View.extend({

      el: "<span/>",
      $ghost: null,
      color: "",

      events: {
        "dragstart": "dragStart",
        "dragend": "dragEnd",
        "drag": "dragging"
      },

      initialize: function (options) {
        if(!options.model) {
          throw (new Error("can't initialize peg without model"));
        }
        this.model = options.model;
        this.model.on("change", this.render, this);
      },

      render: function () {
        this.$el.hammer();
        if(this.model.get("visible")) {
          this.$el.show();
          this.$el.attr("class", "peg " + this.model.get("color"));
        } else {
          this.$el.hide();
        }

      },

      /**
       * Hammer.js drag start listener
       * @param ev
       */
      dragStart: function (ev) {
        if (ev.gesture) {
          this.$ghost = this.$el
            .clone()
            .addClass("ghost")
            .appendTo(document.body);
          this.dragging(ev);
        }
      },

      /**
       * Hammer.js drag end listener
       * @param ev
       */
      dragEnd: function (ev) {
        if(ev.gesture) {
          ev.gesture.preventDefault();
          this.$ghost.remove();
          var position = getFirstTouchPosition(ev.gesture),
            dropTarget = document.elementFromPoint(position.clientX, position.clientY);
          $(dropTarget).trigger("drop", this);
        }
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

  });



