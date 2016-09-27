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
    self.saveRule = saveRule;
    self.updateRule = updateRule;
    self.deleteRule = deleteRule;

    function onInit() {
      _initializeWhenList();

      if (self.ruleData) {
        // console.log("if self.ruleData");
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
        // console.log("else self.ruleData");
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
      var value = _returnValue();
      self.answerList.some(function(answer) {
        if (answer.option.value === value) {
          self.selectedAnswer = answer;
          return true;
        }
      });
    }

    function _returnValue() {
      if (self.ruleData.answer.isCustom) {
        if (self.ruleData.answer.option.label.ptBR.plainText.length > 0) {
          return self.ruleData.answer.option.label.ptBR.plainText;
        } else {
          return '';
        }
      } else {
        return self.ruleData.answer.option.value;;
      }
    }

    function answers(filterValue) {
      // console.log("entrei aqui!");
      // console.log("filterValue: ");
      // console.log(filterValue);
      if (!filterValue) {
        return self.answerList;
      } else {
        var filterResult = self.answerList.filter(function(answer) {
          return answer.option.label.ptBR.plainText.search(filterValue) != -1 || self.selectedWhen.customID.search(filterValue) != -1;
        });
        return filterResult;
      }
    }

    /** Retirado do html!!! **/
    function answerInputChange() {
      // console.log("fui chamado antes de todos?");
      if (self.answerSearchText) {
        // console.log("entrei no if do answerInputChange");
        // console.log("self.answerSearchText: ");
        // console.log(self.answerSearchText);
        _customAnswer = self.answerSearchText;
        console.log("_customAnswer");
        console.log(_customAnswer);
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
      // console.log("answerChange: ");
      // console.log(answer);
      if (answer instanceof Object) { // é um objeto
        // console.log("// é um objeto");
        self.selectedAnswer = answer;
        updateRule();
      } else {
        // console.log("self.answerSearchText: ");
        // console.log(self.answerSearchText);
        console.log("self.answerList");
        console.log(self.answerList);
        self.selectedAnswer = self.answerList[0];
        self.selectedAnswer.option.label.ptBR.plainText = self.answerSearchText;
      }

      // if (answer) {
      // if (isCustomAnswer(answer)) {
      //   _customAnswer = answer;
      // } else {
      // self.selectedAnswer = answer;
      // updateRule();
      // }
      // }
      self.readyToSave = _readyToSave();
    }

    function isCustomAnswer(answer) {
      var isObject = (answer instanceof Object);
      var isSelectableValue = (self.selectedWhen.type === 'SingleSelectionQuestion' || self.selectedWhen.type === 'CheckboxQuestion');
      return !isObject && !isSelectableValue;
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

    function saveRule() {
      console.log("saveRule()");
      if (_readyToSave()) {
        console.log("_readyToSave()");
        RouteBuilderService.createRule(self.selectedWhen, self.selectedOperator, self.selectedAnswer, self.selectedAnswer.isMetadata);
        self.onUpdate();
      }
      self.whenSearchText = '';
      self.operatorSearchText = '';
      self.answerSearchText = '';
    }

    function updateRule() {
      // console.log("updateRule");
      // console.log("self.ruleData: ");
      // console.log(self.ruleData);
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

    /* chamado, todas as vezes que é preenchido algum campo, perceba ele tenta validar todos os campos! */
    function _readyToSave() {
      console.log("_resolveRuleWhen(): ");
      console.log(_resolveRuleWhen());
      console.log("_resolveRuleOperator(): ");
      console.log(_resolveRuleOperator());
      console.log("_resolveRuleAnswer(): ");
      console.log(_resolveRuleAnswer());

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
      // console.log("_resolveRuleAnswer:");
      // console.log(self.selectedAnswer);
      if (!self.selectedAnswer || !_customAnswer) {
        return false;
      } else {
        return true;
      }
    }
  }
})();
