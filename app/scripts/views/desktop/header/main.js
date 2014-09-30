/**
 * Created with WebStorm.
 * Name: main.js
 * User: ThànhCông
 * Date: 9/25/2014
 * Time: 9:42 AM
 */

/*global define*/
define (
    ['jquery', 'underscore', 'backbone', 'text!templates/desktop/header/base.html', './toolbar/main'],
    function($, _, Backbone, baseTemplate, ToolbarView){
    var View = Backbone.View.extend({
        template: _.template(baseTemplate),

        initialize: function () {
            this.render();
        },

        render: function(){
            var template = this.template();
            this.$el.html(template);

            this.initComponents();

            return this;
        },

        initComponents: function(){
            new ToolbarView({
                el: this.$('.toolbar')
            })
        }
    });

    return View;
});