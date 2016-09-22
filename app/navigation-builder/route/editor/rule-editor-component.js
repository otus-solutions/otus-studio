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
        onUpdate: '&'
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
        _applyRuleDataWhen();
        _applyRuleDataOperator();
        _applyRuleDataAnswer();
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

    function _applyRuleDataWhen() {
      var customID = self.ruleData.when.customID || self.ruleData.when;
      self.whenList.some(function(when) {
        if (when.customID === customID) {
          self.selectedWhen = when;
          return true;
        }
      });
    }

    function _applyRuleDataOperator() {
      self.operatorList = RouteBuilderService.getOperatorListForRule(self.selectedWhen.type);
      var type = self.ruleData.operator.type || self.ruleData.operator;
      self.operatorList.some(function(operator) {
        if (operator.type === type) {
          self.selectedOperator = operator;
          return true;
        }
      });
    }

    function _applyRuleDataAnswer() {
      self.answerList = RouteBuilderService.getAnswerListForRule(self.selectedWhen.item);
      var value = (self.ruleData.answer.option) ?
        self.ruleData.answer.option.value :
        self.ruleData.answer;
        self.answerList.some(function(answer) {
        if (answer.option.value === value) {
          self.selectedAnswer = answer;
          return true;
        }
      });
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

    function answerInputChange() {
      self.readyToSave = _readyToSave();
    }

    function whens(filterValue) {
      if (!filterValue) {
        return self.whenList;
      } else {
        var filterResult = self.whenList.filter(function(when) {
          return when.label.ptBR.plainText.search(filterValue) != -1 || when.customID.search(filterValue) != -1;
        });
        return filterResult;
      }
    }

    function answerChange(answer) {
      self.selectedAnswer = answer;
      self.readyToSave = _readyToSave();
      updateRule();
    }

    function operatorChange(operator) {
      self.selectedOperator = operator;
      self.readyToSave = _readyToSave();
      updateRule();
    }

    function whenChange(when) {
      self.selectedWhen = when;

      self.operatorList = [];
      self.answerList = [];

      if (self.selectedWhen) {
        self.operatorList = RouteBuilderService.getOperatorListForRule(self.selectedWhen.type);
        self.answerList = RouteBuilderService.getAnswerListForRule(self.selectedWhen.item);
        self.isOperatorDisable = false;
      } else {
        self.isOperatorDisable = true;
      }

      self.readyToSave = _readyToSave();
      updateRule();
    }

    function saveRule() {
      if (_readyToSave()) {
        RouteBuilderService.createRule(self.selectedWhen, self.selectedOperator, self.selectedAnswer, self.selectedAnswer.isMetadata);
        self.onUpdate();
      }
      self.whenSearchText = '';
      self.operatorSearchText = '';
      self.answerSearchText = '';
    }

    function updateRule() {
      if (self.ruleData) {
        RouteBuilderService.updateRule(self.ruleData.index, self.selectedWhen, self.selectedOperator, self.selectedAnswer, self.selectedAnswer.isMetadata);
        self.onUpdate();
      }
    }

    function deleteRule() {
      RouteBuilderService.deleteRule(self.ruleData.index);
      self.onUpdate();
    }

    function _initializeWhenList() {
      self.whenList = [];
      self.whenList = RouteBuilderService.getWhenListForRule();
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
