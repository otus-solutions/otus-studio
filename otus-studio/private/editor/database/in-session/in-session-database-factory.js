(function() {
    'use strict';

    angular
    .module('editor.database')
    .factory('InSessionDatabaseFactory', InSessionDatabaseFactory);

    InSessionDatabaseFactory.$inject = ['Loki'];

    function InSessionDatabaseFactory(Loki) {
        var self = this;

        /* Public interface */
        self.create = create;

        function create() {
            return new InSessionDatabase(Loki);
        }

        return self;
    }

    function InSessionDatabase(Loki) {
        var self = this,
            instance = null;

            var USER_EDITS_COLLECTION = 'userEdits';

            init();

            function init() {
                instance = new Loki('in-session-db.json');
                self[USER_EDITS_COLLECTION] = new CollectionFacade(instance.addCollection(USER_EDITS_COLLECTION));
            }
    }

    function CollectionFacade(collectionReference) {
        var self = this;

        /* Public interface */
        self.store = store;
        self.fetchEventBy = fetchEventBy;
        self.storeUnique = storeUnique;

        init();

        function init() {
            Object.defineProperty(self, 'collection', {
                value: collectionReference,
                writable: false
            });
        }

        function store(data) {
            self.collection.insert(data);
        }

        function storeUnique(data) {
            var event = fetchEventBy('id', data.source.id);

            if(!event){
                self.collection.insert(data);

            }else{
                remove(event);
                store(data);
            }
        }

        function fetchEventBy(attribute, value){
            return self.collection.chain().where(function (obj){return getModelValue(attribute, obj) == value}).simplesort('$loki', 'isdesc').data();
        }

        function remove(data){
            self.collection.remove(data);
        }

        function getModelValue(modelpath, model) {
            var pathArray = modelpath.split('.');
            var modelValue = model;

            pathArray.forEach(function(path) {
               modelValue = modelValue[path];
            });

            return modelValue;
        }
    }

}());
