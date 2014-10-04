/*global require*/
'use strict';

require.config({
    shim: {
        jquery: {
            exports: '$'
        },
        underscore: {
            exports: '_'
        },
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
    ['jquery', 'events', 'models/book', 'models/view', './views/desktop/main'],
    function ($, Events, BookModel, ViewModel, App){
    var bookID = $('#bookID').val();
    BookModel.set({
        bookID: bookID
    });
    ViewModel.set({
        bookID: bookID
    });
    Events.config({
        device: 'desktop'
    });
    return new App({
        el: '#app'
    });
});
