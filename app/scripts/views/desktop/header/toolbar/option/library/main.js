/**
 * Created with WebStorm.
 * Name: main.js
 * User: ThànhCông
 * Date: 9/25/2014
 * Time: 9:13 PM
 */

/*global define*/
define (
    ['jquery', 'underscore', 'backbone', 'facade', 'events', 'models/info', 'text!templates/desktop/header/toolbar/option/library/base.html', 'utility/login-filter'],
    function($, _, Backbone, facade, Events, InfoModel, baseTemplate, LoginFilter){
    var View = Backbone.View.extend({
        template: _.template(baseTemplate),

        initialize : function(){
            new LoginFilter(this, [
                'addBook',
                'removeBook'
            ]);

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

        //region Handle events
        handleLibraryClick: function(){
            if (this.$('.op-add-to-library').hasClass('added')){
                this.removeBook();
            } else {
                this.addBook();
            }
            facade.publish('Toolbar:close');
        },
        //endregion

        //region Method
        addBook : function(){
            var that = this;

            facade.publish('Ajax:loading');
            Backbone.ajax({
                url: "/Book/AddBook",
                type: "POST",
                data: {
                    documentID: InfoModel.get('bookID')
                },
                success: function (response) {
                    if (response.IsSuccessful){
                        that.$('.op-add-to-library').addClass('added');
                        facade.publish('Popup:notify-render', {
                            message: 'Đã thêm sách vào thư viện'
                        });
                    }
                },
                complete: function(){
                    facade.publish('Ajax:loaded');
                }
            });

            return false;
        },

        removeBook : function(){
            var that = this;

            facade.publish('Ajax:loading');
            Backbone.ajax({
                url: "/Book/RemoveBook",
                type: "POST",
                data: {
                    documentID: InfoModel.get('bookID')
                },
                success: function (response) {
                    if(response.IsSuccessful){
                        that.$('.op-add-to-library').removeClass('added');
                        facade.publish('Popup:notify-render', {
                            message: 'Đã xóa sách khỏi thư viện'
                        });
                    }
                },
                complete: function(){
                    facade.publish('Ajax:loaded');
                }
            });

            return false;
        }
        //endregion
    });

    return View;
});