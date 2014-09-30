/**
 * Created with WebStorm.
 * Name: facade.js
 * User: ThànhCông
 * Date: 1/3/14
 * Time: 5:24 PM
 */

/* global define */
define(['mediator', 'permissions'], function(mediator, permissions){
    'use strict';

    var facade = {};

    facade.subscribe = function(channel, subscriber, callback, context){
        if (permissions.validate(channel, subscriber)){
            mediator.subscribe(channel, callback, context || this);
        }
    };

    facade.publish = function(){
        mediator.publish.apply(mediator, arguments);
    };

    return facade;
});

