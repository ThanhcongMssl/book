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
        backbone:{
            exports: 'Backbone'
        },
        powerange: {
            exports: 'Powerange'
        },
        slimScroll:{
            exports: 'slimScroll',
            deps: ['jquery']
        }
    },
    paths: {
        facade: 'aura/facade',
        mediator: 'aura/mediator',
        permissions: 'aura/permissions',
        utility: 'utility',
        events: 'utility/events',
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash',
        text: '../bower_components/requirejs-text/text',
        powerange: '../bower_components/powerange/dist/powerange.min',
        hammerjs: '../bower_components/hammerjs/hammer.min',
        slimScroll: 'vendor/slimScroll/jquery.slimscroll.min'
    }
});

require(
    ['jquery', 'events', 'models/book', 'models/view', './views/mobile/main'],
    function ($, Events, BookModel, ViewModel, App){
        var bookID = $('#bookID').val();
        BookModel.set({
            bookID: bookID
        });
        ViewModel.set({
            bookID: bookID
        });
        Events.config({
            device: 'mobile'
        });
        return new App({
            el: '#app'
        });
    });
