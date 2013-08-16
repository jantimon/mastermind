requirejs.config({
  shim: {
    'jquery': {
      exports: ['jQuery']
    },
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'underscore' : {
      exports: '_'
    }
  },
  // Path definitions
  paths: {
    'jquery': 'components/jquery/placeholder',
    'backbone': 'components/backbone/backbone-min',
    'underscore': 'components/underscore/underscore-min',
    'hammer': 'components/hammerjs/dist/hammer.min',
    'hammer-jquery': 'components/hammerjs/plugins/jquery.hammer',
    'mastermind': 'src',
    'mastermind/tests': 'tests'
  }
});