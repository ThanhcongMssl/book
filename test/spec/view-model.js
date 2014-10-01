/**
 * Created with WebStorm.
 * Name: view-model.js
 * User: ThànhCông
 * Date: 10/1/2014
 * Time: 8:40 AM
 */

'use strict';

/*global define*/
define (['models/info', 'models/view'], function(InfoModel, ViewModel){
    describe('View Model spec', function(){
        describe('Given InfoModel, ViewModel object', function(){
            describe('Set data for InfoModel, ViewModel', function(){
                beforeEach(function(){
                    spyOn(ViewModel,'getPageById').and.callThrough();

                    InfoModel.set({
                        part: [0, 810, 1620, 2030]
                    });
                    ViewModel.set({
                        idPerPage: 200,
                        pageNumberOfParts: [0, 5, 10, 13]
                    });
                });
                it('Should be return right value when call getPageById function', function(){
                    expect(ViewModel.getPageById).toBeDefined();
                    expect(ViewModel.getPageById(0)).toEqual(1);
                });
            });
        });
    });
});