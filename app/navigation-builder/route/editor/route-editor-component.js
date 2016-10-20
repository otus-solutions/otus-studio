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
    var _childs = {};

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
    self.childRules = childRules;

    function onInit() {
      _childs = {};
      _initializeLabels();
      RouteBuilderService.startRouteBuilding(self.originNode, self.destinationNode);
      self.isNewRoute = RouteBuilderService.isNewRoute();
      self.selectedRoute = RouteBuilderService.selectedRoute();
      self.conditions = RouteBuilderService.selectedRoute().conditions;

      self.conditions.forEach(function(condition) {
        _childs[condition.name] = [];
      });

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
      _childs[self.conditions[self.conditions.length - 1].name] = [];
    }

    function deleteCondition(index, condition) {
      delete _childs[condition.name];
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
        return self.selectedRoute.conditions.every(function(condition) {
          return condition.rules.length > 0;
        });
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

    function childRules(condition) {
      return _childs[condition.name];
    }

    self.deleteRule = function(ruleEditor) {
      var condition = RouteBuilderService.selectedCondition();
      var editorToDelete = _childs[condition.name].indexOf(ruleEditor);

      condition.rules.forEach(function(rule, index) {
        _childs[condition.name][index].ruleData.index = index;
      });

      RouteBuilderService.deleteRule(ruleEditor.ruleData.index);
      _childs[condition.name].splice(ruleEditor.ruleData.index, 1);
    }
  }
})();
