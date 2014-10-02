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
            facade.subscribe('Toolbar:close', 'hideToolbarContent', this.hideToolbarContent, this);

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
            this.addItem(TextTool);
            this.addItem(MenuTool);
            this.addItem(OptionTool);
        },

        bindEvents: function(){
            Events.addListener('click', this.$('.toolbar-item'), this.handleToolbarItemClick, this);
        },
        //endregion

        //region Method
        addItem : function(Class){
            var $item = $('<li class="toolbar-item">');
            this.$el.append($item);
            new Class({
                el: $item
            });
        },


        hideToolbarContent : function(){
            this.$('.toolbar-item').removeClass('visible');
        },
        //endregion

        //region Handle events
        handleToolbarItemClick : function(e){
            var $currentTarget = this.$(e.currentTarget);
            if($currentTarget.hasClass('visible')){
                facade.publish('Toolbar:close');
            } else {
                this.$('.toolbar-item').removeClass('visible');
                $currentTarget.addClass('visible');
                facade.publish('Toolbar:open');
            }
        },

        //endregion

    });

    return View;
});