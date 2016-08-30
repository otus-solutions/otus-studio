(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.routeBuilder')
    .component('otusRuleEditor', {
      templateUrl: 'app/navigation-builder/route/editor/rule-editor-template.html',
      controller: component,
      bindings: {
        ruleData: '<',
        ruleItemIndex: '<',
        onDelete: '&'
      }
    });

  component.$inject = [
    'otusjs.studio.navigationBuilder.routeBuilder.RouteBuilderService'
  ];

  function component(RouteBuilderService) {
    var self = this;

    /* Public methods */
    self.$onInit = onInit;
    self.answers = answers;
    self.answerChange = answerChange;
    self.answerInputChange = answerInputChange;
    self.operatorChange = operatorChange;
    self.whens = whens;
    self.whenChange = whenChange;
    self.saveRule = saveRule;
    self.updateRule = updateRule;
    self.deleteRule = deleteRule;

    function onInit() {
      _initializeWhenList();

      if (self.ruleData) {
        self.ruleData.index = self.ruleItemIndex;
        self.selectedWhen = self.ruleData.when;
        self.selectedOperator = self.ruleData.operator;
        self.selectedAnswer = self.ruleData.answer.label || self.ruleData.answer;
        self.isOperatorDisable = false;
        self.isAnswerDisable = false;
        self.showSaveRuleButton = false;
        self.showUpdateRuleButton = true;
        self.showDeleteRuleButton = true;
      } else {
        self.isOperatorDisable = true;
        self.isAnswerDisable = true;
        self.showSaveRuleButton = true;
        self.showUpdateRuleButton = false;
        self.showDeleteRuleButton = false;
        self.readyToSave = _readyToSave();
      }
    }

    function answers(filterValue) {
      self.inputedValue = filterValue;
      if (!filterValue) {
        return self.answerList;
      } else {
        var filterResult = self.answerList.filter(function(answer) {
          return answer.label.search(filterValue) != -1 || self.selectedWhen.customID.search(filterValue) != -1;
        });
        return filterResult;
      }
    }

    function answerChange(answer) {
      self.readyToSave = _readyToSave();
    }

    function answerInputChange() {
      self.readyToSave = _readyToSave();
    }

    function operatorChange(operator) {
      self.selectedOperator = operator;
      self.readyToSave = _readyToSave();
    }

    function whens(filterValue) {
      if (!filterValue) {
        return self.whenList;
      } else {
        var filterResult = self.whenList.filter(function(when) {
          return when.label.search(filterValue) != -1 || when.customID.search(filterValue) != -1;
        });
        return filterResult;
      }
    }

    function whenChange(when) {
      self.selectedWhen = when;

      self.operators = [];
      self.answerList = [];

      if (self.selectedWhen) {
        // self.selectedOperator = undefined;
        self.operators = RouteBuilderService.getOperatorListForRule(self.selectedWhen.type);
        RouteBuilderService.getAnswerListForRule(self.selectedWhen.question).forEach(function(answer) {
          self.answerList.push(_createAnswerItem(answer));
        });
        self.isOperatorDisable = false;
      } else {
        // self.selectedOperator = undefined;
        self.isOperatorDisable = true;
      }

      self.readyToSave = _readyToSave();
    }

    function saveRule() {
      if (_readyToSave()) {
        RouteBuilderService.createRule(self.selectedWhen, self.selectedOperator, self.selectedAnswer);
      }
      self.whenSearchText = '';
      self.operatorSearchText = '';
      self.answerSearchText = '';
    }

    function updateRule() {
      RouteBuilderService.updateRule(self.ruleData.index, self.selectedWhen, self.selectedOperator, self.selectedAnswer);
    }

    function deleteRule() {
      RouteBuilderService.deleteRule(self.ruleData.index);
      self.onDelete({ruleIndex: self.ruleData.index});
    }

    function _initializeWhenList() {
      self.whenList = [];
      RouteBuilderService.getWhenListForRule().forEach(function(when) {
        self.whenList.push(_createWhenItem(when));
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

    function _readyToSave() {
      if (_resolveRuleWhen() && _resolveRuleOperator() && _resolveRuleAnswer()) {
        return true;
      } else {
        return false;
      }
    }

    function _resolveRuleWhen() {
      if (!self.selectedWhen) {
        return false;
      } else {
        return true;
      }
    }

    function _resolveRuleOperator() {
      if (!self.selectedOperator) {
        return false;
      } else {
        return true;
      }
    }

    function _resolveRuleAnswer() {
      if (!self.selectedAnswer && !self.inputedValue) {
        return false;
      } else if (!self.selectedAnswer && self.inputedValue) {
        self.selectedAnswer = self.inputedValue;
        return true;
      } else if (self.selectedAnswer) {
        return true;
      }
    }
  }
})();
