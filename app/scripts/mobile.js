/**
 * Created with WebStorm.
 * Name: require-config.js
 * User: ThànhCông
 * Date: 9/24/2014
 * Time: 5:32 PM
 */

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

require(['event', './views/mobile/main'], function (Event, App){
    Event.config({

    });
    return new App({
        el: 'app'
    });
});