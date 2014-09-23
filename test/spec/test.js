/*global describe, it */
'use strict';

define(['app/scripts/core'],function (Core) {
    describe('Give it some context', function () {
        describe('maybe a bit more context here', function () {
            it('should run here few assertions', function () {
                var core = new Core();
                expect(core.name).toBe('troy');
            });
        });
    });
});
