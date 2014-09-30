/**
 * Created with WebStorm.
 * Name: navigation.js
 * User: ThànhCông
 * Date: 9/27/2014
 * Time: 9:36 AM
 */

/*global define, describe, it, spyOn*/
define (
    ['jquery', 'facade', 'views/desktop/content/main', 'views/desktop/content/viewer/main'],
    function($, facade, Content, Viewer){
    describe('Navigation spec', function(){
        describe('Given the facade object and Content class', function(){
            describe('When create Content\'s instance', function(){
                beforeEach(function(){
                    spyOn(Content.prototype,'handleNextButtonClick').and.callThrough();
                    spyOn(Content.prototype,'handlePrevButtonClick').and.callThrough();

                    spyOn(facade,'publish');

                    this.content = new Content();
                });

                it('Should be called handle function when next button click', function(){
                    this.content.$('.next').click();

                    expect(Content.prototype.handleNextButtonClick).toBeDefined();
                    expect(Content.prototype.handleNextButtonClick).toHaveBeenCalled();

                    expect(facade.publish).toHaveBeenCalled();
                    expect(facade.publish.calls.mostRecent().args).toEqual(
                        ['Navigation:change', jasmine.any(Object)]
                    );
                });

                it('Should be called handle function when prev button click', function(){
                    this.content.$('.prev').click();

                    expect(Content.prototype.handlePrevButtonClick).toBeDefined();
                    expect(Content.prototype.handlePrevButtonClick).toHaveBeenCalled();

                    expect(facade.publish).toHaveBeenCalled();
                    expect(facade.publish.calls.mostRecent().args).toEqual(
                        ['Navigation:change', jasmine.any(Object)]
                    );
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


