/* global define:false */

define('router', ['backbone'], function (Backbone) {
  'use strict';

  var AppRouter = Backbone.Router.extend({
    routes: {
      'level/:level': 'game',
      '*actions' : 'default'
    },
    // Although there are several pull requests and issues (#1214 #652 #1397 #1863 #2308)
    // the backbone maintainer refuse to add a refresh function
    refresh: function(){
      Backbone.history.loadUrl(Backbone.history.fragment);
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