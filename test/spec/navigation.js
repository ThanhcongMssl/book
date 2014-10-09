/**
 * Created with WebStorm.
 * Name: navigation.js
 * User: ThànhCông
 * Date: 9/27/2014
 * Time: 9:36 AM
 */

/*global define, describe, it, spyOn*/
define (
    ['jquery', 'facade', 'models/info', 'models/user', 'models/view', 'views/desktop/content/main', 'views/desktop/content/viewer/main'],
    function($, facade, InfoModel, UserModel, ViewModel, Content, Viewer){
    describe('Navigation spec', function(){
        describe('Given the facade, InfoModel, UserModel, ViewModel object and Content class', function(){

            InfoModel.set({
                part: [0, 1000, 2200]
            });

            UserModel.set({
                currentID: 1,
                currentPart: 0
            });

            ViewModel.set({
                idPerPage: 100,
                column: 2
            });

            describe('When create Content\'s instance', function(){
                beforeEach(function(){
                    spyOn(Content.prototype,'handleNextButtonClick').and.callThrough();
                    spyOn(Content.prototype,'handlePrevButtonClick').and.callThrough();

                    spyOn(facade,'publish').and.callThrough();

                    this.content = new Content();
                });

                it('Should be called handle function when next button click', function(){
                    facade.publish.calls.reset();

                    this.content.$('.next').click();

                    expect(Content.prototype.handleNextButtonClick).toBeDefined();
                    expect(Content.prototype.handleNextButtonClick).toHaveBeenCalled();

                    expect(facade.publish).toHaveBeenCalled();
                    expect(facade.publish.calls.argsFor(0)).toEqual(
                        ['Navigation:change', jasmine.any(Object)]
                    );
                });

                it('Should be called handle function when prev button click', function(){
                    facade.publish.calls.reset();
                    this.content.$('.prev').click();

                    expect(Content.prototype.handlePrevButtonClick).toBeDefined();
                    expect(Content.prototype.handlePrevButtonClick).toHaveBeenCalled();

                    expect(facade.publish).toHaveBeenCalled();
                    expect(facade.publish.calls.argsFor(0)).toEqual(
                        ['Navigation:change', jasmine.any(Object)]
                    );
                });

                it('Calculate right ID per page', function(){
                    this.content.$('.content').height(1000);
                    this.content.$('.article').height(10000);
                });

                it('Should request next part when current is end', function(){
                    UserModel.set({
                        currentID: 800
                    });

                    this.content.$('.next').click();

                    expect(UserModel.get('currentID')).toEqual(1000);
                    expect(UserModel.get('currentPart')).toEqual(1);
                });
            });
        });
        describe('Given the facade object and Viewer class', function(){
            describe('When create Viewer\'s instance', function(){
                beforeEach(function(){
                    spyOn(facade, 'subscribe').and.callThrough();
                    spyOn(Viewer.prototype, 'changeView').and.callThrough();

                    new Viewer();
                });

                it('Then should be subscribed navigation change event by changeView function', function(){
                    expect(facade.subscribe).toBeDefined();
                    expect(facade.subscribe).toHaveBeenCalled();
                    expect(facade.subscribe.calls.argsFor(1)).toEqual(
                        ['Navigation:change', jasmine.any(String), Viewer.prototype.changeView, jasmine.any(Viewer)]
                    );
                });
                it('And when publish message then changeView function should be called', function(){
                    facade.publish('Navigation:change', {
                        ID: 13
                    });

                    expect(Viewer.prototype.changeView).toBeDefined();
                    expect(Viewer.prototype.changeView).toHaveBeenCalled();
                    expect(Viewer.prototype.changeView.calls.mostRecent().args).toEqual(
                        [{ID: 13}]
                    );
                });
            });
        });
    });
});


