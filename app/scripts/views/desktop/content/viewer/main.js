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
            _.bindAll(this, 'handleImageLoaded');

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
                HTML: ViewModel.get('HTML')
            });
            this.$el.html(template);
            this.resizeImage();
            this.bindImageLoadedEvents();

            return this;
        },

        continueRender : function(){
            this.backUpUserModel();
            this.initComponents();
            this.bindReferenceEvents();
            this.changeView({
                ID: UserModel.get('currentID')
            });

            facade.publish('Ajax:loaded');

            return this;
        },

        initComponents: function(){
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

        bindReferenceEvents : function(){
            Events.addListener('click', this.$('.ref'), this.handleReferenceClick, this);
        },

        bindImageLoadedEvents: function(){
            var images = this.$('img'),
                length = images.length;

            if (length == 0){
                this.continueRender();
            } else {
                this.imageLoadedCouter = 0;
                this.imageNumber = length;

                for(var i = 0; i < length; i++){
                    var img = images[i];
                    img.id = i;
                    img.onload = this.handleImageLoaded;
                }
            }
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

        handleReferenceClick : function(e){
            var $currentTarget = this.$(e.currentTarget),
                href = $currentTarget.attr('href'),
                refs = InfoModel.get('listAllReferences');

            var ref = _.where(refs, {reference: href});
            facade.publish('Navigation:change', {
                ID: ref[0].id
            });

            return false;
        },

        handleImageLoaded : function(){
            this.imageLoadedCouter++;
            if (this.imageLoadedCouter == this.imageNumber){
                this.continueRender();
            }
        },
        //endregion

        //region Method
        changeView : function(options){
            var id = options.ID,
                part = InfoModel.getPartById(id),
                idPerView = ViewModel.get('idPerPage') * ViewModel.get('column');
            id = id - ((id - InfoModel.get('part')[part]) % idPerView);
            UserModel.set('currentID', id);
            if (part == UserModel.get('currentPart')){
                var X = Math.floor((id - InfoModel.get('part')[part]) / idPerView);
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
                translateX = -(this.$el[0].getBoundingClientRect().width + parseInt($container.css('column-gap'))) * X;
            $container.css({
                "transform": "translate(" + translateX + "px,0px)",
                "-ms-transform": "translate(" + translateX + "px,0px)",
                "-webkit-transform": "translate(" + translateX + "px,0px)"
            });
        },

        resizeImage : function(){
            var percent = 86 / 100,
                height = Math.floor(this.$el.height() * percent),
                $img = this.$('img');
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

            var viewerHeight,
                articleHeight;

            if(ViewModel.get('isWebkit')){
                viewerHeight = this.$el.height();
                articleHeight = $article.height();

                return Math.ceil(idInPart / (articleHeight / viewerHeight));
            }
            else{
                var gap = parseInt($container.css('column-gap')),
                    viewerWidth = this.$el.width() + gap,
                    articleWidth = $article.width() + gap;

                /*
                 * Some error with Article width in one column case
                 */
                var pageNumber = Math.round(articleWidth / viewerWidth),
                    pageWidth = (viewerWidth - (gap * column)) / column;

                articleWidth = pageWidth * (pageNumber - 1) * column;

                var part = UserModel.get('currentPart'),
                    lastWord = InfoModel.get('part')[part] + idInPart - 1,
                    viewerOffset = this.$el.offset(),
                    containerOffset = this.$('.container').offset(),
                    offset = this.$('#' + lastWord).offset();

                var top = offset.top - containerOffset.top,
                    left = ((offset.left + (viewerWidth * 1000)) % (viewerWidth)) - gap - viewerOffset.left;
                viewerHeight = this.$el.height();
                articleWidth += (top / viewerHeight) * pageWidth;
                if (left >= viewerWidth){
                    articleWidth += pageWidth;
                }
                return Math.ceil(idInPart / (articleWidth / pageWidth));
            }
        },

        calculatePageNumberOfParts: function(){
            var parts = InfoModel.get('part'),
                idPerPage = ViewModel.get('idPerPage');

            var pageNumberOfParts = [0];
            for(var i = 0, length = parts.length - 1; i < length; i++){
                var idInPart = InfoModel.getIdInPart(i),
                    pageNumber = Math.ceil(idInPart/idPerPage);
                pageNumberOfParts.push(pageNumberOfParts[i] + pageNumber);
            }

            return pageNumberOfParts;
        }
        //endregion
    });

    return View;
});
