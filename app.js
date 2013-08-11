/* global define: false, require: false */

// Define App
define("bootstrap", ["backbone", "jquery", "router", "underscore", "mastermind/view/decodingBoard", "mastermind/model/peg", "mastermind/collection/pegSet"],
  function (Backbone, $, router, _, MastermindView, Peg, PegSetCollection) {
    "use strict";

    router().on("route:game", function () {

      var pegSets = _.map(_.range(8), function(){
        return new PegSetCollection();
      });

      var view = new MastermindView({
        pegSets: pegSets
      });
      view.$el.appendTo(document.body);
      view.render();

      }, 500);
    Backbone.history.start();

  });

// Launch app
require(["bootstrap"]);