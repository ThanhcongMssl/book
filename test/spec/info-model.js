/**
 * Created with WebStorm.
 * Name: info-model.js
 * User: ThànhCông
 * Date: 9/28/2014
 * Time: 12:32 AM
 */

/*global define*/
define (['models/info'], function(InfoModel){
    describe('Info Model spec', function(){
        describe('Given InfoModel object', function(){
            describe('Set chapter attribute to InfoModel', function(){
                InfoModel.set({
                    chapter: [{id:0},{id: 30}, {id: 50}, {id: 70}]
                });

                it('Should be return right object when call getChapterById function', function(){
                    expect(InfoModel.getChapterById(80)).toEqual({id: 70});
                });
            });
            describe('Set part attribute to InfoModel', function(){
                InfoModel.set({
                    part: [0, 30, 50, 70]
                });

                it('Should be return right value when call getPartById function', function(){
                    expect(InfoModel.getPartById(40)).toEqual(2);
                });
                it('Should be return right value when call getIdInPart function', function(){
                    expect(InfoModel.getIdInPart(2)).toEqual(20);
                });
            });
        });
    });
});