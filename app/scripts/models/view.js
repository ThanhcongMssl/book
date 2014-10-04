/**
 * Created with WebStorm.
 * Name: view.js
 * User: ThànhCông
 * Date: 9/25/2014
 * Time: 1:20 PM
 */

/*global define*/
define(
    ['jquery', 'underscore', 'backbone', 'facade', 'models/info'],
    function ($, _, Backbone, facade, InfoModel) {
        'use strict';

        var Model = Backbone.Model.extend({
            initialize: function () {
                _.bindAll(this, 'handleFetchDataSuccess');

                facade.subscribe('Request:part', 'get part', this.handleRequestPart, this);

                this.checkBrowser();
            },

            //region Fetch
            fetchData: function (number, location) {
                number = number || 1;
                location = location || false;
                facade.publish('Ajax:loading');
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

            handleFetchDataSuccess: function (response) {
                this.set({
                    HTML: response
                });
                facade.publish('ViewModel:fetch-data-successed');
                facade.publish('Ajax:loaded');
            },

            handleRequestPart: function (options) {
                var part = options.part;
                this.fetchData(part, true);
            },
            //endregion

            //region Method
            getPageById: function (id) {
                var part = InfoModel.getPartById(id),
                    page = Math.ceil((id - InfoModel.get('part')[part - 1]) / this.get('idPerPage') + 0.001);

                return this.get('pageNumberOfParts')[part - 1] + page;
            },

            checkBrowser: function(){
                var isWebkit,
                    browser = this.identifyBrowser(navigator.userAgent);
                switch (browser) {
                    case 'Chrome':
                    {
                        isWebkit = true;
                        break;
                    }
                    case 'Firefox':
                    {
                        isWebkit = false;
                        break;
                    }
                    case 'MSIE':
                    {
                        isWebkit = false;
                        break;
                    }
                    case 'Opera':
                    {
                        isWebkit = true;
                        break;
                    }
                    default:
                    {
                        isWebkit = false;
                    }
                }
                this.set('isWebkit', isWebkit);
            },

            identifyBrowser: function (userAgent, elements) {
                var regexps = {
                        'Chrome': [ /Chrome\/(\S+)/ ],
                        'Firefox': [ /Firefox\/(\S+)/ ],
                        'MSIE': [ /MSIE (\S+);/ ],
                        'Opera': [
                            /Opera\/.*?Version\/(\S+)/, /* Opera 10 */
                            /Opera\/(\S+)/                  /* Opera 9 and older */
                        ],
                        'Safari': [ /Version\/(\S+).*?Safari\// ]
                    },
                    re, m, browser, version;

                if (userAgent === undefined)
                    userAgent = navigator.userAgent;

                if (elements === undefined)
                    elements = 2;
                else if (elements === 0)
                    elements = 1337;

                for (browser in regexps)
                    while (re = regexps[browser].shift())
                        if (m = userAgent.match(re)) {
                            version = (m[1].match(new RegExp('[^.]+(?:\.[^.]+){0,' + --elements + '}')))[0];
                            return browser;
                        }

                return null;
            }
            //endregion
        });

        return new Model();
    });