/**
 * Created with WebStorm.
 * Name: date.js
 * User: ThànhCông
 * Date: 10/1/2014
 * Time: 11:05 AM
 */

'use strict';

/*global define*/
define ([], function(){
    var DateFormat = function(){
        Date.prototype.getMonthName = function() {
            var m = ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7',
                     'Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'];
            return m[this.getMonth()];
        };

        Date.prototype.getDayName = function() {
            var d = ['Chủ nhật','Thứ hai','Thứ ba','Thứ tư',
                     'Thứ năm','Thứ sáu','Thứ bẩy'];
            return d[this.getDay()];
        };

        Date.prototype.bookFormat = function(){
            var year = this.getFullYear(),
                month = this.getMonthName(),
                day = this.getDate(),
                dayName = this.getDayName();
            return dayName + ', ' + day + ' ' + month + ', ' + year;
        };
    };

    DateFormat.prototype = {
        format: function(date){
            return (new Date(date)).bookFormat();
        }
    };

    return new DateFormat();
});