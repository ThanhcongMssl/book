/**
 * Created with WebStorm.
 * Name: mediator.js
 * User: ThànhCông
 * Date: 1/2/14
 * Time: 5:02 PM
 */

/* global define */
define([], function(){
    'use strict';

    var subscribe = function(channel, fn, context){
            context = context || this;
            if (!this.channels[channel]){
                this.channels[channel] = [];
            }
            this.channels[channel].push({ context: context, callback: fn});
            return this;
        },

        publish = function(channel){
            if (!this.channels[channel]){
                return false;
            }
            var args = Array.prototype.slice.call(arguments, 1);
            for (var i = 0, l = this.channels[channel].length; i < l; i++){
                var subscription = this.channels[channel][i];
                subscription.callback.apply(subscription.context, args);
            }
            return this;
        };

    return {
        channels : {},
        subscribe : subscribe,
        publish: publish,
        installTo : function(o){
            o.channels = {};
            o.subscribe = subscribe;
            o.publish = publish;
        }
    };
});