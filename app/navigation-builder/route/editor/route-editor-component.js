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
        onCancel: '<',
        onConfirm: '<'
      }
    });

  component.$inject = [
    'otusjs.studio.navigationBuilder.routeBuilder.RouteBuilderService'
  ];

  function component(RouteBuilderService) {
    var self = this;
    var _rootNavigation = {};

    /* Public methods */
    self.$onInit = onInit;
    self.addCondition = addCondition;
    self.selectCondition = selectCondition;
    self.cancel = cancel;
    self.save = save;

    function onInit() {
      _initializeLabels();
      _rootNavigation = self.originNode.navigation;
      RouteBuilderService.startRouteBuilding();
      self.selectedRoute = RouteBuilderService.routeData;
    }

    function addCondition() {
      var newConditionData = {};
      newConditionData.name = 'GRUPO DE REGRAS ' + self.selectedRoute.conditionSet.length;
      newConditionData.rules = [];

      RouteBuilderService.routeData.conditionSet.push(newConditionData);
    }

    function selectCondition(condition) {
      self.selectedCondition = condition;
      console.dir(self.selectedCondition);
    }

    function cancel() {
      self.onCancel();
    }

    function save() {
      console.dir(RouteBuilderService.routeData);
    }

    function _initializeLabels() {
      self.label = {
        dialog: {
          title: 'Criar nova Rota'
        },
        button: {
          cancel: 'Cancelar',
          save: 'Salvar Rota',
          createCondition: 'Criar grupo de Regras'
        },
        origin: 'Origem',
        destination: 'Destino',
        originNode: self.originNode.label,
        destinationNode: self.destinationNode.label,
        message: {
          emptyConditions: 'Você ainda não criou condições de rota. Faça isso clicando em "Criar condição"',
        }
      };
    }
  }
})();
