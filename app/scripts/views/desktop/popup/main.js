/**
 * Created with WebStorm.
 * Name: main.js
 * User: ThànhCông
 * Date: 10/3/2014
 * Time: 8:38 PM
 */

'use strict';

define (
    ['jquery', 'underscore', 'backbone', 'facade', 'text!templates/desktop/popup/base.html', './login/main', './notify/main', 'events'],
    function($, _, Backbone, facade, baseTemplate, Login, Notify, Events){
    var View = Backbone.View.extend({
        template: _.template(baseTemplate),

        initialize : function(){
            facade.subscribe('Popup:rendered', 'active popup', this.show, this);
            this.render();
        },

        //region Function
        render : function(){
            var template = this.template();
            this.$el.html(template);
            this.$el.addClass('hidden');

            this.initComponents();
            this.bindEvents();

            return this;
        },

        initComponents: function () {
            var $popup = this.$('.popup-el');

            new Login({
                el: $popup
            });

            new Notify({
                el: $popup
            });
        },

        bindEvents: function(){
            Events.addListener('click', this.$('.close'), this.hide, this);
        },
        //endregion

        //region Method
        show: function(){
            this.$el.removeClass('hidden');
        },

        hide: function(){
            this.$el.addClass('hidden');
        }
        //endregion
    });

    return View;
});