/**
 * Created with WebStorm.
 * Name: main.js
 * User: ThànhCông
 * Date: 9/25/2014
 * Time: 3:25 PM
 */

/*global define*/
define (
    ['jquery', 'underscore', 'backbone', 'facade', 'text!templates/desktop/header/bookmark/base.html', 'models/info', 'models/user', 'events', 'utility/date'],
    function($, _, Backbone, facade, baseTemplate, InfoModel, UserModel, Events, DateFormat){
    var View = Backbone.View.extend({
        template: _.template(baseTemplate),

        initialize : function(){
            facade.subscribe('Viewer:check-in', 'check bookmark', this.checkBookmark, this);
            this.render();
        },

        //region Function
        render : function(){
            var template = this.template();
            this.$el.html(template);

            this.initComponents();
            this.bindEvents();

            return this;
        },

        initComponents : function(){

        },

        bindEvents: function () {
            Events.addListener('click', this.$('.bookmark-btn'), this.handleBookmarkClick, this);
        },
        //endregion

        //region Method
        checkBookmark: function(){
            var $bookmarkButton = this.$('.bookmark-btn');
            if (UserModel.checkBookmark()){
                $bookmarkButton.addClass('bookmarked');
            } else {
                $bookmarkButton.removeClass('bookmarked');
            }
        },
        //endregion

        //region Handle events
        handleBookmarkClick: function(e){
            var $currentTartget = this.$(e.currentTarget);

            var bookmark,
                bookmarks = UserModel.get('bookmark');
            if ($currentTartget.hasClass('bookmarked')){
                $currentTartget.removeClass('bookmarked');
                bookmark = UserModel.checkBookmark();
                UserModel.set('bookmark', _.without(bookmarks, bookmark));
            } else {
                var id = UserModel.get('currentID'),
                    chapter = InfoModel.getChapterById(id);
                bookmark = {};
                bookmark.id = id;
                bookmark.title = chapter.title;
                bookmark.date = DateFormat.format(new Date());
                bookmarks.push(bookmark);

                $currentTartget.addClass('bookmarked');
            }
        }
        //endregion


    });

    return View;
});