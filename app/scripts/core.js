/**
 * Created with WebStorm.
 * Name: core.js
 * User: ThànhCông
 * Date: 9/23/2014
 * Time: 11:59 AM
 */

/* global define */
define (['backbone'], function(Backbone){
    'use strict';

    console.log(Backbone);

    var self = function(){
        this.name = 'troy';
    };

    return self;
});