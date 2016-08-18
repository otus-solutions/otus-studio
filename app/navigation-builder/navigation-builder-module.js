(function() {
    'use strict';

    angular.module('otusjs.studio.navigationBuilder', [
        'otusjs.studio.navigationBuilder.model'
    ])
    .constant('NBEVENTS', {
        'MAP_CONTAINER_READY': 'nbevents.map.container.ready',
        'ROUTE_SERVICE_MODE_ACTIVE': 'nbevents.map.service.route',
        'ORIGIN_NODE_SELECTED': 'nbevents.map.node.origin.selected',
        'DESTINATION_NODE_SELECTED': 'nbevents.map.node.destination.selected',
    });
}());
