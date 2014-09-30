/**
 * Created with WebStorm.
 * Name: event.js
 * User: ThànhCông
 * Date: 9/24/2014
 * Time: 4:19 PM
 */

/* global define */
define (['jquery', 'underscore'], function($, _){
    'use strict';

    var Events = function(){

    };

    Events.prototype = {
        addListener: function(type, target, listener, context){
            var fn = context ? _.bind(listener, context) : listener;
            this.query(target).on(type, fn);
        },

        removeListener: function(type, target, listener, context){
            var fn = context ? _.bind(listener, context) : listener;
            this.query(target).off(type, fn);
        },

        query: function(target){
            return $(target);
        }
    };

    return new Events;
});