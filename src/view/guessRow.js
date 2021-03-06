/* global define:false */

define(['backbone',
  'underscore',
  'jquery',
  'mastermind/view/peg',
  'mastermind/model/guess',
  'mastermind/collection/pegSet',
  'tpl!templates/guessRow.tpl'],

  function (Backbone, _, $, PegView, GuessRowModel, PegSet, template) {
    'use strict';

    return Backbone.View.extend({

      el: '<div/>',

      events: {
        'drop .pegContainer': 'drop'
      },

      initialize: function (options) {
        this.model = options.guess;
        this.cols = options.cols;
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model.get('pegs'), 'change', this.render);
      },

      /**
       * Handle dropped pegs
       * @param event
       * @param draggedPegView
       */
      drop: function (event, draggedPegView) {
        if (draggedPegView instanceof PegView && this.model.isChangeable()) {
          var index = this.$('.pegContainer').index(event.currentTarget);
          var draggedPegModel = draggedPegView.model;
          this.model.get('pegs').at(index).set({
            enabled: true,
            visible: true,
            color: draggedPegModel.get('color')
          });
          if (this.model.isFull()) {
            this.model.set('state', GuessRowModel.states.Complete);
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
        this.$el.toggleClass('enabled', this.model.isChangeable());
        this.$el.toggleClass('disabled', !this.model.isChangeable());
      }

    });
  });



