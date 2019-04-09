(function() {
  'use strict';

  angular.module('otusjs.studio.navigationBuilder', [
      'otusjs.studio.navigationBuilder.routeBuilder',
      'otusjs.studio.navigationBuilder.navigationInspector',
      'otusjs.studio.navigationBuilder.navigationRoutePriority',
      'otusjs.studio.navigationBuilder.messenger',
      'ngMaterial'
    ])
    .constant('NBEVENTS', {
      /* Module events */
      'NAVIGATION_BUILDER_ON': 'nbevents.navigation.builder.on',
      'NAVIGATION_UPDATED': 'nbevents.navigation.updated',
      'MAP_CONTAINER_READY': 'nbevents.map.container.ready',
      'RELOAD_MAP_DATA': 'nbevents.map.data.reload',
      /* Route events */
      'ROUTE_MODE_ON': 'nbevents.route.mode.on',
      'ROUTE_MODE_OFF': 'nbevents.route.mode.off',
      'ROUTE_DELETED': 'nbevents.route.deleted',
      'ROUTE_BUILD_STARTED': 'nbevents.route.started',
      'ROUTE_BUILD_SAVED': 'nbevents.route.build.saved',
      'ROUTE_BUILD_CANCELED': 'nbevents.route.build.canceled',
      /* Route Node events */
      'ORIGIN_NODE_SELECTED': 'nbevents.route.node.origin.selected',
      'ORIGIN_NODE_UNSELECTED': 'nbevents.route.node.origin.unselected',
      'DESTINATION_NODE_SELECTED': 'nbevents.route.node.destination.selected',
      'DESTINATION_NODE_UNSELECTED': 'nbevents.route.node.destination.unselected',
      /* Messenger events */
      'SHOW_MESSENGER': 'nbevents.messenger.show',
      'HIDE_MESSENGER': 'nbevents.messenger.hide',

      /* Navigation Route Priority events */
      'ROUTE_PRIORITY_MODE_ON': 'nbevents.priority.mode.on',
      'ROUTE_PRIORITY_MODE_OFF': 'nbevents.priority.mode.off',

      /* Navigation Inspector events */
      'INSPECTOR_MODE_ON': 'nbevents.inspector.mode.on',
      'NAVIGATION_SELECTED': 'nbevents.inspector.navigation.selected',
      'NAVIGATION_UNSELECTED': 'nbevents.inspector.navigation.unselected',

      /* Warning events */
      'ORPHANS_ENCOUNTERED': 'nbevents.warning.orphans.encountered'
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
      },
      'NAVIGATION_INSPECTOR': {
        'SELECT_NAVIGATION': {
          header: 'Inspecionar navegação',
          content: 'Escolha o item que você deseja inspecionar.'
        }
      },
      'NAVIGATION_PRIORITY': {
        'SELECT_NAVIGATION': {
          header: 'Priorizar navegação',
          content: 'Escolha o item que você deseja priorizar.'
        }
      }
    })
    .run([
      'otusjs.studio.navigationBuilder.NavigationBuilderScopeService',
      'otusjs.studio.navigationBuilder.NavigationBuilderService',
      '$rootScope',
      function(NavigationBuilderScopeService, NavigationBuilderService, $rootScope) {
        NavigationBuilderScopeService.initialize($rootScope.$new());

        NavigationBuilderScopeService.onEvent(NavigationBuilderScopeService.NBEVENTS.NAVIGATION_BUILDER_ON, function(event, survey) {
          NavigationBuilderService.setSurvey(survey);
          NavigationBuilderScopeService.emit(NavigationBuilderScopeService.NBEVENTS.MAP_CONTAINER_READY);
        });

        NavigationBuilderScopeService.onEvent(NavigationBuilderScopeService.NBEVENTS.RELOAD_MAP_DATA, function(event) {
          NavigationBuilderService.reloadMapData();
          NavigationBuilderScopeService.emit(NavigationBuilderScopeService.NBEVENTS.MAP_CONTAINER_READY);
        });
      }
    ]);
}());
