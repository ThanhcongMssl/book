/**
 * Created with WebStorm.
 * Name: event.js
 * User: ThànhCông
 * Date: 9/24/2014
 * Time: 4:19 PM
 */

/* global define */
define (['jquery', 'underscore', 'hammerjs'], function($, _, Hammer){
    'use strict';

    var Desktop = function(){
    };

    Desktop.prototype = {
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

    var Mobile = function(){
    };

    Mobile.prototype = {
        __transform: {
            'click': 'tap'
        },

        addListener: function(type, target, listener, context){
            var fn = context ? _.bind(listener, context) : listener;
            fn = _.wrap(fn, function(func, arg){
                func(arg.srcEvent, arg);
            });
            type = this.__transform[type] || type;
            var $target = this.query(target);
            for(var i = 0, length = $target.length; i < length; i++){
                $target[i].on(type, fn);
            }
        },

        removeListener: function(type, target, listener, context){
            var fn = context ? _.bind(listener, context) : listener;
            fn = _.wrap(fn, function(func, arg){
                func(arg.srcEvent, arg);
            });
            type = this.__transform[type] || type;
            var $target = this.query(target);
            for(var i = 0, length = $target.length; i < length; i++){
                $target[i].off(type, fn);
            }
        },

        query: function(target){
            var $query = [],
                $target = $(target);
            for(var i = 0, length = $target.length; i < length; i++){
                var el = $target[i] || document.createElement('span');
                $query.push(new Hammer(el))
            }
            return $query;
        }
    };

    var Primitive = function(){

    };

    Primitive.prototype = {
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

    var Events = function(){
        this.initizlize();

        this.__components = {
            desktop: new Desktop(),
            mobile: new Mobile(),
            primitive: new Primitive()
        }
    };

    Events.prototype = {
        initizlize : function(){
            this.__config = {
                device : 'desktop'
            }
        },

        config: function(options){
            this.__config = options;
        },

        addListener: function(type, target, listener, context, primitive){
            if (primitive){
                this.__components['primitive'].addListener(type, target, listener, context);
            } else {
                this.__components[this.__config.device].addListener(type, target, listener, context);
            }
        },

        removeListener: function(type, target, listener, context, primitive){
            if (primitive){
                this.__components['primitive'].addListener(type, target, listener, context);
            } else {
                this.__components[this.__config.device].addListener(type, target, listener, context);
            }
        }
    };

    return new Events();
});