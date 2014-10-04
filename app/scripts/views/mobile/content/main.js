/**
 * Created with WebStorm.
 * Name: main.js
 * User: ThànhCông
 * Date: 9/24/2014
 * Time: 10:58 PM
 */

/*global define*/
define (
    ['jquery', 'underscore', 'backbone', 'facade', 'text!templates/mobile/content/base.html', './viewer/main', './bookmark/main', 'models/book', 'models/view', 'models/info', 'models/user', 'events'],
    function($, _, Backbone, facade, baseTemplate, Viewer, Bookmark, BookModel, ViewModel, InfoModel, UserModel, Events){
        var View = Backbone.View.extend({
            template: _.template(baseTemplate),

            initialize: function () {
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
                Events.addListener('click', this.$('.overlay'), this.handleOverlayClick, this);
                //Events.addListener('swipeleft', this.$el, this.handleNextButtonClick, this);
                //Events.addListener('swiperight', this.$el, this.handlePrevButtonClick, this);
                Events.addListener('panstart', this.$el, this.handleContentPanStart, this);
                Events.addListener('panmove', this.$el, this.handleContentPanMove, this);
                Events.addListener('panend', this.$el, this.handleContentPanEnd, this);
            },

            initComponents: function(){
                new Viewer({
                    el: this.$('.viewer')
                });

                new Bookmark({
                    el: this.$('.bookmark')
                });
            },
            //endregion

            //region Method
            showOverlay: function(){
                this.$('.overlay').removeClass('hidden');
            },

            hideOverlay: function(){
                this.$('.overlay').addClass('hidden');
            },
            //endregion

            //region Handle events
            handleNextButtonClick : function(){
                var id = UserModel.get('currentID') + (ViewModel.get('idPerPage') * ViewModel.get('column')),
                    totalID = InfoModel.get('totalID');
                id = id > totalID ? totalID : id;
                facade.publish('Navigation:change', {
                    ID: id
                });
            },

            handlePrevButtonClick : function(){
                var id = UserModel.get('currentID') - (ViewModel.get('idPerPage') * ViewModel.get('column')),
                    parts = InfoModel.get('part');
                id = id < parts[0] ? parts[0] : id;
                facade.publish('Navigation:change', {
                    ID: id
                });
            },

            handleOverlayClick : function(){
                facade.publish('Toolbar:close');
            },

            handleContentPanStart : function(){
                facade.publish('Pan:start');
            },

            handleContentPanMove : function(e, gesture){
                facade.publish('Pan:move', {
                    x: gesture.deltaX
                });
            },

            handleContentPanEnd : function(e, gesture){
                var x = gesture.deltaX;
                facade.publish('Pan:end');
                if (Math.abs(x) > 60){
                    if (x > 0){
                        this.handlePrevButtonClick();
                    } else {
                        this.handleNextButtonClick();
                    }
                } else {
                    facade.publish('Navigation:change', {
                        ID: UserModel.get('currentID')
                    });
                }
            }
            //endregion
        });

        return View;
    });