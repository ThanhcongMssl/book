/**
 * Created with WebStorm.
 * Name: view.js
 * User: ThànhCông
 * Date: 9/25/2014
 * Time: 1:20 PM
 */

/*global define*/
define (
    ['jquery', 'underscore', 'backbone', 'facade', 'models/info'],
    function($, _, Backbone, facade, InfoModel){
    'use strict';

    var Model = Backbone.Model.extend({
        initialize: function(){
            _.bindAll(this, 'handleFetchDataSuccess');

            facade.subscribe('Request:part', 'get part', this.handleRequestPart, this);
        },

        //region Fetch
        fetchData: function(number, location){
            number = number || 1;
            location = location || false;
            Backbone.ajax({
                url: '/data/' + number + '.html',
                data: {
                    bookID: this.get('bookID'),
                    partNumber: number,
                    markedLocBySpan: location,
                    startLocation: number
                },
                success: this.handleFetchDataSuccess
            });
        },

        handleFetchDataSuccess: function(response){
            this.set({
                HTML: response
            });
            facade.publish('ViewModel:fetch-data-successed');
        },

        handleRequestPart : function(options){
            var part = options.part;
            this.fetchData(part, true);
        },
        //endregion

        //region Method
        getPageById : function(id){
            var part = InfoModel.getPartById(id),
                page = Math.ceil((id - InfoModel.get('part')[part - 1])/this.get('idPerPage') + 0.001);

            return this.get('pageNumberOfParts')[part - 1] + page;
        }
        //endregion
    });

    return new Model();
});