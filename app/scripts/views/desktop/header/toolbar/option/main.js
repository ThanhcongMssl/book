/**
 * Created with WebStorm.
 * Name: main.js
 * User: ThànhCông
 * Date: 9/25/2014
 * Time: 3:25 PM
 */

/*global define*/
define (['jquery', 'underscore', 'backbone', 'facade', 'text!templates/desktop/header/toolbar/option/base.html', './search/main', './highlight/main', './bookmark/main', './share/main', './library/main', 'events'],
    function($, _, Backbone, facade, baseTemplate, SearchView, HighlightView, BookmarkView, ShareView, LibraryView, Events){
    var View = Backbone.View.extend({
        template: _.template(baseTemplate),

        initialize : function(){
            this.render();
        },

        //region Function
        render : function(){
            var template = this.template();
            this.$el.html(template);
            this.$el.addClass('option');

            this.initComponents();
            this.bindEvents();

            return this;
        },

        initComponents : function(){
//            this.addItem(SearchView);
//            this.addItem(HighlightView);
            this.addItem(BookmarkView);
            this.addItem(ShareView);
            this.addItem(LibraryView);
        },

        bindEvents: function () {
            Events.addListener('click', this.$('.list-option'), this.handleListOptionClick, this);
        },
        //endregion

        //region Method
        addItem: function(Item){
            var $item = $('<li>');
            this.$('.list-option').append($item);
            new Item({
                el: this.$($item)
            });
        },
        //endregion

        //region Handle events
        handleListOptionClick: function (e) {
            e.stopPropagation()
        }
        //endregion
    });

    return View;
});