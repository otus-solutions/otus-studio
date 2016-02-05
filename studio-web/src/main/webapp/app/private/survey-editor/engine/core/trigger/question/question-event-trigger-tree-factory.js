(function() {

    angular
        .module('editor.engine.core')
        .factory('QuestionEventTriggerTree', [QuestionEventTriggerTree]);

    function QuestionEventTriggerTree() {
        var tree = {};

        // question-type/
        tree.text = function() {};
        tree.number = function() {};
        tree.singleSelection = function() {};
        tree.date = function() {};
        tree.time = function() {};
        tree.checkbox = function() {};

        return tree;
    }

}());
