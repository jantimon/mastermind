/* global define: false, require: false */

// Define App
define("bootstrap", ["backbone", "jquery", "router", "underscore", "mastermind/view/decodingBoard", "mastermind/model/peg", "mastermind/collection/pegSet"],
  function (Backbone, $, router, _, MastermindView, Peg, PegSetCollection) {
    "use strict";

    router().on("route:game", function () {



      }, 500);


      var view = new MastermindView({
        parent: document.body
      });

    Backbone.history.start();

  });

// Launch app
require(["bootstrap"]);