(function() {
    'use strict';

    angular
        .module('otusjs.modelBuilder')
        .factory('BuilderFactory', BuilderFactory);

    BuilderFactory.$inject = [
        'BuilderSelectorService',
        'BuilderMapService'
    ];

    function BuilderFactory(BuilderSelectorService, BuilderMapService) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create(editingTarget) {
            var builderName = BuilderSelectorService.getBuilderName(editingTarget),
                builder = BuilderMapService.getBuilder(builderName);

            return builder;
        }

        return self;
    }

}());
