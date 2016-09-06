(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.routeBuilder')
    .component('otusRouteEditor', {
      templateUrl: 'app/navigation-builder/route/editor/route-editor.html',
      controller: component,
      bindings: {
        originNode: '<',
        destinationNode: '<',
        onConfirm: '&'
      }
    });

  component.$inject = [
    'otusjs.studio.navigationBuilder.routeBuilder.RouteBuilderService'
  ];

  function component(RouteBuilderService) {
    var self = this;

    self.conditions = [];

    /* Public methods */
    self.$onInit = onInit;
    self.cancel = cancel;
    self.save = save;
    self.createCondition = createCondition;
    self.selectCondition = selectCondition;

    function onInit() {
      _initializeLabels();
      RouteBuilderService.startRouteBuilding(self.originNode, self.destinationNode);
      self.conditions = RouteBuilderService.selectedRoute().conditionSet;
    }

    function cancel() {
      RouteBuilderService.cancelRouteBuilding();
    }

    function save() {
      RouteBuilderService.saveRouteBuilding();
    }

    function createCondition() {
      RouteBuilderService.createCondition();
    }

    function selectCondition(index) {
      RouteBuilderService.selectCondition(index);
    }

    function _initializeLabels() {
      self.label = {
        dialog: {
          title: 'Criar nova Rota'
        },
        button: {
          cancel: 'Cancelar',
          save: 'Salvar Rota',
          createCondition: 'Criar condição de rota'
        },
        origin: 'Origem',
        destination: 'Destino',
        originNode: self.originNode.label,
        destinationNode: self.destinationNode.label,
        conditionTitle: 'Regras de condição',
        message: {
          emptyConditions: 'Você ainda não criou condições de rota. Clicando em CRIAR CONDIÇÃO DE ROTA.',
        }
      };
    }
  }
})();
