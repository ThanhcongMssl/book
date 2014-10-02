/**
 * Created with WebStorm.
 * Name: main.js
 * User: ThànhCông
 * Date: 9/25/2014
 * Time: 9:13 PM
 */

/*global define*/
define (
    ['jquery', 'underscore', 'backbone', 'facade', 'text!templates/desktop/header/toolbar/option/bookmark/base.html', 'models/user', 'events', 'slimScroll'],
    function($, _, Backbone, facade, baseTemplate, UserModel, Events, slimScroll){
    var View = Backbone.View.extend({
        template: _.template(baseTemplate),

        initialize : function(){
            facade.subscribe('Viewer:resize', 'render', this.render, this);
        },

        //region Fucntion
        render : function(){
            var template = this.template({
                Model: {
                    bookmarks: UserModel.getBookmarksModel()
                }
            });
            this.$el.html(template);

            this.initComponents();
            this.bindEvents();

            return this;
        },

        initComponents : function(){
            this.$('.slim-el').slimScroll({
                height: 354
            });
        },

        bindEvents: function () {
            Events.addListener('click', this.$('.bookmark-list-item'), this.handleBookmarkListItemClick, this);
        },
        //endregion

        //region Handle events
        handleBookmarkListItemClick: function (e) {
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