(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.routeBuilder')
    .component('otusRuleEditor', {
      templateUrl: 'app/navigation-builder/route/editor/rule-editor-template.html',
      controller: component,
      bindings: {
        createMode: '<'
      }
    });

  component.$inject = [
    'otusjs.studio.navigationBuilder.routeBuilder.RouteBuilderService'
  ];

  function component(RouteBuilderService) {
    var self = this;
    var _whenList = [];
    var _answerList = [];

    /* Public methods */
    self.$onInit = onInit;
    self.whens = whens;
    self.answers = answers;
    self.saveRule = saveRule;
    self.whenChange = whenChange;
    self.operatorChange = operatorChange;
    self.answerChange = answerChange;

    function onInit() {
      _initializeWhenList();
      self.isOperatorDisable = true;
      self.isAnswerDisable = true;
      self.showSaveRuleButton = self.createMode;
      self.showDeleteRuleButton = !self.createMode;

      console.log(self.showSaveRuleButton);
      console.log(self.showDeleteRuleButton);
    }

    function whens(filterValue) {
      if (!filterValue) {
        return _whenList;
      } else {
        var filterResult = _whenList.filter(function(when) {
          return when.label.search(filterValue) != -1 || when.customID.search(filterValue) != -1;
        });
        return filterResult;
      }
    }

    function answers(filterValue) {
      if (!filterValue) {
        return _answerList;
      } else {
        var filterResult = _answerList.filter(function(answer) {
          return answer.label.search(filterValue) != -1 || answer.customID.search(filterValue) != -1;
        });
        return filterResult;
      }
    }

    function whenChange(when) {
      self.selectedWhen = when;
      if (self.selectedWhen) {
        self.operators = [];
        self.selectedOperator = undefined;
        self.operators = RouteBuilderService.getOperatorListForRule(self.selectedWhen.type);
        RouteBuilderService.getAnswerListForRule(self.selectedWhen.question).forEach(function(answer) {
          _answerList.push(_createAnswerItem(answer));
        });
        self.isOperatorDisable = false;
      } else {
        self.operators = [];
        self.selectedOperator = undefined;
        self.answers = [];
        self.isOperatorDisable = true;
      }
    }

    function operatorChange(operator) {
      self.selectedOperator = operator;
    }

    function answerChange(answer) {
    }

    function saveRule() {
      RouteBuilderService.addRule(self.selectedWhen, self.selectedOperator, self.selectedAnswer);
    }

    function deleteRule() {
    }

    function _initializeWhenList() {
      RouteBuilderService.getWhenListForRule().forEach(function(when) {
        _whenList.push(_createWhenItem(when));
      });
    }

    function _createWhenItem(whenData) {
      return {
        type: whenData.objectType,
        icon: whenData.objectType,
        customID: whenData.customID,
        label: whenData.label.ptBR.plainText,
        validators: whenData.validators(),
        question: whenData
      };
    }

    function _createAnswerItem(answerData) {
      return {
        value: answerData.value,
        label: answerData.label.ptBR.plainText,
        option: answerData
      };
    }
  }
})();
