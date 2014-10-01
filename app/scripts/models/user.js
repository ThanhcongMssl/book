/**
 * Created with WebStorm.
 * Name: user.js
 * User: ThànhCông
 * Date: 9/27/2014
 * Time: 11:31 PM
 */

'use strict';

/* global define */
define (['backbone', './info', './view'], function(Backbone, InfoModel, ViewModel){
    var Model = Backbone.Model.extend({
        initialize : function(){

        },

        //region View Model
        getBookmarksModel : function(){

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
        }
        //endregion
    });

    return new Model();
});