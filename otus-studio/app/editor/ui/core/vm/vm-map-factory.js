(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('VmMapFactory', VmMapFactory);

    function VmMapFactory() {
        var self = this;

        self.create = create;

        function create() {
            return new VmMap();
        }

        return self;
    }

    function VmMap() {
        var self = this;

        var map = Immutable.Map();

        self.set = set;
        self.get = get;

        function set(vm) {
            map = map.set(vm.guid(), vm);
        }

        function get(key) {
            return map.get(key);
        }
    }

}());
