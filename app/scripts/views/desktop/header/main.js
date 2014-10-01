/**
 * Created with WebStorm.
 * Name: main.js
 * User: ThànhCông
 * Date: 9/25/2014
 * Time: 9:42 AM
 */

/*global define*/
define (
    ['jquery', 'underscore', 'backbone', 'facade', 'events', 'text!templates/desktop/header/base.html', './toolbar/main', './bookmark/main'],
    function($, _, Backbone, facade, Events, baseTemplate, ToolbarView, BookmarkView){
    var View = Backbone.View.extend({
        template: _.template(baseTemplate),

        initialize: function () {
            this.render();
        },

        render: function(){
            var template = this.template();
            this.$el.html(template);

            this.initComponents();
            this.bindEvents();

            return this;
        },

        initComponents: function(){
            new ToolbarView({
                el: this.$('.toolbar')
            });
            new BookmarkView({
                el: this.$('.bookmark')
            });
        },

        bindEvents : function(){
            Events.addListener('mouseover', this.$el, this.handleHeaderHover, this);
        },

        //region Handle events
        handleHeaderHover: function () {
            facade.publish('Read:stop');
        }
        //endregion

    });

    return View;
});