/**
 * Created with WebStorm.
 * Name: main.js
 * User: ThànhCông
 * Date: 10/3/2014
 * Time: 8:47 PM
 */

'use strict';

define (['jquery', 'underscore', 'backbone', 'facade', 'text!templates/desktop/popup/login/base.html'], function($, _, Backbone, facade, baseTemplate){
    var View = Backbone.View.extend({
        template: _.template(baseTemplate),

        initialize : function(){
            facade.subscribe('Popup:login-render', 'render', this.render, this);
        },

        render : function(){
            var template = this.template({
                Model: {
                    url: encodeURI(document.URL)
                }
            });
            this.$el.html(template);
            facade.publish('Popup:rendered');

            return this;
        }
    });

    return View;
});