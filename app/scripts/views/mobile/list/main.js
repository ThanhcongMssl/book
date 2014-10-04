/**
 * Created with WebStorm.
 * Name: main.js
 * User: ThànhCông
 * Date: 10/4/2014
 * Time: 9:06 AM
 */

'use strict';

define (
    ['jquery', 'underscore', 'backbone', 'facade', 'text!templates/mobile/list/base.html', 'events', './menu/main', './bookmark/main'],
    function($, _, Backbone, facade, baseTemplate, Events, Menu, Bookmark){
    var View = Backbone.View.extend({
        template: _.template(baseTemplate),

        initialize : function(){
            facade.subscribe('Menu:toggle', 'toggle', this.toggle, this);
            facade.subscribe('Menu:close', 'toggle', this.hide, this);

            this.render();
        },

        //region Function
        render : function(){
            var template = this.template();
            this.$el.html(template);

            this.initComponents();
            this.bindEvents();

            return this;
        },

        initComponents : function(){
            new Menu({
                el: this.$('.table-of-content')
            });
            new Bookmark({
                el: this.$('.bookmark-list')
            });
        },

        bindEvents: function () {
            Events.addListener('click', this.$('.tab'), this.handleTabClick, this);
        },
        //endregion

        //region Method
        toggle: function(){
            if (this.$el.hasClass('visible')){
                this.$el.removeClass('visible');
            } else {
                this.$el.addClass('visible');
            }
        },

        hide: function(){
            this.$el.removeClass('visible');
        },
        //endregion

        //region Handle events
        handleTabClick : function(e){
            var $currentTarget = this.$(e.currentTarget),
                content = $currentTarget.attr('data-content');
            this.$('.tab').removeClass('active');
            $currentTarget.addClass('active');

            this.$('.content').removeClass('visible');
            this.$(content).addClass('visible');
        }
        //end
    });

    return View;
});