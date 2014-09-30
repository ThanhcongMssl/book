/**
 * Created with WebStorm.
 * Name: main.js
 * User: ThànhCông
 * Date: 9/25/2014
 * Time: 3:22 PM
 */

/*global define*/
define (
    ['jquery', 'underscore', 'backbone', 'facade', 'text!templates/desktop/header/toolbar/base.html', './menu/main', './highlight/main', './text/main', './option/main', 'events'],
    function($, _, Backbone, facade, baseTemplate, MenuTool, HighlightTool, TextTool, OptionTool, Events){
    var View = Backbone.View.extend({
        template: _.template(baseTemplate),

        initialize : function(){
           this.render();
        },

        render : function(){
            var template = this.template();
            this.$el.html(template);

            this.initComponents();
            this.bindEvents();

            return this;
        },

        initComponents : function(){
            this.addItem(MenuTool);
            this.addItem(TextTool);
            this.addItem(OptionTool);
        },

        addItem : function(Class){
            var $item = $('<li class="toolbar-item">');
            this.$el.append($item);
            new Class({
                el: $item
            });
        },

        bindEvents: function(){
            Events.addListener('click', this.$('.toolbar-item'), this.handleToolbarItemClick, this);
        },

        //region Handle events
        handleToolbarItemClick : function(e){
            var $currentTarget = this.$(e.currentTarget);
            if($currentTarget.hasClass('visible')){
                $currentTarget.removeClass('visible');
                facade.publish('Toolbar:close');
            } else {
                this.$('.toolbar-item').removeClass('visible');
                $currentTarget.addClass('visible');
                facade.publish('Toolbar:open');
            }
        }
        //endregion

    });

    return View;
});