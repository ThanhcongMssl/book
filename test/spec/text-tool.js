/**
 * Created with WebStorm.
 * Name: text-tool.js
 * User: ThànhCông
 * Date: 9/29/2014
 * Time: 1:54 PM
 */

/*global define*/
define (['facade', 'views/desktop/header/toolbar/text/main', 'views/desktop/content/viewer/main', 'views/desktop/content/main'], function(facade, TextTool, Viewer, Content){
    describe('Text tool spec', function(){
        describe('Given the facade object', function(){
            describe('Given TextTool, Viewer class', function(){
                describe('When create new instance of TextTool, Viewer class', function(){
                    beforeEach(function(){
                        spyOn(Viewer.prototype, 'changeFontSize').and.callThrough();
                        spyOn(Viewer.prototype, 'changeFontStyle').and.callThrough();
                        spyOn(Content.prototype, 'changeBackgroundColor').and.callThrough();

                        spyOn(TextTool.prototype, 'handleIncreaseSizeClick').and.callThrough();
                        spyOn(TextTool.prototype, 'handleDecreaseSizeClick').and.callThrough();
                        spyOn(TextTool.prototype, 'handleFontStyleChange').and.callThrough();
                        spyOn(TextTool.prototype, 'handleBackgroundColorChange').and.callThrough();
                        spyOn(facade, 'publish').and.callThrough();

                        new Content();
                        this.textTool = new TextTool();
                    });

                    it('Handler should be called when inscrease font click', function(){
                        this.textTool.$('.increase-size').click();

                        expect(TextTool.prototype.handleIncreaseSizeClick).toBeDefined();
                        expect(TextTool.prototype.handleIncreaseSizeClick).toHaveBeenCalled();

                        expect(facade.publish).toHaveBeenCalled();
                        expect(facade.publish.calls.mostRecent().args).toEqual(
                            ['Font:change-size', {size: jasmine.any(Number)}]
                        );
                        expect(Viewer.prototype.changeFontSize).toBeDefined();
                        expect(Viewer.prototype.changeFontSize.calls.mostRecent().args).toEqual(
                            [{size: jasmine.any(Number)}]
                        );
                    });

                    it('Handler should be called when descrease font click', function(){
                        this.textTool.$('.decrease-size').click();

                        expect(TextTool.prototype.handleDecreaseSizeClick).toBeDefined();
                        expect(TextTool.prototype.handleDecreaseSizeClick).toHaveBeenCalled();

                        expect(facade.publish).toHaveBeenCalled();
                        expect(facade.publish.calls.mostRecent().args).toEqual(
                            ['Font:change-size', {size: jasmine.any(Number)}]
                        );

                        expect(Viewer.prototype.changeFontSize).toBeDefined();
                        expect(Viewer.prototype.changeFontSize.calls.mostRecent().args).toEqual(
                            [{size: jasmine.any(Number)}]
                        );
                    });

                    it('Handler should be called when font style change', function(){
                        var $fontFamily = this.textTool.$('.font-family');
                        $fontFamily.val('Georgia');
                        $fontFamily.trigger('change');

                        expect(TextTool.prototype.handleFontStyleChange).toBeDefined();
                        expect(TextTool.prototype.handleFontStyleChange).toHaveBeenCalled();

                        expect(facade.publish).toHaveBeenCalled();
                        expect(facade.publish.calls.mostRecent().args).toEqual(
                            ['Font:change-style', {style: jasmine.any(String)}]
                        );

                        expect(Viewer.prototype.changeFontStyle).toBeDefined();
                        expect(Viewer.prototype.changeFontStyle.calls.mostRecent().args).toEqual(
                            [{style: jasmine.any(String)}]
                        );
                    });

                    it('Handler should be called when background color change', function(){
                        this.textTool.$('.background-color[data-color=White]').click();

                        expect(TextTool.prototype.handleBackgroundColorChange).toBeDefined();
                        expect(TextTool.prototype.handleBackgroundColorChange).toHaveBeenCalled();

                        expect(facade.publish).toHaveBeenCalled();
                        expect(facade.publish.calls.mostRecent().args).toEqual(
                            ['Font:change-color', {color: 'White'}]
                        );

                        expect(Content.prototype.changeBackgroundColor).toBeDefined();
                        expect(Content.prototype.changeBackgroundColor.calls.mostRecent().args).toEqual(
                            [{color: 'White'}]
                        );
                    });
                });
            });
        });
    });
});