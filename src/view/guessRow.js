/* global define:false */

define(['backbone', 'underscore', 'jquery', 'mastermind/view/peg', 'mastermind/collection/pegSet', 'tpl!templates/guessRow.tpl'],
  function (Backbone, _, $, PegView, PegSet, template) {
    'use strict';

    return Backbone.View.extend({

      el: '<div/>',

      events: {
        'drop .pegContainer': 'drop'
      },

      initialize: function (options) {
        this.model = options.guess;
        this.cols = options.cols;
        this.model.on('change', this.render, this);
        this.model.get('pegs').on('change', this.render, this);
      },

      /**
       * Handle dropped pegs
       * @param event
       * @param draggedPegView
       */
      drop: function (event, draggedPegView) {
        if (draggedPegView instanceof PegView && this.model.get('enabled')) {
          var index = this.$('.pegContainer').index(event.currentTarget);
          var draggedPegModel = draggedPegView.model;
          this.model.get('pegs').at(index).set({
            enabled: true,
            visible: true,
            color: draggedPegModel.get('color')
          });
          // This might need a confirmation:
          if (this.model.isFull()) {
            this.$el.trigger('guess-complete');
          }
        }
      },

      /**
       * Renders the template html
       */
      render: function () {
        // Render pegs
        if (this.$el.children().length === 0) {

          this.$el.html(template({
            pegContainers: this.model.get('pegs')
          }));

          _.map(this.$('.peg'), _.bind(function (peg, i) {
            var pegView = new PegView({model: this.model.get('pegs').at(i)});
            pegView.setElement(peg);
            pegView.render();
          }, this));
        }

        // classes
        this.$el.toggleClass('empty', this.model.isEmpty());
        this.$el.toggleClass('full', this.model.isFull());
        this.$el.toggleClass('enabled', this.model.get('enabled'));
        this.$el.toggleClass('disabled', !this.model.get('enabled'));
      }

    });
  });



