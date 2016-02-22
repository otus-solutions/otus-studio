(function() {

    angular
        .module('otusjs')
        .service('UpdateWorkFactory', UpdateWorkFactory);

    function UpdateWorkFactory() {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new UpdateWork();
        }

        return self;
    }

    function UpdateWork() {
        var self = this;

        self.survey = null;
        self.target = null;
        self.data = null;
        self.type = null;
        self.model = null;
    }

}());
