/**
 * Created with WebStorm.
 * Name: main.js
 * User: ThànhCông
 * Date: 9/25/2014
 * Time: 3:25 PM
 */

/*global define*/
define (
    ['jquery', 'underscore', 'backbone', 'facade', 'text!templates/mobile/content/bookmark/base.html', 'models/info', 'models/user', 'events', 'utility/date', 'utility/login-filter', 'models/book'],
    function($, _, Backbone, facade, baseTemplate, InfoModel, UserModel, Events, DateFormat, LoginFilter, BookModel){
    var View = Backbone.View.extend({
        template: _.template(baseTemplate),

        initialize : function(){
            facade.subscribe('Viewer:check-in', 'check bookmark', this.checkBookmark, this);
            facade.subscribe('Popup:login-render', 'alert', this.confirmLogin, this);

            new LoginFilter(this, [
                'handleBookmarkClick'
            ]);

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
            Events.addListener('click', this.$el, this.handleBookmarkClick, this);
        },
        //endregion

        //region Method
        checkBookmark: function(){
            if (UserModel.checkBookmark()){
                this.$el.addClass('bookmarked');
            } else {
                this.$el.removeClass('bookmarked');
            }
        },

        confirmLogin: function() {
            var result = confirm('Bạn có muốn đăng nhập để đánh dấu không?');
            if (result) {
                location.href = '/Account/Signin?returnurl=' + BookModel.get('bookLink');
            }
        },
        //endregion

        //region Handle events
        handleBookmarkClick: function(){
            var bookmark,
                bookmarks = UserModel.get('bookmark');
            if (this.$el.hasClass('bookmarked')){
                this.$el.removeClass('bookmarked');
                bookmark = UserModel.checkBookmark();
                UserModel.set('bookmark', _.without(bookmarks, bookmark));
            } else {
                var id = UserModel.get('currentID'),
                    chapter = InfoModel.getChapterById(id);
                bookmark = {};
                bookmark.id = id;
                bookmark.title = chapter.title;
                bookmark.date = DateFormat.format(new Date(), 'server');
                bookmarks.push(bookmark);
                UserModel.set('bookmark', bookmarks);
                UserModel.trigger('change:bookmark');

                this.$el.addClass('bookmarked');
            }
            facade.publish('Bookmark:change');
        }
        //endregion
    });

    return View;
});