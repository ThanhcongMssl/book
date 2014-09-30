/**
 * Created with WebStorm.
 * Name: main.js
 * User: ThànhCông
 * Date: 9/25/2014
 * Time: 3:22 PM
 */

/*global define*/
define (
    ['jquery', 'underscore', 'backbone', 'facade', 'text!templates/desktop/header/toolbar/base.html', './menu/main', './highlight/main', './text/main', './bookmark/main', './option/main'],
    function($, _, Backbone, facade, baseTemplate, MenuTool, HighlightTool, TextTool, BookmarkTool, OptionTool){
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
            new MenuTool({
                el: this.$('.menu-tool')
            });
            new HighlightTool({
                el: this.$('.highlight-tool')
            });
            new TextTool({
                el: this.$('.text-tool')
            });
            new BookmarkTool({
                el: this.$('.bookmark-tool')
            });
            new OptionTool({
                el: this.$('.option-tool')
            });
        }
    });

    return View;
});