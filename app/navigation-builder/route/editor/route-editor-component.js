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
    var i = 0;
    self.routeConditions = [];
    self.groups = [];

    /* Public methods */
    self.$onInit = onInit;
    self.deleteRule = deleteRule;
    self.cancel = cancel;
    self.save = save;
    self.createGroupCondition = createGroupCondition;

    function onInit() {
      _initializeLabels();
      RouteBuilderService.startRouteBuilding(self.originNode, self.destinationNode);
      self.condition = RouteBuilderService.selectedCondition();
    }

    function deleteRule(ruleIndex) {
      RouteBuilderService.selectedCondition().rules.splice(ruleIndex, 1);
    }

    function cancel() {
      RouteBuilderService.cancelRouteBuilding();
    }

    function save() {
      RouteBuilderService.saveRouteBuilding();
    }

    function createGroupCondition() {
      self.groups.push(RouteBuilderService.selectedCondition());
    }

    function _initializeLabels() {
      self.label = {
        dialog: {
          title: 'Criar nova Rota'
        },
        button: {
          cancel: 'Cancelar',
          save: 'Salvar Rota',
          createGroupCondition: 'Criar grupo de Regras',
          deleteCondition: 'Excluir grupo atual'
        },
        origin: 'Origem',
        destination: 'Destino',
        originNode: self.originNode.label,
        destinationNode: self.destinationNode.label,
        message: {
          emptyConditions: 'Você ainda não criou condições de rota. Clicando em CRIAR GRUPO DE REGRAS',
        }
      };
    }
  }
})();
