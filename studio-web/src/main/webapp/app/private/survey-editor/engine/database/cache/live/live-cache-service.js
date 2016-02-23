(function() {
    'use strict';

    angular
        .module('editor.engine.database.cache')
        .service('LiveCacheService', LiveCacheService);

    function LiveCacheService() {
        var self = this;

        /* Public interface */
        self.resetAll = resetAll;
        self.useNextQuestionOIDNumber = useNextQuestionOIDNumber;

        resetAll();

        function resetAll() {
            self.nextQuestionOIDNumber = 0;
        }

        function useNextQuestionOIDNumber() {
            var reservedNextQuestionOIDNumber = self.nextQuestionOIDNumber;
            ++self.nextQuestionOIDNumber;
            return reservedNextQuestionOIDNumber;
        }
    }

}());
