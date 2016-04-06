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
        var self = this;
        var instance = null;

        var USER_EDITS_COLLECTION = 'userEdits';
        var DATA_POOL_COLLECTION = 'dataPool';

        init();

        function init() {
            instance = new Loki('in-session-db.json');
            self[USER_EDITS_COLLECTION] = new CollectionFacade(instance.addCollection(USER_EDITS_COLLECTION));
            self[DATA_POOL_COLLECTION] = new CollectionFacade(instance.addCollection(DATA_POOL_COLLECTION));
        }
    }

    function CollectionFacade(collectionReference) {
        var self = this;

        /* Public interface */
        self.store = store;
        self.fetchEventBy = fetchEventBy;
        self.fetchLastSelectEvent = fetchLastSelectEvent;
        self.fetchLastAddEvent = fetchLastAddEvent;
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

            if (!event) {
                self.collection.insert(data);

            } else {
                remove(event);
                store(data);
            }
        }

        function fetchEventBy(attribute, value) {
            var data = self.collection.chain()
                        .where(function(obj) {
                            return getModelValue(attribute, obj) == value;
                        })
                        .simplesort('$loki', 'isdesc').data();

            return data;
        }

        function fetchLastSelectEvent() {
            var data = self.collection.chain()
                        .where(function(event) {
                            return event.type.isSelectData();
                        })
                        .simplesort('$loki', 'isdesc').data();

            return data[0];
        }

        function fetchLastAddEvent() {
            var data = self.collection.chain()
                        .where(function(event) {
                            return event.type.isAddData();
                        })
                        .simplesort('$loki', 'isdesc').data();

            return data[0];
        }

        function remove(data) {
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
