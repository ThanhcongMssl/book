/**
 * Created with WebStorm.
 * Name: info.js
 * User: ThànhCông
 * Date: 9/27/2014
 * Time: 11:31 PM
 */

'use strict';

/*global define*/
define (['backbone'], function(Backbone){
    var Model = Backbone.Model.extend({
        initialize : function(){

        },

        //region Method
        getChapterById : function(id){
            var chapters = this.get('chapter'),
                i = 0,
                length = chapters.length;

            while (i < length && id >= chapters[i].id) {
                i++;
            }

            if (i < length && i > 0){
                return chapters[i-1];
            } else{
                return {
                    id: 0,
                    title: this.get('title')
                }
            }
        },

        getPartById : function(id){
            var parts = this.get('part'),
                i = 0,
                length = parts.length;

            while (i < length && id >= parts[i]) {
                i++;
            }

            return i - 1;
        },

        getIdInPart : function(number){
            var parts = this.get('part');
            return parts[number + 1] - parts[number];
        }
        //endregion
    });

    return new Model();
});