/**
 * Created with WebStorm.
 * Name: permissions.js
 * User: ThànhCông
 * Date: 1/3/14
 * Time: 5:32 PM
 */

/* global define */
define([], function(){
    'use strict';

    var permissions = {},
        rules = {
            'fetchDataSuccess':{
                'bindData' : true
            }
        },
        allowAll = true;

    permissions.validate = function(channel, subscriber){
        if (!allowAll){
            var test = rules[channel][subscriber];
            return test === undefined ? false : test;
        }
        else{
            return true;
        }
    };

    return permissions;
});
