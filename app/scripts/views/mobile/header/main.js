/**
 * Created with WebStorm.
 * Name: main.js
 * User: ThànhCông
 * Date: 9/25/2014
 * Time: 9:42 AM
 */

/*global define*/
define (
    ['jquery', 'underscore', 'backbone', 'facade', 'events', 'text!templates/mobile/header/base.html', './toolbar/main'],
    function($, _, Backbone, facade, Events, baseTemplate, ToolbarView){
    var View = Backbone.View.extend({
        template: _.template(baseTemplate),

        initialize: function () {
            this.render();
        },

        render: function(){
            var template = this.template();
            this.$el.html(template);

            this.initComponents();
            this.bindEvents();

            return this;
        },

        initComponents: function(){
            new ToolbarView({
                el: this.$('.toolbar')
            });
        },

        bindEvents : function(){
            Events.addListener('mouseenter', this.$el, this.handleHeaderHover, this);
            Events.addListener('click', this.$('.menu-toggle'), this.handleMenuToggle, this);
        },

        //region Handle events
        handleHeaderHover: function () {
            facade.publish('Read:stop');
        },

        handleMenuToggle : function(){
            facade.publish('Menu:toggle');
        }
        //endregion
    });

    return View;
});