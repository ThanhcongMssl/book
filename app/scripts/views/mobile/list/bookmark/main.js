/**
 * Created with WebStorm.
 * Name: main.js
 * User: ThànhCông
 * Date: 9/25/2014
 * Time: 9:13 PM
 */

/*global define*/
define (
    ['jquery', 'underscore', 'backbone', 'facade', 'text!templates/mobile/list/bookmark/base.html', 'models/user', 'events'],
    function($, _, Backbone, facade, baseTemplate, UserModel, Events){
    var View = Backbone.View.extend({
        template: _.template(baseTemplate),

        initialize : function(){
            facade.subscribe('Viewer:resize', 'render', this.render, this);
            facade.subscribe('Bookmark:change', 'render', this.render, this);
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

            facade.publish('Menu:close');
        }
        //endregion
    });

    return View;
});