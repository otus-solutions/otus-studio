(function() {
    'use strict';

    angular
        .module('editor.ui')
        .service('QuestionPropertiesContentService', QuestionPropertiesContentService);

    QuestionPropertiesContentService.$inject = ['WorkspaceService'];

    function QuestionPropertiesContentService(WorkspaceService) {
        var self = this,
            observers = [];

        /* Public interface */
        self.loadQuestion = loadQuestion;
        self.registerObserver = registerObserver;

        function loadQuestion(question) {
            notifyObservers(question);
        }

        function registerObserver(observer) {
            var registered = observers.filter(function (o) {
                if (o.identifier === observer.identifier) {
                    return o;
                }
            });

            if (registered.length === 0)
                observers.push(observer);
        }

        function notifyObservers(question) {
            observers.forEach(function(observer) {
                observer.update(question);
            });
        }
    }

}());
