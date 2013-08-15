/* global define:false */

define(['backbone',
  'underscore',
  'mastermind/model/peg',
  'mastermind/model/guess',
  'mastermind/collection/pegSet',
  'mastermind/collection/guessRows'],
  function (Backbone, _, PegModel, GuessModel, PegSetCollection, GuessRowCollection) {
    'use strict';

    return Backbone.Model.extend({
      defaults: {
        cols: 4,
        rows: 8,
        guessRows: false,
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
        // Enable the last row
        this.get('guessRows').at(this.get('rows') - 1).set('state', GuessModel.states.Changeable);
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
        if (!this.get('guessRows')) {
          this.set('guessRows', new GuessRowCollection());
        }
        this.get('guessRows').reset(guessRows);
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
       * Returns the current active row
       *
       * @returns GuessModel
       */
      getCurrentGuessRow: function () {
        return this.get('guessRows').find(function (guessRow) {
          return guessRow.get('state') === GuessModel.states.Changeable;
        });
      },

      /**
       * Returns the next row
       *
       * @returns GuessModel|false
       */
      getNextRow: function () {
        var i = -1, index = -1;
        this.get('guessRows').find(function (guessRow) {
          if (guessRow.isFull()) {
            index = i++;
            return true;
          } else {
            i++;
            return false;
          }
        });
        return index >= 0 ? this.get('guessRows').at(index) : false;
      },

      /**
       * Returns true if the level was solved correctly
       * @returns boolean
       */
      isWon: function () {
        if(!this.get('gameOver')) {
          return false;
        }
        var complete = this.get('guessRows').find(function (guessRow) {
          return guessRow.get('state') === GuessModel.states.Confirmed;
        });

        return complete && complete.isCorrect(this.get('secretCombination'));
      }

    });
  });



