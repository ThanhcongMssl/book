/**
 * Created with WebStorm.
 * Name: main.js
 * User: ThànhCông
 * Date: 9/25/2014
 * Time: 4:29 PM
 */

/*global define*/
define (
    ['jquery', 'underscore', 'backbone', 'facade', 'text!templates/mobile/footer/slider/base.html', 'powerange', 'events', 'models/info'],
    function($, _, Backbone, facade, baseTemplate, Powerange, Events, InfoModel){
    var View = Backbone.View.extend({
        template: _.template(baseTemplate),

        initialize : function(){
            _.bindAll(this, 'PowerangeCallback');
            facade.subscribe('Navigation:change', 'changeSlider', this.changeSlider, this);

            this.render();
        },

        render: function(){
            var template = this.template();
            this.$el.html(template);

            this.initComponents();
            this.bindEvents();

            return this;
        },

        bindEvents : function(){
            Events.addListener('panstart', this.$('.range-handle'), this.handleSliderMouseDown, this);
            Events.addListener('panend', this.$('.range-handle'), this.handleDocumentMouseUp, this);
        },

        initComponents: function(){
            var cust = this.$('.js-customized')[0];
            this.powerange = new Powerange(cust, {
                hideRange: true,
                klass: 'power-ranger',
                start: 0,
                callback: this.PowerangeCallback
            });
        },

        handleSliderMouseDown : function(){
            this.IsDragSlider = true;
            this.$('.tooltip').removeClass('hidden');
        },

        handleDocumentMouseUp : function(){
            if (this.IsDragSlider){
                var value = this.$('.js-customized').val(),
                    id = Math.round(value * InfoModel.get('totalID') / 100);
                facade.publish('Navigation:change', {
                    ID: id
                });
                this.IsDragSlider = false;
                this.$('.tooltip').addClass('hidden');
            }
        },

        PowerangeCallback : function(){
            var $handle = this.$('.range-handle'),
                left = $handle.css('left'),
                value = this.$('.js-customized').val();
//            left = parseInt(left) - $tooltip.outerWidth()/2 + $handle.outerWidth()/2;
//            this.$('.tooltip').css('left', left);
//            this.$('.percent').text(value + '%');
//
//            var chapter = InfoModel.getChapterById(id),
//                title = chapter ? chapter.title : InfoModel.get('title');
//            this.$('.title').text(title);
            facade.publish('Powerange:change', {
                percent: value
            });
        },

        changeSlider: function(options){
            var id = options.ID,
                value = (id / InfoModel.get('totalID') * 100);
            this.powerange.setStart(value);
        }
    });

    return View;
});