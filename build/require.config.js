requirejs.config({
  shim: {
    "jquery": {
      exports: ["jQuery"]
    },
    "backbone": {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    "underscore" : {
      exports: "_"
    }
  },
  // Path definitions
  paths: {
    "jquery": "components/jquery/jquery-2.0.3.min",
    "backbone": "components/backbone/backbone-min",
    "underscore": "components/underscore/underscore",
    // Modernizr
    "Modernizr": "components/modernizr/src/Modernizr",
    "addTest": "components/modernizr/src/addTest",
    "ModernizrProto": "components/modernizr/src/ModernizrProto",
    "setClasses": "components/modernizr/src/setClasses",
    "hasOwnProp": "components/modernizr/src/hasOwnProp",
    "tests": "components/modernizr/src/tests",
    "is": "components/modernizr/src/is",
    "docElement": "components/modernizr/src/docElement",
    "feature-detects": "components/modernizr/feature-detects"
  }
});