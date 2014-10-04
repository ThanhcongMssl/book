/**
 * Created with WebStorm.
 * Name: main.js
 * User: ThànhCông
 * Date: 9/25/2014
 * Time: 11:25 PM
 */

/*global define*/
define (
    ['jquery', 'underscore', 'backbone', 'facade', 'events', 'text!templates/desktop/content/viewer/base.html', 'models/view', 'models/info', 'models/user'],
    function($, _, Backbone, facade, Events, baseTemplate, ViewModel, InfoModel, UserModel){
    var View = Backbone.View.extend({
        template: _.template(baseTemplate),

        initialize : function(){
            facade.subscribe('ViewModel:fetch-data-successed', 'render', this.render, this);
            facade.subscribe('Navigation:change', 'change view', this.changeView, this);
            facade.subscribe('Font:change-size', 'change font size', this.changeFontSize, this);
            facade.subscribe('Font:change-style', 'change font style', this.changeFontStyle, this);
            facade.subscribe('Layout:change', 'change layout', this.changeLayout, this);

            this.bindEvents();

            facade.publish('Request:part', {
                part: UserModel.get('currentPart')
            });
        },

        //region Function
        render: function(){
            var template = this.template({
                HTML: ViewModel.get('HTML'),
                layout: UserModel.get('layout')
            });
            this.$el.html(template);

            this.backUpUserModel();
            this.initComponents();
            this.changeView({
                ID: UserModel.get('currentID')
            });

            return this;
        },

        initComponents: function(){
            this.resizeImage();
            ViewModel.set('idPerPage', this.calculateIdPerPage());
            ViewModel.set('pageNumberOfParts', this.calculatePageNumberOfParts());
            facade.publish('Viewer:resize');
        },

        bindEvents: function(){
            Events.addListener('resize', window, this.handleWindowResize, this);
            Events.addListener('click', this.$el, this.handleViewerClick, this);
        },

        backUpUserModel : function(){
            this.$el.css('font-size', UserModel.get('fontSize'));
            this.$el.css('font-family', UserModel.get('fontFamily'));
        },
        //endregion

        //region Handle Events
        handleWindowResize : function(){
            this.initComponents();
            this.changeView({
                ID: UserModel.get('currentID')
            });
        },

        handleViewerClick : function(){
            var sel = getSelection().toString();
            if (!sel){
                facade.publish('Read:toggle');
            }
        },
        //endregion

        //region Method
        changeView : function(options){
            var id = options.ID,
                part = InfoModel.getPartById(id);
            UserModel.set('currentID', id);
            if (part == UserModel.get('currentPart')){
                var X = Math.floor((id - InfoModel.get('part')[part - 1]) / (ViewModel.get('idPerPage') * ViewModel.get('column')));
                this.translate(X);
                facade.publish('Viewer:check-in');
            } else {
                UserModel.set('currentPart', part);
                facade.publish('Request:part', {
                    part: part
                });
            }
        },

        changeFontSize: function(options){
            var size = options.size;
            this.$el.css('font-size', size);
            this.initComponents();
        },

        changeFontStyle: function(options){
            var style = options.style;
            this.$el.css('font-family', style);
            this.initComponents();
        },

        changeLayout : function(){
            this.initComponents();
            this.changeView({
                ID: UserModel.get('currentID')
            });
        },

        translate: function(X){
            var $container = this.$('.container'),
                translateX = -(this.$el.width() + parseInt($container.css('column-gap'))) * X;
            $container.css({
                "transform": "translate(" + translateX + "px,0px)",
                "-ms-transform": "translate(" + translateX + "px,0px)",
                "-webkit-transform": "translate(" + translateX + "px,0px)"
            });
        },

        resizeImage : function(){
            var percent = 86 / 100,
                height = Math.floor(this.$el.height() * percent),
                $img = this.$el.find('img');
            for (var i = 0, length = $img.length; i < length; i++) {
                this.$($img[i]).css('max-height', height);
            }
        },

        calculateIdPerPage : function(){
            var $container = this.$('.container'),
                $article = this.$('.article'),
                column = $container.css('column-count'),
                idInPart = InfoModel.getIdInPart(UserModel.get('currentPart'));

            ViewModel.set('column', column);

            if(ViewModel.get('isWebkit')){
                var viewerHeight = this.$el.height(),
                    articleHeight = $article.height();

                viewerHeight *= column;

                return Math.floor((viewerHeight / articleHeight) * idInPart);
            }
            else{
                var viewerWidth = this.$el.width(),
                    articleWidth = $article.width() + parseInt($container.css('column-gap'));

                return Math.floor((viewerWidth / articleWidth) * idInPart / 2);
            }
        },

        calculatePageNumberOfParts: function(){
            var parts = InfoModel.get('part'),
                idPerPage = ViewModel.get('idPerPage');

            var pageNumberOfParts = [0];
            for(var i = 0, length = parts.length - 1; i < length; i++){
                var idInPart = InfoModel.getIdInPart(i + 1),
                    pageNumber = Math.ceil(idInPart/idPerPage);
                pageNumberOfParts.push(pageNumberOfParts[i] + pageNumber);
            }

            return pageNumberOfParts;
        }
        //endregion
    });

    return View;
});
