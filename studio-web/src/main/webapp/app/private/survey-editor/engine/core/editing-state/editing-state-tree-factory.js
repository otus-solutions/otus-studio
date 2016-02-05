(function() {

    angular
        .module('editor.engine.core')
        .factory('EditingStateTree', EditingStateTree);

    function EditingStateTree() {
        /* Editing state model */
        function EditingState() {
            this.domId = null;
            this.ngModel = null;
            this.value = null;
        }

        /* Register builders to data structures */
        var tree = {};

        tree.input = {
            text: function buildTextStructure(element, ngModel) {
                var structure = new EditingState();
                structure.domId = element.id;
                structure.ngModel = ngModel;
                structure.value = element.value;
                return structure;
            }
        };
        tree.input.password = tree.input.text;
        tree.input.number = tree.input.text;
        tree.textarea = {
            textarea: tree.input.text
        };
        tree.button = {
            button: function buildButtonStructure(element, ngModel) {
                var structure = new EditingState();
                structure.domId = element.id;
                structure.ngModel = element.attributes.target;
                structure.value = element.attributes.action.value;
                return structure;
            }
        };
        tree.question = {
            text: function buildTextQuestionStructure(element, ngModel) {
                var structure = new EditingState();
                structure.domId = element.id;
                structure.ngModel = ngModel;
                structure.value = element;
                return structure;
            },
            checkbox: function buildCheckboxQuestionStructure(element, ngModel) {
                var structure = new EditingState();
                structure.domId = element.id;
                structure.ngModel = ngModel;
                structure.value = element;
                return structure;
            }
        };

        return tree;
    }

}());
