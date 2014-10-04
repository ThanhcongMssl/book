/**
 * Created with WebStorm.
 * Name: main.js
 * User: ThànhCông
 * Date: 9/25/2014
 * Time: 3:25 PM
 */

/*global define*/
define(
    ['jquery', 'underscore', 'backbone', 'facade', 'text!templates/mobile/list/menu/base.html', 'models/user', 'events'],
    function ($, _, Backbone, facade, baseTemplate, UserModel, Events) {
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

                this.initComponents();
                this.bindEvents();

                return this;
            },

            initComponents: function () {

            },

            bindEvents: function () {
                Events.addListener('click', this.$('.chapter-list-item'), this.handleChapterListItemClick, this);
            },
            //endregion

            //region Handle events

            handleChapterListItemClick: function (e) {
                var $currentTarget = this.$(e.currentTarget),
                    id = $currentTarget.attr('data-id');

                facade.publish('Navigation:change', {
                    ID: id
                });

                facade.publish('Menu:close');
            }
            //endregion
        });

        return View;
    });