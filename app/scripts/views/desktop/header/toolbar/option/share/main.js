/**
 * Created with WebStorm.
 * Name: main.js
 * User: ThànhCông
 * Date: 9/25/2014
 * Time: 9:13 PM
 */

/*global define*/
define (
    ['jquery', 'underscore', 'backbone', 'facade', 'text!templates/desktop/header/toolbar/option/share/base.html', 'utility/social', 'events', 'utility/login-filter'],
    function($, _, Backbone, facade, baseTemplate, Social, Events, LoginFilter){
    var View = Backbone.View.extend({
        template: _.template(baseTemplate),

        initialize : function(){
            new LoginFilter(this, [
                'share'
            ]);

            this.render();
        },

        //region Function
        render : function(){
            var template = this.template();
            this.$el.html(template);

            this.initComponents();
            this.bindEvents();

            return this;
        },

        initComponents : function(){

        },

        bindEvents: function(){
            Events.addListener('click', this.$('.social-list-item'), this.share, this);

        },
        //endregion

        //region Method
        share: function(e){
            var $currentTarget = this.$(e.currentTarget),
                social = $currentTarget.attr('data-social');

            Social.share(document.URL, social);
        }
        //endregion
    });

    return View;
});