/**
 * Created with WebStorm.
 * Name: info.js
 * User: ThànhCông
 * Date: 9/27/2014
 * Time: 11:31 PM
 */

/*global define*/
define (['backbone'], function(Backbone){
    var Model = Backbone.Model.extend({
        initialize : function(){

        },

        getChapterById : function(id){
            var chapters = this.get('chapter'),
                i = 0,
                length = chapters.length;

            while (i < length && id > chapters[i].id) {
                i++;
            }

            return chapters[i-1];
        },

        getPartById : function(id){
            var parts = this.get('part'),
                i = 0,
                length = parts.length;

            while (i < length && id >= parts[i]) {
                i++;
            }

            return i;
        },

        getIdInPart : function(number){
            var parts = this.get('part');
            return parts[number] - parts[number - 1];
        }
    });

    return new Model();
});