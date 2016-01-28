(function() {

    angular
        .module('core')
        .factory('EditingStateFactory', ['EditingStateTree', EditingStateFactory]);

    function EditingStateFactory(EditingStateTree) {
        var factory = {
            identifyComponent: function identifyComponent(element) {
                return element.localName;
            },
            identifyType: function identifyType(element) {
                if (element.localName != 'question') {
                    return element.type;
                } else {
                    return element.attributes.type.nodeValue;
                }
            },
            selectDataStructure: function selectDataStructure(component, type, data, ngModel) {
                if (type)
                    return EditingStateTree[component][type](data, ngModel);
                else
                    return EditingStateTree[component](data, ngModel);
            },
            produce: function produce(element, ngModel) {
                var component = this.identifyComponent(element),
                    type = this.identifyType(element);

                return this.selectDataStructure(component, type, element, ngModel);
            }
        };

        return factory;
    }

}());
