/**
 * Created with WebStorm.
 * Name: main.js
 * User: ThànhCông
 * Date: 9/25/2014
 * Time: 3:25 PM
 */

/*global define*/
define(
    ['jquery', 'underscore', 'backbone', 'facade', 'text!templates/desktop/header/toolbar/menu/base.html', 'models/user', 'events', 'slimScroll'],
    function ($, _, Backbone, facade, baseTemplate, UserModel, Events, slimScroll) {
        var View = Backbone.View.extend({
            template: _.template(baseTemplate),

            initialize: function () {
                facade.subscribe('Viewer:resize', 'render', this.render, this);
            },

            //region Function
            render: function () {
                var template = this.template({
                    Model: {
                        chapters: UserModel.getChaptersModel()
                    }
                });
                this.$el.html(template);
                this.$el.addClass('menu');

                this.initComponents();
                this.bindEvents();

                return this;
            },

            initComponents: function () {
                this.$('.slim-el').slimScroll({
                    height: 354
                });
            },

            bindEvents: function () {
                Events.addListener('click', this.$('.table-of-contents'), this.handleTableOfContentClick, this);
                Events.addListener('click', this.$('.chapter-list-item'), this.handleChapterListItemClick, this);
            },
            //endregion

            //region Handle events
            handleTableOfContentClick: function (e) {
                e.stopPropagation();
            },

            handleChapterListItemClick: function (e) {
                var $currentTarget = this.$(e.currentTarget),
                    id = $currentTarget.attr('data-id');

                facade.publish('Navigation:change', {
                    ID: id
                });

                facade.publish('Toolbar:close');
            }
            //endregion
        });

        return View;
    });