/**
 * Created with WebStorm.
 * Name: book.js
 * User: ThànhCông
 * Date: 9/24/2014
 * Time: 11:05 PM
 */

/*global define*/
define (
    ['jquery', 'underscore', 'backbone', 'facade', './info', './user'],
    function($, _, Backbone, facade, InfoModel, UserModel){
    'use strict';

    var Model = Backbone.Model.extend({
        //region Fetch
        url: '/data/book.json',

        fetchData: function(){
            this.fetch({
                data: {
                    bookID: this.get('bookID')
                },
                //type: 'POST',
                processData: true,
                success: this.handleFetchDataSuccess
            });
        },

        handleFetchDataSuccess: function(model){
            var bookID = model.get('bookID'),
                bookInfo = JSON.parse(model.get('bookInfo')),
                userInfo = JSON.parse(model.get('userInfo'));

            InfoModel.set({
                bookID: bookID
            });
            InfoModel.set(bookInfo);
            UserModel.set({
                bookID: bookID
            });
            UserModel.set(userInfo);

            facade.publish('BookModel:fetch-data-successed');
        },
        //endregion

        //region Sync data
        syncLocation: function(){
            Backbone.ajax({
                url: '/book/SyncLocation',
                data: {
                    bookID: this.get('bookID'),
                    currentLocation: this.get('currentID'),
                    partNumber: this.get('currentPart')
                },
                type: "POST",
                success: function (response) {
                    if (response.success) {

                    }
                }
            });
        },

        syncFont: function () {
            Backbone.ajax({
                url: '/book/SyncFont',
                data: {
                    bookID: this.get('bookID'),
                    fontSize: this.get('FontSize'),
                    fontFamily: this.get('FontFamily')
                },
                type: "POST",
                success: function (response) {
                    if (response.success) {

                    }
                }
            });
        },

        syncLayout : function(){
            Backbone.ajax({
                url: '/book/SyncLayout',
                data: {
                    bookID: this.get('bookID'),
                    layout: this.get('Layout')
                },
                type: "POST",
                success: function (response) {
                    if (response.success) {

                    }
                }
            });
        },

        syncTheme: function () {
            Backbone.ajax({
                url: '/book/SyncTheme',
                data: {
                    bookID: this.get('bookID'),
                    brightness: this.get('Brightness'),
                    backgroundColor: this.get('BackgroundColor')
                },
                type: "POST",
                success: function (response) {
                    if (response.success) {

                    }
                }
            });
        },

        syncBookmark: function () {
            Backbone.ajax({
                url: '/book/SyncBookmark',
                data: {
                    bookID: this.get('bookID'),
                    bookmark: JSON.stringify(this.get('BookmarkArray'))
                },
                type: "POST",
                success: function (response) {
                    if (response.success) {

                    }
                }
            });
        }
        //endregion
    });

    return new Model();
});