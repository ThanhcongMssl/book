/**
 * Created with WebStorm.
 * Name: keyboard.js
 * User: ThànhCông
 * Date: 10/3/2014
 * Time: 11:03 PM
 */

'use strict';

/*global define*/
define (['jquery', 'facade', 'events'], function($, facade, Events){
    var Keyboard = function(){
        Events.addListener('keyup', document, this.handleDocumentKeyUp, this);
        Events.addListener('keydown', document, this.handleDocumentKeyDown, this);
    };

    Keyboard.prototype = {
        handleDocumentKeyUp : function(e){
            if(e.which == 17){
                this._isCtrl = false;
            }
        },

        handleDocumentKeyDown : function(e){
            return this.checkKey(e.which);
        },

        checkKey : function(keyCode) {
            if (keyCode == 17) this._isCtrl = true;
            if (!this._isCtrl) {
                switch (keyCode) {
                    case 39:
                    {
                        $('.next').trigger('click');
                        break;
                    }
                    case 37:
                    {
                        $('.prev').trigger('click');
                        break;
                    }
                    case 72:
                    {
                        // Highlight
                        break;
                    }
                    case 27:
                    {
                        facade.publish('Toolbar:close');
                        break;
                    }
//                case 87:{
//                    $('.background-color[data-color=White]').trigger('click');
//                    break;
//                }
//                case 83:{
//                    $('.background-color[data-color=Sepia]').trigger('click');
//                    break;
//                }
//                case 78:{
//                    $('.background-color[data-color=Night]').trigger('click');
//                    break;
//                }
                    default:
                        return true;
                }
                return false;
            }
            else {
                switch (keyCode) {
                    case 66:
                    {
                        $('.bookmark').trigger('click');
                        break;
                    }
                    case 70:
                    {
                        // Search
                        break;
                    }
                    case 187:
                    {
                        $('.increase-size').trigger('click');
                        break;
                    }
                    case 189:
                    {
                        $('.decrease-size').trigger('click');
                        break;
                    }
                    case 77:
                    {
                        $('.menu').trigger('click');
                        break;
                    }
                    case 76:
                    {
                        $('.op-add-to-library').trigger('click');
                        break;
                    }
//                case 49:
//                {
//                    $('.layout-mode.one-page').trigger('click');
//                    break;
//                }
//                case 50:{
//                    $('.layout-mode.two-page').trigger('click');
//                    break;
//                }
                    default:
                        return true;
                }
                return false;
            }
        }
    };

    return new Keyboard();
});