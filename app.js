/* global define: false, require: false */

// Define App
define("bootstrap", ["backbone", "jquery", "router", "underscore", "mastermind/view/decodingBoard", "mastermind/model/peg", "mastermind/model/guess", "mastermind/collection/pegSet"],
  function (Backbone, $, router, _, MastermindView, PegModel, GuessModel, PegSetCollection) {
    "use strict";

    router().on("route:game", function () {

      // Data structure
      var cols = 4;
      var rows = 12;
      var guesses = _.map(_.range(rows), function () {
        var pegSet = new PegSetCollection();
        for (var i = 0; i < cols; i++) {
          pegSet.add(new PegModel({visible: false}));
        }
        return new GuessModel({pegs: pegSet});
      });

      // Allow pegs to be dropped on the last row:
      guesses[rows - 1].set("active", true);


      var colors = new PegSetCollection();
      _.each(PegModel.colors, function (color) {
        colors.add(new PegModel({color: color, visible: true}));
      });

      // View
      var view = new MastermindView({
        guesses: guesses,
        colors: colors
      });
      view.$el.appendTo(document.body);
      view.render();

    }, 500);

    // Start router
    Backbone.history.start();

  });

// Launch app
require(["bootstrap"]);