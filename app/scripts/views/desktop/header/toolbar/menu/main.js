/**
 * Created with WebStorm.
 * Name: main.js
 * User: ThànhCông
 * Date: 9/25/2014
 * Time: 3:25 PM
 */

/*global define*/
define(
    ['jquery', 'underscore', 'backbone', 'facade', 'text!templates/desktop/header/toolbar/menu/base.html', 'models/info', 'events'],
    function ($, _, Backbone, facade, baseTemplate, InfoModel, Events) {
        var View = Backbone.View.extend({
            template: _.template(baseTemplate),

            initialize: function () {
                facade.subscribe('Viewer:resize', 'render', this.render, this);
            },

            //region Function
            render: function () {
                var template = this.template({
                    Model: {
                        chapters: InfoModel.getChaptersModel()
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
                Events.addListener('click', this.$('.table-of-contents'), this.handleTableOfContentClick, this)
            },
            //endregion

            //region Handle events
            handleTableOfContentClick: function (e) {
                e.stopPropagation();
            }
            //endregion
        });

        return View;
    });