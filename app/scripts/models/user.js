/**
 * Created with WebStorm.
 * Name: user.js
 * User: ThànhCông
 * Date: 9/27/2014
 * Time: 11:31 PM
 */

'use strict';

/* global define */
define (['backbone', './info', './view', 'utility/date'], function(Backbone, InfoModel, ViewModel, DateFormat){
    var Model = Backbone.Model.extend({
        initialize : function(){

        },

        //region View Model
        getBookmarksModel : function(){
            var bookmarks = this.get('bookmark'),
                bookmarkModel = [];

            for(var i = 0, length = bookmarks.length; i < length; i++){
                var bookmark = bookmarks[i],
                    model = {};

                model.id = bookmark.id;
                model.title = bookmark.title;
                model.page = ViewModel.getPageById(bookmark.id);
                model.date = DateFormat.format(new Date(bookmark.date), 'book');

                bookmarkModel.push(model);
            }

            return bookmarkModel;
        },

        getInfoModel: function(){
            var id = this.get('currentID'),
                totalId = InfoModel.get('totalID'),
                page = ViewModel.getPageById(id),
                percent = Math.round(id / totalId * 100);
            return {
                page: page,
                totalPage: ViewModel.getPageById(totalId),
                percent: percent,
                title: InfoModel.get('title'),
                author: InfoModel.get('author')
            }
        },

        getChaptersModel : function(){
            var chapters = InfoModel.get('chapter'),
                chapterModel = [];

            for(var i = 0, length = chapters.length; i < length; i++){
                var chapter = chapters[i],
                    model = {};

                model.id = chapter.id;
                model.title = chapter.title;
                model.page = ViewModel.getPageById(chapter.id);

                chapterModel.push(model);
            }

            return chapterModel;
        },
        //endregion

        //region Method
        checkBookmark : function(id){
            var id = id || this.get('currentID'),
                bookmarks = this.get('bookmark'),
                idPerPage = ViewModel.get('idPerPage'),
                column = ViewModel.get('column'),
                totalId = InfoModel.get('totalID'),
                part = InfoModel.getPartById(id),
                idOfPart = InfoModel.get('part')[part - 1];

            id = id - idOfPart;

            var startId = id - (id % (idPerPage * column)),
                endId = startId + (idPerPage * column);

            endId = endId > totalId ? totalId : endId;

            for(var i = 0, length = bookmarks.length; i < length; i++){
                var bookmark = bookmarks[i],
                    bookmarId = bookmark.id - idOfPart;
                if (bookmarId >= startId && bookmarId <= endId){
                    return bookmark;
                }
            }

            return null;
        }
        //endregion
    });

    return new Model();
});