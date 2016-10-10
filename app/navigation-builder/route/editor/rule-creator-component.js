(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder.routeBuilder')
    .component('otusRuleCreator', {
      templateUrl: 'app/navigation-builder/route/editor/rule-creator-template.html',
      controller: component
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
    self.saveRule = saveRule;

    function onInit() {
      _initializeWhenList();

      self.isOperatorDisable = true;
      self.isAnswerDisable = true;
      self.showSaveRuleButton = true;
      self.readyToSave = _readyToSave();
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
        self.selectedAnswer.isCustom = true;
        self.selectedAnswer.option.label.ptBR.plainText = self.answerSearchText;
        self.readyToSave = _readyToSave();
      }
      console.log("_customAnswer");
      console.log(_customAnswer);
    }

    function answerChange(answer) {
      // if (!self.selectedAnswer.isCustom) {
        _customAnswer = false;
        console.log("passei aqui!");
        self.selectedAnswer = answer;
        self.readyToSave = _readyToSave();
      // }
    }

    function _createAnswerItem(answerData) {
      return {
        value: answerData.value,
        label: answerData.label.ptBR.plainText,
        option: answerData
      };
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
    }

    function _initializeWhenList() {
      self.whenList = [];
      self.whenList = RouteBuilderService.getWhenListForRule();
    }

    function operatorChange(operator) {
      self.selectedOperator = operator;
      self.readyToSave = _readyToSave();
    }

    function parseAnswer(answer) {
      self.answerList[0].option.label.ptBR.plainText = answer;
      return self.answerList[0];
    }

    function saveRule() {
      if (_readyToSave()) {
        console.log("_customAnswer");
        console.log(_customAnswer);
        RouteBuilderService.createRule(self.selectedWhen, self.selectedOperator, self.selectedAnswer, self.selectedAnswer.isMetadata, _customAnswer);
      }
      self.whenSearchText = '';
      self.operatorSearchText = '';
      self.answerSearchText = '';
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
