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
    ['jquery', 'underscore', 'backbone', 'facade', 'text!templates/desktop/base.html', './header/main', './footer/main', './content/main', 'models/book'],
    function ($, _, Backbone, facade, baseTemplate, Header, Footer, Content, BookModel) {

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
            },

            render: function(){
                var template = this.template();
                this.$el.html(template);

                this.initComponents();

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
                this.$el.removeClass();
                this.$el.addClass(color);
            }
            //endregion
        });

        return View;
    });