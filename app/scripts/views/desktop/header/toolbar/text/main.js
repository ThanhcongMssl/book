/**
 * Created with WebStorm.
 * Name: main.js
 * User: ThànhCông
 * Date: 9/25/2014
 * Time: 3:25 PM
 */

/*global define*/
define (
    ['jquery', 'underscore', 'backbone', 'facade', 'events', 'models/user', 'text!templates/desktop/header/toolbar/text/base.html'],
    function($, _, Backbone, facade, Events, UserModel, baseTemplate){
    var View = Backbone.View.extend({
        template: _.template(baseTemplate),

        initialize : function(){
            facade.subscribe('Viewer:resize', 'render', this.render, this);
        },

        //region Function
        render : function(){
            var template = this.template({
                Model: {
                    fontStyle: UserModel.get('fontFamily'),
                    fontSize: UserModel.get('fontSize'),
                    color: UserModel.get('backgroundColor'),
                    layout: UserModel.get('layout')
                }
            });
            this.$el.html(template);

            this.initComponents();
            this.bindEvents();

            return this;
        },

        initComponents : function(){

        },

        bindEvents: function(){
            Events.addListener('click', this.$('.text-action'), this.handleTextActionClick, this);
            Events.addListener('click', this.$('.increase-size'), this.handleIncreaseSizeClick, this);
            Events.addListener('click', this.$('.decrease-size'), this.handleDecreaseSizeClick, this);
            Events.addListener('change', this.$('.font-family'), this.handleFontStyleChange, this);
            Events.addListener('click', this.$('.background-color'), this.handleBackgroundColorChange, this);
            Events.addListener('click', this.$('.layout-mode'), this.handleLayoutModeClick, this);
        },
        //endregion

        //region Handle events
        handleTextActionClick: function (e) {
            e.stopPropagation();
        },

        handleIncreaseSizeClick : function(){
            var fontSize = UserModel.get('fontSize');
            UserModel.set('fontSize', ++fontSize);
            facade.publish('Font:change-size', {
                size: fontSize
            });
            return false;
        },

        handleDecreaseSizeClick : function(){
            var fontSize = UserModel.get('fontSize');
            UserModel.set('fontSize', --fontSize);
            facade.publish('Font:change-size', {
                size: fontSize
            });
            return false;
        },

        handleFontStyleChange : function(){
            var fontStyle = this.$('.font-family').val();
            UserModel.set('fontFamily', fontStyle);
            facade.publish('Font:change-style', {
                style: fontStyle
            });
        },

        handleBackgroundColorChange : function(e){
            var $currentTarget = this.$(e.currentTarget),
                color = $currentTarget.attr('data-color');
            this.$('.background-color').removeClass('active');
            $currentTarget.addClass('active');
            UserModel.set('backgroundColor', color);
            facade.publish('Font:change-color', {
                color: color
            });
        },

        handleLayoutModeClick : function(e){
            var $currentTarget = this.$(e.currentTarget),
                layout = $currentTarget.attr('data-layout');
            this.$('.layout-mode').removeClass('bt-active');
            $currentTarget.addClass('bt-active');

            UserModel.set('layout', layout);
            facade.publish('Layout:change', {
                layout: layout
            });

            return false;
        }
        //endregion
    });

    return View;
});