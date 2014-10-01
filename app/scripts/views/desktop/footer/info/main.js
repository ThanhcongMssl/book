/**
 * Created with WebStorm.
 * Name: main.js
 * User: ThànhCông
 * Date: 9/25/2014
 * Time: 4:29 PM
 */
'use strict';

/*global define*/
define (
    ['jquery', 'underscore', 'backbone', 'facade', 'text!templates/desktop/footer/info/base.html', 'models/user'],
    function($, _, Backbone, facade, baseTemplate, UserModel){
    var View = Backbone.View.extend({
        template: _.template(baseTemplate),

        initialize : function(){
            facade.subscribe('Viewer:check-in', 'render', this.render, this);
        },

        //region Function
        render: function(){
            var template = this.template({
                Model: UserModel.getInfoModel()
            });
            this.$el.html(template);

            this.initComponents();

            return this;
        },

        initComponents: function(){

        }
        //endregion
    });

    return View;
});