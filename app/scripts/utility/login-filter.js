/**
 * Created with WebStorm.
 * Name: login-filter.js
 * User: ThànhCông
 * Date: 2/20/14
 * Time: 9:33 AM
 */

define (['jquery','underscore','facade'], function($, _, facade){
    var that,loginFilter = function(context, fnList){
        that = this;
        for (var i = 0, length = fnList.length; i < length; i++){
            context[fnList[i]] = _.wrap(context[fnList[i]], this.filter);
        }
    };

    loginFilter.prototype = {
        filter: function(fn){
            if (that.checkLogin()){
                var args = Array.prototype.slice.call(arguments, 1);
                return fn.apply(this, args);
            }
            else{
                facade.publish("Popup:login-render");
                return false;
            }
        },

        checkLogin : function(){
            return parseInt($("#UID").val());
        }
    };

    return loginFilter;
});
