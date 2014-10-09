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
        //region Fetch data
//        url: '/Book/GetBookMetadata',
        url: '/data/book.json',

        fetchData: function(){
            this.fetch({
                data: {
                    bookID: this.get('bookID')
                },
//                type: 'POST',
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
        }
        //endregion


    });

    return new Model();
});