/**
 * Created with WebStorm.
 * Name: user-model.js
 * User: ThànhCông
 * Date: 10/1/2014
 * Time: 3:14 PM
 */

'use strict';

/*global define*/
define (['models/info', 'models/user', 'models/view'], function(InfoModel, UserModel, ViewModel){
    describe('User Model spec', function(){
        describe('Given InfoModel, UserModel, ViewModel object', function(){
            beforeEach(function(){
                spyOn(UserModel, 'checkBookmark').and.callThrough();

                InfoModel.set({
                    part: [0, 300],
                    totalID: 500
                });

                UserModel.set({
                    currentID: 60,
                    bookmark: [
                        {id: 50,title: 'lorem ipsum'},
                        {id: 333,title: 'foo bar'}
                    ]
                });

                ViewModel.set({
                    idPerPage: 50,
                    column: 2
                });
            });

            it('Should be return right value when call checkBookmark function', function(){
                expect(UserModel.checkBookmark).toBeDefined();
                expect(UserModel.checkBookmark()).toEqual({id: 50, title: 'lorem ipsum'});
                expect(UserModel.checkBookmark(120)).toEqual(null);
                expect(UserModel.checkBookmark(320)).toEqual({id: 333, title: 'foo bar'});
            });
        });
    });
});