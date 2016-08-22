(function() {
    'use strict';

    angular.module('otusjs.studio.navigationBuilder', [
        'otusjs.studio.navigationBuilder.model',
        'otusjs.studio.navigationBuilder.routeBuilder',
        'ngMaterial'
    ])
    .constant('NBEVENTS', {
        /* Map root */
        'MAP_CONTAINER_READY': 'nbevents.map.container.ready',
        'ROUTE_BUILD_STARTED': 'nbevents.map.route.started',
        'ROUTE_BUILD_CANCELED': 'nbevents.map.route.build.canceled',
        'ORIGIN_NODE_SELECTED': 'nbevents.map.route.node.origin.selected',
        'ORIGIN_NODE_UNSELECTED': 'nbevents.map.route.node.origin.unselected',
        'DESTINATION_NODE_SELECTED': 'nbevents.map.route.node.destination.selected',
        'DESTINATION_NODE_UNSELECTED': 'nbevents.map.route.node.destination.unselected',

        /* Messenger root */
        'SHOW_MESSENGER': 'nbevents.messenger.show',
        'HIDE_MESSENGER': 'nbevents.messenger.hide'
    })
    .constant('NBMESSAGES', {
        'ROUTE_BUILDER': {
          'SELECT_ORIGIN': {
            header: 'Origem da Rota',
            content: 'Escolha o item que determinará o início da rota.'
          },
          'SELECT_DESTINATION': {
            header: 'Destino da Rota',
            content: 'Escolha o item que determinará o destino da rota.'
          }
        }
    });
}());
