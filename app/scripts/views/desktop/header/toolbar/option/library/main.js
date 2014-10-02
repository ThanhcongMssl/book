/**
 * Created with WebStorm.
 * Name: main.js
 * User: ThànhCông
 * Date: 9/25/2014
 * Time: 9:13 PM
 */

/*global define*/
define (['jquery', 'underscore', 'backbone', 'facade', 'events', 'models/info', 'text!templates/desktop/header/toolbar/option/library/base.html'], function($, _, Backbone, facade, Events, InfoModel, baseTemplate){
    var View = Backbone.View.extend({
        template: _.template(baseTemplate),

        initialize : function(){
            this.render();
        },

        //region Function
        render : function(){
            var template = this.template({
                Model: {
                    added: false
                }
            });
            this.$el.html(template);

            this.initComponents();
            this.bindEvents();

            return this;
        },

        initComponents : function(){

        },

        bindEvents: function () {
            Events.addListener('click', this.$('.op-add-to-library'), this.handleLibraryClick, this);
        },
        //endregion

        handleLibraryClick: function(){
            if (this.$('.op-add-to-library').hasClass('added')){
                this.removeBook();
            } else {
                this.addBook();
            }

        },

        addBook : function(){
            var that = this;

            Backbone.ajax({
                url: "/Book/AddBook",
                type: "POST",
                data: {
                    documentID: InfoModel.get('bookID')
                },
                success: function (response) {
                    if (response.IsSuccessful){
                        that.$('.op-add-to-library').addClass('added');
                    }
                }
            });

            return false;
        },

        removeBook : function(){
            var that = this;

            Backbone.ajax({
                url: "/Book/RemoveBook",
                type: "POST",
                data: {
                    documentID: InfoModel.get('bookID')
                },
                success: function (response) {
                    if(response.IsSuccessful){
                        that.$('.op-add-to-library').removeClass('added');
                    }
                }
            });

            return false;
        }
    });

    return View;
});