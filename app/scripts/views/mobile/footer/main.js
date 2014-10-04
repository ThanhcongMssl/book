/**
 * Created with WebStorm.
 * Name: main.js
 * User: ThànhCông
 * Date: 9/25/2014
 * Time: 9:42 AM
 */

/*global define*/
define (
    ['jquery', 'underscore', 'backbone', 'facade', 'events', 'text!templates/mobile/footer/base.html', './slider/main', './info/main'],
    function($, _, Backbone, facade, Events, baseTemplate, SliderView, InfoView){
        var View = Backbone.View.extend({
            template: _.template(baseTemplate),

            initialize: function () {
                this.render();
            },

            //region Function
            render: function(){
                var template = this.template();
                this.$el.html(template);

                this.initComponents();
                this.bindEvents();

                return this;
            },

            initComponents: function(){
                new SliderView({
                    el: this.$('.slider')
                });
                new InfoView({
                    el: this.$('.info')
                });
            },

            bindEvents : function(){
                //Events.addListener('mouseenter', this.$el, this.handleFooterHover, this);
            },
            //endregion

            //region Handle events
            handleFooterHover: function () {
                facade.publish('Read:stop');
            }
            //endregion
        });

        return View;
    });