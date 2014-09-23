/*global require*/
'use strict';

require.config({
    shim: {
        'handlebars': {
            exports: 'Handlebars'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash',
        text: '../bower_components/requirejs-text/text',
        handlebars: '../bower_components/handlebars/handlebars.runtime'
    }
});

require([
    'backbone', './core'
], function (Backbone, Core) {
    Backbone.history.start();
    new Core();
});
