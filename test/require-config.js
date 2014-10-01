/**
 * Created with WebStorm.
 * Name: require-config.js
 * User: ThànhCông
 * Date: 9/23/2014
 * Time: 5:02 PM
 */

/*global define*/
require.config({
    baseUrl: '/app/scripts',
    shim: {
        backbone:{
            exports: 'Backbone'
        },
        powerange: {
            exports: 'Powerange'
        }
    },
    paths: {
        spec: '../../test/spec',
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash',
        text: '../bower_components/requirejs-text/text',
        powerange: '../bower_components/powerange/dist/powerange.min',
        facade: 'aura/facade',
        mediator: 'aura/mediator',
        permissions: 'aura/permissions',
        utility: 'utility',
        events: 'utility/events'
    }
});
