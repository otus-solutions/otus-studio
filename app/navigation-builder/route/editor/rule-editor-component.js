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
    'otusjs.studio.navigationBuilder.routeBuilder.RouteBuilderService',
    'otusjs.studio.navigationBuilder.routeBuilder.RuleAnswerBuilderService'
  ];

  function component(RouteBuilderService, RuleAnswerBuilderService) {
    var self = this;
    var _customAnswer;

    /* Public methods */
    self.$onInit = onInit;
    self.answers = answers;
    self.answerChange = answerChange;
    self.answerInputChange = answerInputChange;
    self.operatorChange = operatorChange;
    self.whens = whens;
    self.whenChange = whenChange;
    self.updateRule = updateRule;
    self.deleteRule = deleteRule;

    function onInit() {
      _initializeWhenList();

      self.ruleData.index = self.ruleItemIndex;
      _applyRuleDataWhen();
      _applyRuleDataOperator();
      _applyRuleDataAnswer();
      self.isOperatorDisable = false;
      self.isAnswerDisable = false;
      self.showDeleteRuleButton = true;
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

      if (self.ruleData.answer.isCustom) {
        self.selectedAnswer = self.answerList[0];
        self.selectedAnswer.option.label.ptBR.plainText = self.ruleData.answer.option.label.ptBR.plainText;
      } else {
        self.answerList.some(function(answer, index) {
          if (index > 0 && answer.option.value === self.ruleData.answer.option.value) {
            self.selectedAnswer = answer;
            return true;
          }
        });
      }
    }

    function answers(filterValue) {
      if (!filterValue) {
        return self.answerList;
      } else {
        var filterResult = self.answerList.filter(function(answer) {
          return answer.option.label.ptBR.plainText.search(filterValue) != -1 || self.selectedWhen.customID.search(filterValue) != -1;
        });
        return filterResult;
      }
    }

    function answerInputChange() {
      if (self.answerSearchText) {
        _customAnswer = true;
        self.selectedAnswer = self.answerList[0];
        self.selectedAnswer.option.label.ptBR.plainText = self.answerSearchText;
        self.readyToSave = _readyToSave();
      }
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

    /** Agora esse cara é o bichão mesmo! **/
    function answerChange(answer) {
      _customAnswer = false;
      self.selectedAnswer = answer;
      updateRule();
      self.readyToSave = _readyToSave();
    }

    function parseAnswer(answer) {
      self.answerList[0].option.label.ptBR.plainText = answer;
      return self.answerList[0];
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
      if (!_customAnswer && self.selectedAnswer) {
        return true;
      } else {
        return false;
      }
    }
  }
})();
