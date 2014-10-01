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
            Events.addListener('click', this.$('.bookmark'), this.handleBookmarkClick, this);
        },
        //endregion

        //region Handle events
        handleBookmarkClick: function(){
            var id = UserModel.get('currentID'),
                chapter = InfoModel.getChapterById(id);
            var bookmark = {};
            bookmark.id = id;
            bookmark.title = chapter.title;
            bookmark.date = DateFormat.format(new Date());
            UserModel.get('bookmark').push(bookmark);
        }
        //endregion
    });

    return View;
});