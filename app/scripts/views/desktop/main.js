/**
 * Created with WebStorm.
 * Name: main.js
 * User: ThànhCông
 * Date: 9/24/2014
 * Time: 5:51 PM
 */
'use strict';

/*global define*/
define(
    ['jquery', 'underscore', 'backbone', 'facade', 'text!templates/desktop/base.html', './header/main', './footer/main', './content/main', './popup/main', 'models/book', 'models/user', 'utility/keyboard'],
    function ($, _, Backbone, facade, baseTemplate, Header, Footer, Content, Popup, BookModel, UserModel, Keyboard) {

        var View = Backbone.View.extend({
            template: _.template(baseTemplate),

            initialize: function () {
                this.subscribe();
                BookModel.fetchData();
            },

            //region Function
            subscribe: function(){
                facade.subscribe('BookModel:fetch-data-successed', 'render', this.render, this);
                facade.subscribe('Read:start', 'start', this.startReadMode, this);
                facade.subscribe('Read:stop', 'stop', this.stopReadMode, this);
                facade.subscribe('Read:toggle', 'toggle', this.toggleReadMode, this);
                facade.subscribe('Font:change-color', 'change background color', this.changeBackgroundColor, this);
                facade.subscribe('Layout:change', 'change layout', this.changeLayout, this);
                facade.subscribe('Ajax:loading', 'show loading', this.showLoading, this);
                facade.subscribe('Ajax:loaded', 'hide loading', this.hideLoading, this);
            },

            render: function(){
                var template = this.template();
                this.$el.html(template);

                this.initComponents();
                this.backUpUserModel();
                this.bindEvents();

                return this;
            },

            initComponents: function(){
                new Header({
                    el: this.$('header')
                });
                new Content({
                    el: this.$('#content')
                });
                new Footer({
                    el: this.$('footer')
                });
                new Popup({
                    el: this.$('#popup')
                });
            },

            backUpUserModel : function(){
                this.$el.addClass(UserModel.get('layout'));
                this.$el.addClass(UserModel.get('backgroundColor'));
            },

            bindEvents: function(){

            },
            //endregion

            //region Method
            startReadMode: function(){
                this.$el.addClass('read');
            },

            stopReadMode : function(){
                this.$el.removeClass('read');
            },

            toggleReadMode : function(){
                if(this.$el.hasClass('read')){
                    this.$el.removeClass('read');
                } else {
                    this.$el.addClass('read');
                }
            },

            changeBackgroundColor: function(options){
                var color = options.color;
                this.$el.removeClass('White Sepia Night');
                this.$el.addClass(color);
            },

            changeLayout : function(options){
                var layout = options.layout;
                this.$el.removeClass('one-page two-page');
                this.$el.addClass(layout);
            },

            showLoading : function(){
                this.$('#loading').removeClass('off');
            },

            hideLoading: function(){
                this.$('#loading').addClass('off');
            }
            //endregion

            //region Handle events

            //endregion
        });

        return View;
    });