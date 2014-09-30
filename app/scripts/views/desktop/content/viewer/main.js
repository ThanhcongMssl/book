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

            this.bindEvents();

            facade.publish('Request:part', {
                part: UserModel.get('currentPart')
            });
        },

        render: function(){
            var template = this.template({
                HTML: ViewModel.get('HTML')
            });
            this.$el.html(template);

            this.initComponents();
            this.changeView({
                ID: UserModel.get('currentID')
            });

            return this;
        },

        bindEvents: function(){
            Events.addListener('resize', window, this.handleWindowResize, this);
        },

        handleWindowResize : function(){
            this.initComponents();
            this.changeView({
                ID: UserModel.get('currentID')
            });
        },

        initComponents: function(){
            this.resizeImage();
            ViewModel.set('idPerPage', this.calculateIdPerPage());
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
            var viewerHeight = this.$el.height(),
                articleHeight = this.$('.article').height(),
                idInPart = InfoModel.getIdInPart(UserModel.get('currentPart'));

            viewerHeight *= this.$('.container').css('column-count');

            return Math.floor((viewerHeight / articleHeight) * idInPart);
        },

        changeView : function(options){
            var id = options.ID,
                part = InfoModel.getPartById(id);
            UserModel.set('currentID', id);
            if (part == UserModel.get('currentPart')){
                var X = Math.floor((id - InfoModel.get('part')[part - 1]) / ViewModel.get('idPerPage'));
                this.translate(X);
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

        translate: function(X){
            var $container = this.$('.container'),
                translateX = -(this.$el.width() + parseInt($container.css('column-gap'))) * X;
            $container.css({
                "transform": "translate(" + translateX + "px,0px)",
                "-ms-transform": "translate(" + translateX + "px,0px)",
                "-webkit-transform": "translate(" + translateX + "px,0px)"
            });
        }
    });

    return View;
});