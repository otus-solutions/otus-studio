(function() {

    angular
        .module('editor.editing')
        .factory('QuestionContainerButton', [QuestionContainerButton]);

    function QuestionContainerButton() {
        return function(element) {
            this.reference = element;
            this.id = element.attr('id');
            this.status = 'collapsed';
            this.alreadyLoaded = false;

            this.addClass = function(className) {
                this.reference.addClass(className);
            };
            this.removeClass = function(className) {
                this.reference.removeClass(className);
            };
        };
    }

}());
