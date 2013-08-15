/* global define:false */

define(['backbone', 'underscore', 'mastermind/model/guess'],
  function (Backbone, _, GuessRowModel) {
    'use strict';

    return Backbone.Collection.extend({
      model: GuessRowModel
    });
  });