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

    self.selectedRoute = [];
    self.conditions = [];

    /* Public methods */
    self.$onInit = onInit;
    self.cancel = cancel;
    self.save = save;
    self.deleteRoute = deleteRoute;
    self.createCondition = createCondition;
    self.selectCondition = selectCondition;
    self.deleteCondition = deleteCondition;
    self.readyToSave = readyToSave;

    function onInit() {
      self.childRules = [];
      _initializeLabels();
      RouteBuilderService.startRouteBuilding(self.originNode, self.destinationNode);
      self.isNewRoute = RouteBuilderService.isNewRoute();
      self.selectedRoute = RouteBuilderService.selectedRoute();
      self.conditions = RouteBuilderService.selectedRoute().conditions;
      readyToSave();
    }

    function cancel() {
      RouteBuilderService.cancelRouteBuilding();
    }

    function save() {
      RouteBuilderService.saveRouteBuilding();
    }

    function deleteRoute() {
      RouteBuilderService.deleteRoute();
    }

    function createCondition() {
      RouteBuilderService.createCondition();
    }

    function deleteCondition(index) {
      RouteBuilderService.deleteCondition(index);
    }

    function selectCondition(index) {
      RouteBuilderService.selectCondition(index);
    }

    function readyToSave() {
      if (self.selectedRoute.isDefault) {
        return true;
      } else {
        if (!self.selectedRoute.conditions.length) {
          createCondition();
        }
        return !!self.selectedRoute.conditions[0].rules.length;
      }
    }

    function _initializeLabels() {
      self.label = {
        dialog: {
          title: 'Criar nova Rota'
        },
        button: {
          cancel: 'Cancelar',
          save: 'Salvar Rota',
          createCondition: 'Criar condição de rota',
          deleteRoute: 'Exluir esta rota'
        },
        origin: 'Origem',
        destination: 'Destino',
        originNode: self.originNode.label,
        destinationNode: self.destinationNode.label,
        conditionTitle: 'Regras de condição',
        isDefaultRoute: 'Rota padrão',
        message: {
          emptyConditions: 'Você ainda não criou condições de rota. Clicando em CRIAR CONDIÇÃO DE ROTA.',
        }
      };
    }

    self.deleteRule = function(rule) {
      RouteBuilderService.deleteRule(rule);

      let childs = [];
      self.childRules.map(childs.push);
      self.childRules = [];
      self.condition = RouteBuilderService.selectedCondition();

      condition.rules.forEach(function(rule, index) {
        childs.forEach(function(child) {
          child.ruleData = rule;
          child.ruleData.index = index;
          child.$onInit();
        });
      });
    }
  }
})();
