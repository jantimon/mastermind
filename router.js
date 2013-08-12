/* global define:false */

define("router", ["backbone"], function (Backbone) {
  "use strict";

  var AppRouter = Backbone.Router.extend({
    routes: {
      '/': 'game',
      '*actions': 'game'
    }
  });

  var appRouter;
  return function () {
    if (!appRouter) {
      appRouter = new AppRouter();
    }
    return appRouter;
  };

});