/*global require*/
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
        slimScroll: 'vendor/slimScroll/jquery.slimscroll.min'
    }
});

require(
    ['jquery', './views/desktop/main', 'models/book', 'models/view'],
    function ($, App, BookModel, ViewModel){
    var bookID = $('#bookID').val();
    BookModel.set({
        bookID: bookID
    });
    ViewModel.set({
        bookID: bookID
    });
    return new App({
        el: '#app'
    });
});
