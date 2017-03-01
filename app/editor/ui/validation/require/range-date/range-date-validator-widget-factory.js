(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('RangeDateValidatorWidgetFactory', RangeDateValidatorWidgetFactory);

        RangeDateValidatorWidgetFactory.$inject = [
            'otusjs.utils.ImmutableDate'
        ];

    function RangeDateValidatorWidgetFactory(ImmutableDate) {
        var self = this;

        /* Public interface */
        self.create = create;
        function create(scope, element) {
            return new RangeDateValidator(scope, element, ImmutableDate);
        }

        return self;
    }

    function RangeDateValidator(scope, element, ImmutableDate) {
        var self = this;
        var whoAmI = 'rangeDate';


        /* Public Methods */
        self.data = {
            'initial': '',
            'end': ''
        };
        self.updateData = updateData;
        self.deleteValidator = deleteValidator;

        var question = scope.$parent.widget.getItem();

        _init();

        function _init() {
            var avaiableRules = question.fillingRules.options;
            var reference = avaiableRules[whoAmI].data.reference;
            self.data.initial = new ImmutableDate(reference.initial.value);
            self.data.end = new ImmutableDate(reference.end.value);
            self.canBeIgnored = question.fillingRules.options[whoAmI].data.canBeIgnored;
            self.updateData();
        }

        function updateData() {
            getRuleType().data.reference.initial = self.data.initial.toJSON(); //TODO remover quando refatorar load de transição edição -> preview do studio. Atualmente preview é carregado com objecto em memória e não fromJSON e gera erro com o ImmutableDate. (presente em validadores de tempo e data.)
            getRuleType().data.reference.end = self.data.end.toJSON();
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
