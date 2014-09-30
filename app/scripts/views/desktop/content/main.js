/**
 * Created with WebStorm.
 * Name: main.js
 * User: ThànhCông
 * Date: 9/24/2014
 * Time: 10:58 PM
 */

/*global define*/
define (
    ['jquery', 'underscore', 'backbone', 'facade', 'text!templates/desktop/content/base.html', './viewer/main', 'models/book', 'models/view', 'models/info', 'models/user', 'events'],
    function($, _, Backbone, facade, baseTemplate, Viewer, BookModel, ViewModel, InfoModel, UserModel, Events){
        var View = Backbone.View.extend({
            template: _.template(baseTemplate),

            initialize: function () {
                facade.subscribe('Font:change-color', 'change background color', this.changeBackgroundColor, this);
                facade.subscribe('Toolbar:open', 'show overlay', this.showOverlay, this);
                facade.subscribe('Toolbar:close', 'hide overlay', this.hideOverlay, this);

                this.render();
            },

            //region Function
            render: function(){
                var template = this.template();
                this.$el.html(template);

                this.bindEvents();
                this.initComponents();

                return this;
            },

            bindEvents : function(){
                Events.addListener('click', this.$('.next'), this.handleNextButtonClick, this);
                Events.addListener('click', this.$('.prev'), this.handlePrevButtonClick, this);
            },

            initComponents: function(){
                new Viewer({
                    el: this.$('.viewer')
                });
            },
            //endregion

            //region Method
            changeBackgroundColor: function(options){
                var color = options.color;
                this.$el.removeClass();
                this.$el.addClass(color);
            },

            showOverlay: function(){
                this.$('.overlay').removeClass('hidden');
            },

            hideOverlay: function(){
                this.$('.overlay').addClass('hidden');
            },
            //endregion

            //region Handle events
            handleNextButtonClick : function(){
                var id = UserModel.get('currentID') + ViewModel.get('idPerPage'),
                    totalID = InfoModel.get('totalID');
                id = id > totalID ? totalID : id;
                facade.publish('Navigation:change', {
                    ID: id
                });
            },

            handlePrevButtonClick : function(){
                var id = UserModel.get('currentID') - ViewModel.get('idPerPage'),
                    parts = InfoModel.get('part');
                id = id < parts[0] ? parts[0] : id;
                facade.publish('Navigation:change', {
                    ID: id
                });
            }
            //endregion
        });

        return View;
    });