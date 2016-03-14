describe('Memory Module', function() {
    beforeEach(module('memory'));

    var MemoryCache;

    beforeEach(inject(function(_MemoryCache_) {
        MemoryCache = _MemoryCache_;
    }));

    describe('MemoryCache Factory', function() {
        it('should return a object', function() {
            /**
             *
             * The 'toBeDefined' matcher compares against `undefined`
             *
             */
            expect(MemoryCache).toBeDefined();
        });

    });

});
