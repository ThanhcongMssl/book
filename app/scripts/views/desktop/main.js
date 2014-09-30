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
                facade.subscribe('BookModel:fetch-data-successed', 'render', this.render, this);

                BookModel.fetchData();
            },

            //region Function
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
            }
            //endregion
        });

        return View;
    });