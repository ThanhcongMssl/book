/**
 * Created with WebStorm.
 * Name: main.js
 * User: ThànhCông
 * Date: 9/25/2014
 * Time: 3:25 PM
 */

/*global define*/
define (['jquery', 'underscore', 'backbone', 'facade', 'text!templates/desktop/header/toolbar/bookmark/base.html'], function($, _, Backbone, facade, baseTemplate){
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

        }
    });

    return View;
});