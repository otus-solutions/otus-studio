(function() {
    'use strict';

    angular.module('otusjs.studio.navigationBuilder', [
        'otusjs.studio.navigationBuilder.model'
    ])
    .constant('NBEVENTS', {
        'MAP_CONTAINER_READY': 'nbevents.map.container.ready',
        'DATA_PANEL_OPEN': 'nbevents.data.panel.open'
    });
}());
