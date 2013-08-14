/* global define:false */

define(['backbone',
  'underscore',
  'mastermind/model/peg',
  'mastermind/model/guess',
  'mastermind/collection/pegSet'],
  function (Backbone, _, PegModel, GuessModel, PegSetCollection) {
    'use strict';

    return Backbone.Model.extend({
      defaults: {
        cols: 4,
        rows: 8,
        guessRows: null,
        secretCombination: new PegSetCollection(),
        colors: null,
        currentRow: null,
        gameOver: false
      },

      /**
       * @param options
       *  cols int set the columns per guess row
       *  rows int set the guess row count
       *  colors string[] set the available colors
       */
      initialize: function (options) {
        if (!options) {
          options = {};
        }
        _.each(['cols', 'rows'], _.bind(function (setting) {
          if (options[setting] !== undefined) {
            this.set(setting, options[setting]);
          }
        }, this));
        this.initializeGuessRows();
        this.initializeColors(options.colors || false);
        this.reset();
      },

      /**
       * Resets the level
       */
      reset: function () {
        this.get('secretCombination').reset([]);
        this.set('gameOver', false);
        // Disable and clear all rows
        this.initializeGuessRows();
        // Enable last row
        this.set('currentRow', this.get('rows') - 1);
        this.get('guessRows')[this.get('rows') - 1].set('enabled', true);
        // Generate new combination
        this.generateSecretCombination();
      },

      /**
       *  Initialize the guess rows
       */
      initializeGuessRows: function () {
        var guessRows = [];
        for (var rowIndex = 0; rowIndex < this.get('rows'); rowIndex++) {
          var pegSet = new PegSetCollection();
          for (var colIndex = 0; colIndex < this.get('cols'); colIndex++) {
            pegSet.add(new PegModel({visible: false}));
          }
          guessRows.push(new GuessModel({pegs: pegSet}));
        }
        this.set('guessRows', guessRows);
      },


      /**
       * Creates color models for each given color name.
       * If no color name is given all available colors are used.
       */
      initializeColors: function (colorNames) {
        var colors = new PegSetCollection();
        _.each(colorNames || PegModel.colors, function (color) {
          colors.add(new PegModel({color: color, visible: true}));
        });
        this.set('colors', colors);
      },

      /**
       * Generates a new combination of colors
       * which have to be guessed by the player
       */
      generateSecretCombination: function () {
        this.get('secretCombination').reset([]);
        var secretCombination = this.get('secretCombination');
        for (var colIndex = 0; colIndex < this.get('cols'); colIndex++) {
          var random = Math.floor(Math.random() * this.get('colors').length);
          secretCombination.add(new PegModel({color: this.get('colors').at(random).get('color')}));
        }
        this.set('secretCombination', secretCombination);
      },

      /**
       * Returns true if the level was solved correctly
       * @returns boolean
       */
      isWon: function () {
        return this.get('gameOver') && this.get('guessRows')[this.get('currentRow')].isPerfectMatch(this.get('secretCombination'));
      }

    });
  });



