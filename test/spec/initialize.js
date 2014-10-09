/**
 * Created with WebStorm.
 * Name: view.js
 * User: ThànhCông
 * Date: 9/26/2014
 * Time: 2:27 PM
 */

/*global define, describe, it*/
define (['facade', 'backbone', 'models/book', 'models/view', 'models/info', 'models/user', 'views/desktop/main', 'views/desktop/header/main', 'views/desktop/content/main', 'views/desktop/footer/main', 'views/desktop/content/viewer/main'], function(facade, Backbone, BookModel, ViewModel, InfoModel, UserModel, App, Header, Content, Footer, Viewer){
    describe('Initialize spec', function(){
        describe('Given the facade, Backbone, BookModel, ViewModel, InfoModel, UserModel, object', function(){
            BookModel.set({
                bookID: 13
            });
            ViewModel.set({
                bookID: 13
            });
            InfoModel.set({
                part: [0, 300, 500]
            });
            UserModel.set({
                'currentID': 0,
                'currentPart': 0
            });

            it('BookModel\'s bookID should be right value', function () {
                expect(BookModel.get('bookID')).toEqual(13);
            });
            it('ViewModel\'s bookID should be right value', function () {
                expect(BookModel.get('bookID')).toEqual(13);
            });

            describe('Given the App', function(){
                describe('Given the Header, Content, Footer class', function(){
                    describe('When create new instance of App class', function(){
                        beforeEach(function () {
                            spyOn(App.prototype, 'initialize').and.callThrough();
                            spyOn(App.prototype, 'render').and.callThrough();

                            spyOn(BookModel, 'fetch').and.callFake(function (options) {
                                BookModel.set({
                                    bookInfo: '{}',
                                    userInfo: '{}'
                                });
                                options.success(BookModel);
                            });
                            spyOn(BookModel, 'handleFetchDataSuccess').and.callThrough();

                            spyOn(Header.prototype, 'initialize');
                            spyOn(Content.prototype, 'initialize');
                            spyOn(Footer.prototype, 'initialize');

                            spyOn(facade, 'publish').and.callThrough();

                            new App();
                        });

                        it('Then should be called initialize function App\'s instance', function(){
                            expect(App.prototype.initialize).toHaveBeenCalled();
                        });
                        it('And fetch function of BookModel should be called with right data', function () {
                            expect(BookModel.fetch).toHaveBeenCalled();
                            expect(BookModel.fetch.calls.mostRecent().args[0]['data']).toEqual({bookID: 13});
                        });
                        it('When fetch success, then callback function should be called', function () {
                            expect(BookModel.handleFetchDataSuccess).toHaveBeenCalled();
                        });
                        it('And publish function of facade should be call with right message', function () {
                            expect(facade.publish).toHaveBeenCalled();
                            expect(facade.publish.calls.mostRecent().args).toEqual(['BookModel:fetch-data-successed']);
                        });
                        it('Then render function of App instance should be called', function(){
                            expect(App.prototype.render).toHaveBeenCalled();
                        });
                        it('And should be created instance of Header, Content, Footer class', function(){
                            expect(Header.prototype.initialize).toHaveBeenCalled();
                            expect(Content.prototype.initialize).toHaveBeenCalled();
                            expect(Footer.prototype.initialize).toHaveBeenCalled();
                        });
                    });
                    describe('Given Viewer class', function(){
                        describe('When create new instance of Content class', function(){
                            beforeEach(function(){
                                spyOn(Content.prototype, 'initialize').and.callThrough();
                                spyOn(Content.prototype, 'render').and.callThrough();

                                spyOn(Viewer.prototype, 'initialize').and.callThrough();

                                new Content();
                            });

                            it('Then initialize function of Content\'s instance should be called', function(){
                                expect(Content.prototype.initialize).toHaveBeenCalled();
                            });
                            it('And render function of Content\'s instance should be called', function(){
                                expect(Content.prototype.render).toHaveBeenCalled();
                            });
                            it('And should be created instance of Viewer class', function(){
                                expect(Viewer.prototype.initialize).toHaveBeenCalled();
                            });
                        });
                        describe('When create new instance of Viewer class', function(){
                            beforeEach(function(){
                                spyOn(Viewer.prototype, 'initialize').and.callThrough();
                                spyOn(Viewer.prototype, 'render').and.callThrough();
                                spyOn(Viewer.prototype, 'calculateIdPerPage').and.callThrough();
                                spyOn(Viewer.prototype, 'calculatePageNumberOfParts').and.callThrough();
                                spyOn(Viewer.prototype, 'changeView').and.callThrough();

                                spyOn(ViewModel, 'fetchData').and.callThrough();
                                spyOn(ViewModel, 'handleFetchDataSuccess').and.callThrough();

                                spyOn(Backbone, 'ajax').and.callFake(function (options) {
                                    options.success('lorem ipsum');
                                });

                                spyOn(facade, 'publish').and.callThrough();
                                this.viewer = new Viewer();
                            });

                            it('Then initialize function of Viewer\'s instance should be called', function(){
                                expect(Viewer.prototype.initialize).toHaveBeenCalled();
                            });

                            it('And publish function of facade should be call with right message', function () {
                                expect(facade.publish).toHaveBeenCalled();
//                                expect(facade.publish.calls.argsFor(1)).toEqual(
//                                    ['Request:part', {part: jasmine.any(Number)}]
//                                );
                            });

                            it('And fetchData function of ViewModel should be called', function(){
                                expect(ViewModel.fetchData).toHaveBeenCalled();
                            });
                            it('And Backbone ajax function should be called', function(){
                                expect(Backbone.ajax).toHaveBeenCalled();
                            });
                            it('When get data success, callback function should be called', function(){
                                expect(ViewModel.handleFetchDataSuccess).toHaveBeenCalled();
                            });
                            it('Then HTML attribute of ViewModel should be equal data return', function () {
                                expect(ViewModel.get('HTML')).toEqual('lorem ipsum');
                            });

                            it('And publish function of facade should be call with right message', function () {
                                expect(facade.publish).toHaveBeenCalled();
//                                expect(facade.publish.calls.argsFor(1)).toEqual(
//                                    ['ViewModel:fetch-data-successed']
//                                );
                            });

                            it('Then render function of Viewer\'s instance should be called', function(){
                                expect(Viewer.prototype.render).toHaveBeenCalled();
                            });

                            it('And should be calculated right ID per page', function(){
                                expect(Viewer.prototype.calculateIdPerPage).toHaveBeenCalled();

                                UserModel.set('currentID', 0);
                                UserModel.set('currentPart', 0);
                                InfoModel.set('part', [0, 1000, 3000]);
                                ViewModel.set('idPerPage', 250);

                                this.viewer.$el.height(500);
                                this.viewer.$('.container').css('column-count', 2);
                                this.viewer.$('.article').height(4000);
                                expect(this.viewer.calculateIdPerPage).toBeDefined();
                                expect(this.viewer.calculateIdPerPage()).toEqual(250);
                                expect(this.viewer.calculatePageNumberOfParts).toBeDefined();
                                expect(this.viewer.calculatePageNumberOfParts()).toEqual([0, 4, 12]);
                            });

                            it('And should be changed view to current ID', function(){
                                expect(Viewer.prototype.changeView).toHaveBeenCalled();
                                expect(Viewer.prototype.changeView.calls.argsFor(0)).toEqual(
                                    [{ID: jasmine.any(Number)}]
                                );
                            });
                        });
                    });
                });
            });
        });
    });
});