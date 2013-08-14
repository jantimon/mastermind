/* global define:false */

define('router', ['backbone'], function (Backbone) {
  'use strict';

  var AppRouter = Backbone.Router.extend({
    routes: {
      'level/:level': 'game',
      '*actions' : 'default'
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