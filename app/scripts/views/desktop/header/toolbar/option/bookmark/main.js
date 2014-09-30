/**
 * Created with WebStorm.
 * Name: main.js
 * User: ThànhCông
 * Date: 9/25/2014
 * Time: 9:13 PM
 */

/*global define*/
define (
    ['jquery', 'underscore', 'backbone', 'facade', 'text!templates/desktop/header/toolbar/option/bookmark/base.html', 'models/user'],
    function($, _, Backbone, facade, baseTemplate, UserModel){
    var View = Backbone.View.extend({
        template: _.template(baseTemplate),

        initialize : function(){
            facade.subscribe('Viewer:resize', 'render', this.render, this);
        },

        render : function(){
            var template = this.template({
                Model: {
                    bookmarks: UserModel.getBookmarksModel()
                }
            });
            this.$el.html(template);

            this.initComponents();

            return this;
        },

        initComponents : function(){

        }
    });

    return View;
});