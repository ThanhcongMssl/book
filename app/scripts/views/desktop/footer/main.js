/**
 * Created with WebStorm.
 * Name: main.js
 * User: ThànhCông
 * Date: 9/25/2014
 * Time: 9:42 AM
 */

/*global define*/
define (
    ['jquery', 'underscore', 'backbone', 'text!templates/desktop/footer/base.html', './slider/main', './info/main'],
    function($, _, Backbone, baseTemplate, SliderView, InfoView){
        var View = Backbone.View.extend({
            template: _.template(baseTemplate),

            initialize: function () {
                this.render();
            },

            render: function(){
                var template = this.template();
                this.$el.html(template);

                this.initComponents();

                return this;
            },

            initComponents: function(){
                new SliderView({
                    el: this.$('.slider')
                });
                new InfoView({
                    el: this.$('.info')
                });
            }
        });

        return View;
    });