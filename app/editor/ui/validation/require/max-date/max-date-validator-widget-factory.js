(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('MaxDateValidatorWidgetFactory', MaxDateValidatorWidgetFactory);

        MaxDateValidatorWidgetFactory.$inject = [
            'otusjs.utils.ImmutableDate'
        ];

    function MaxDateValidatorWidgetFactory(ImmutableDate) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(scope, element) {
            return new MaxDateValidator(scope, element, ImmutableDate);
        }

        return self;
    }

    function MaxDateValidator(scope, element, ImmutableDate) {
        var self = this;
        var whoAmI = 'maxDate';


        /* Public Methods */
        self.data = '';
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var question = scope.$parent.widget.getItem();

        _init();

        function _init() {
            self.data = new ImmutableDate(question.fillingRules.options[whoAmI].data.reference.value);
            self.canBeIgnored = question.fillingRules.options[whoAmI].data.canBeIgnored;
            updateData();
        }

        function updateData() {
            getRuleType().data.reference = self.data.toJSON(); //TODO remover quando refatorar load de transição edição -> preview do studio. Atualmente preview é carregado com objecto em memória e não fromJSON e gera erro com o ImmutableDate. (presente em validadores de tempo e data.)
            scope.$parent.widget.updateFillingRules();
        }

        function getRuleType() {
            return question.fillingRules.options[whoAmI];
        }

        function deleteValidator() {
            scope.$parent.widget.deleteValidator(whoAmI);
            element.remove();
            scope.$destroy();
        }

    }

}());
