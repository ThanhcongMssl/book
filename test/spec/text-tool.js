/**
 * Created with WebStorm.
 * Name: text-tool.js
 * User: ThànhCông
 * Date: 9/29/2014
 * Time: 1:54 PM
 */

/*global define*/
define (
    ['facade', 'models/info', 'models/user', 'models/view', 'views/desktop/header/toolbar/text/main', 'views/desktop/content/viewer/main', 'views/desktop/content/main', 'views/desktop/main'],
    function(facade, InfoModel, UserModel, ViewModel, TextTool, Viewer, Content, App){
    describe('Text tool spec', function(){
        describe('Given the facade object', function(){

            InfoModel.set({
                part: [0, 300, 500],
                chapter: [
                    {id: 0, title: 'lorem ipsum 1'},
                    {id: 400, title: 'lorem ipsum 2'},
                    {id: 450, title: 'lorem ipsum 3'}
                ]
            });

            UserModel.set({
                currentID: 1,
                currentPart: 0,
                fontFamily: 'Arial',
                fontSize: 21,
                layout: 'two-page',
                backgroundColor: 'White',
                bookmark: [
                    {id: 30, title: 'lorem ipsum 1'},
                    {id: 100, title: 'lorem ipsum 2'}
                ]
            });

            ViewModel.set({
                idPerPage: 30,
                column: 2
            });

            describe('Given TextTool, Viewer class', function(){
                describe('When create new instance of TextTool, Viewer class', function(){
                    beforeEach(function(){
                        spyOn(Viewer.prototype, 'changeFontSize').and.callThrough();
                        spyOn(Viewer.prototype, 'changeFontStyle').and.callThrough();
                        spyOn(Viewer.prototype, 'changeLayout').and.callThrough();
                        spyOn(App.prototype, 'initialize').and.callFake(function(){
                            this.subscribe();
                            this.render();
                        });
                        spyOn(App.prototype, 'changeBackgroundColor').and.callThrough();
                        spyOn(App.prototype, 'changeLayout').and.callThrough();

                        spyOn(TextTool.prototype, 'initialize').and.callFake(function(){
                            this.render();
                        });
                        spyOn(TextTool.prototype, 'handleIncreaseSizeClick').and.callThrough();
                        spyOn(TextTool.prototype, 'handleDecreaseSizeClick').and.callThrough();
                        spyOn(TextTool.prototype, 'handleFontStyleChange').and.callThrough();
                        spyOn(TextTool.prototype, 'handleBackgroundColorChange').and.callThrough();
                        spyOn(TextTool.prototype, 'handleLayoutModeClick').and.callThrough();
                        spyOn(facade, 'publish').and.callThrough();

                        new App();
                        this.textTool = new TextTool();
                    });

                    it('Initialize function of App should be called', function(){
                        expect(App.prototype.initialize).toHaveBeenCalled();
                    });

                    it('Initialize function should be called', function(){
                        expect(TextTool.prototype.initialize).toBeDefined();
                        expect(TextTool.prototype.initialize).toHaveBeenCalled();
                    });

                    it('Handler should be called when inscrease font click', function(){
                        facade.publish.calls.reset();
                        this.textTool.$('.increase-size').click();

                        expect(TextTool.prototype.handleIncreaseSizeClick).toBeDefined();
                        expect(TextTool.prototype.handleIncreaseSizeClick).toHaveBeenCalled();

                        expect(facade.publish).toHaveBeenCalled();
                        expect(facade.publish.calls.argsFor(0)).toEqual(
                            ['Font:change-size', {size: jasmine.any(Number)}]
                        );
                        expect(Viewer.prototype.changeFontSize).toBeDefined();
                        expect(Viewer.prototype.changeFontSize.calls.mostRecent().args).toEqual(
                            [{size: jasmine.any(Number)}]
                        );
                    });

                    it('Handler should be called when descrease font click', function(){
                        facade.publish.calls.reset();
                        this.textTool.$('.decrease-size').click();

                        expect(TextTool.prototype.handleDecreaseSizeClick).toBeDefined();
                        expect(TextTool.prototype.handleDecreaseSizeClick).toHaveBeenCalled();

                        expect(facade.publish).toHaveBeenCalled();
                        expect(facade.publish.calls.argsFor(0)).toEqual(
                            ['Font:change-size', {size: jasmine.any(Number)}]
                        );

                        expect(Viewer.prototype.changeFontSize).toBeDefined();
                        expect(Viewer.prototype.changeFontSize.calls.mostRecent().args).toEqual(
                            [{size: jasmine.any(Number)}]
                        );
                    });

                    it('Handler should be called when font style change', function(){
                        facade.publish.calls.reset();
                        var $fontFamily = this.textTool.$('.font-family');
                        $fontFamily.val('Georgia');
                        $fontFamily.trigger('change');

                        expect(TextTool.prototype.handleFontStyleChange).toBeDefined();
                        expect(TextTool.prototype.handleFontStyleChange).toHaveBeenCalled();

                        expect(facade.publish).toHaveBeenCalled();
                        expect(facade.publish.calls.argsFor(0)).toEqual(
                            ['Font:change-style', {style: jasmine.any(String)}]
                        );

                        expect(Viewer.prototype.changeFontStyle).toBeDefined();
                        expect(Viewer.prototype.changeFontStyle.calls.mostRecent().args).toEqual(
                            [{style: jasmine.any(String)}]
                        );
                    });

                    it('Handler should be called when background color change', function(){
                        facade.publish.calls.reset();
                        this.textTool.$('.background-color[data-color=White]').click();

                        expect(TextTool.prototype.handleBackgroundColorChange).toBeDefined();
                        expect(TextTool.prototype.handleBackgroundColorChange).toHaveBeenCalled();

                        expect(facade.publish).toHaveBeenCalled();
                        expect(facade.publish.calls.mostRecent().args).toEqual(
                            ['Font:change-color', {color: 'White'}]
                        );

                        expect(App.prototype.changeBackgroundColor).toBeDefined();
                        expect(App.prototype.changeBackgroundColor).toHaveBeenCalled();
                        expect(App.prototype.changeBackgroundColor.calls.mostRecent().args).toEqual(
                            [{color: 'White'}]
                        );
                    });

                    it('Handler should be called when layout mode change', function(){
                        facade.publish.calls.reset();
                        this.textTool.$('.layout-mode[data-layout=one-page]').click();

                        expect(TextTool.prototype.handleLayoutModeClick).toBeDefined();
                        expect(TextTool.prototype.handleLayoutModeClick).toHaveBeenCalled();

                        expect(facade.publish).toHaveBeenCalled();
                        expect(facade.publish.calls.argsFor(0)).toEqual(
                            ['Layout:change', {layout: 'one-page'}]
                        );

                        expect(App.prototype.changeLayout).toBeDefined();
                        expect(App.prototype.changeLayout).toHaveBeenCalled();
                        expect(App.prototype.changeLayout.calls.argsFor(0)).toEqual(
                            [{layout: 'one-page'}]
                        );

                        expect(Viewer.prototype.changeLayout).toBeDefined();
                        expect(Viewer.prototype.changeLayout).toHaveBeenCalled();
                        expect(Viewer.prototype.changeLayout.calls.argsFor(0)).toEqual(
                            [{layout: 'one-page'}]
                        );
                    });
                });
            });
        });
    });
});