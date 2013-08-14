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
    'underscore': 'components/underscore/underscore',
    'hammer': 'components/hammerjs/dist/hammer',
    'hammer-jquery': 'components/hammerjs/plugins/jquery.hammer',
    'mastermind': 'src',
    // Modernizr
    'Modernizr': 'components/modernizr/src/Modernizr',
    'addTest': 'components/modernizr/src/addTest',
    'ModernizrProto': 'components/modernizr/src/ModernizrProto',
    'setClasses': 'components/modernizr/src/setClasses',
    'hasOwnProp': 'components/modernizr/src/hasOwnProp',
    'tests': 'components/modernizr/src/tests',
    'is': 'components/modernizr/src/is',
    'docElement': 'components/modernizr/src/docElement',
    'feature-detects': 'components/modernizr/feature-detects'
  }
});