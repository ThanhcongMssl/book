/**
 * Created with WebStorm.
 * Name: require-config.js
 * User: ThànhCông
 * Date: 9/23/2014
 * Time: 5:02 PM
 */

/*global requirejs */
require.config({
    shim: {
        'handlebars': {
            exports: 'Handlebars'
        },
        'backbone':{
            exports: 'Backbone'
        }
    },
    paths: {
        app: 'app',
        jquery: 'app/bower_components/jquery/dist/jquery',
        backbone: 'app/bower_components/backbone/backbone',
        underscore: 'app/bower_components/lodash/dist/lodash',
        text: 'app/bower_components/requirejs-text/text',
        handlebars: 'app/bower_components/handlebars/handlebars'
    }
});
