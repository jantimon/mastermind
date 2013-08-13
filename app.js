/* global define: false, require: false */

// Define App
define("bootstrap", [
  "backbone",
  "jquery",
  "router",
  "underscore",
  "mastermind/view/decodingBoard",
  "mastermind/model/level"],
  function (Backbone, $, router, _, MastermindView, Level) {
    "use strict";

    router().on("route:game", function () {

      var level = new Level();

      // View
      var view = new MastermindView({
        level: level
      });
      view.$el.appendTo(document.body);
      view.render();

      // Game over event:
      level.on("change:gameOver",function(change){
        if(level.get("gameOver")) {
          setTimeout(function(){
            level.reset();
            level.generateSecretCombination();
          }, 3000);
        }
      });

    }, 500);

    // Start router
    Backbone.history.start();

  });

// Launch app
require(["bootstrap"]);