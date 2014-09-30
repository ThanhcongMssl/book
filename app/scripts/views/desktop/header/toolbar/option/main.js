/**
 * Created with WebStorm.
 * Name: main.js
 * User: ThànhCông
 * Date: 9/25/2014
 * Time: 3:25 PM
 */

/*global define*/
define (['jquery', 'underscore', 'backbone', 'facade', 'text!templates/desktop/header/toolbar/option/base.html', './search/main', './highlight/main', './bookmark/main', './share/main', './library/main'],
    function($, _, Backbone, facade, baseTemplate, SearchView, HighlightView, BookmarkView, ShareView, LibraryView){
    var View = Backbone.View.extend({
        template: _.template(baseTemplate),

        initialize : function(){
            this.render();
        },

        render : function(){
            var template = this.template();
            this.$el.html(template);

            this.initComponents();

            return this;
        },

        initComponents : function(){
            new SearchView({
                el: this.$('.search')
            });
            new HighlightView({
                el: this.$('.highlight')
            });
            new BookmarkView({
                el: this.$('.bookmark')
            });
            new ShareView({
                el: this.$('.share')
            });
            new LibraryView({
                el: this.$('.library')
            });
        }
    });

    return View;
});