/**
 * Created with WebStorm.
 * Name: social.js
 * User: ThànhCông
 * Date: 10/3/2014
 * Time: 10:11 PM
 */

'use strict';

/*global define*/
define([], function () {
    var Social = function () {
        this.__components = {
            'facebook': this.shareFacebook,
            'google': this.shareGoogle,
            'twitter': this.shareTwitter
        };
    };

    var openPopup = function(link){
        var myWindow = window.open(link, '_blank', 'height=400,width=600,toolbar=0,menubar=0');
        myWindow.moveTo(100,100);
    };

    Social.prototype = {
        share: function (url, type) {
            type = type || 'facebook';

            this.__components[type](url);
        },

        shareFacebook: function(url){
            var link = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
            openPopup(link);
        },

        shareGoogle: function(url){
            var link = 'https://plus.google.com/share?url=' + url;
            openPopup(link);
        },

        shareTwitter: function(url){
            var link = 'https://twitter.com/home?status=' + url;
            openPopup(link);
        }
    };

    return new Social();
});