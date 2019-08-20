(function () {
  'use strict';

  angular.module('editor.ui')
    .component('surveyItemGroup', {
      templateUrl: 'app/editor/ui/survey-item-editor/survey-item-group/survey-item-group-template.html',
      controller: 'otusSurveyItemGroupCtrl as $ctrl',
      bindings: {
        item: "<",
      }
    })
    .controller('otusSurveyItemGroupCtrl', Controller);

  Controller.$inject = [
    'SurveyItemGroupService',
    '$scope'
  ];

  function Controller(SurveyItemGroupService, $scope) {
    var self = this;
    self.stateItemGroup = "createGroup";
    self.itemCandidateCheckbox = false;

    self.$onInit = onInit;
    self.editorSurveyItemGroup = editorSurveyItemGroup;
    self.setUpQuestionGroup = setUpQuestionGroup;

    function onInit() {
      SurveyItemGroupService.surveyItemsRegistry(self, _stateControl);
      _flagsStatusGroupItems();
      //_invalidItemsGroups(self.item.templateID);
    }

    function editorSurveyItemGroup() {
      SurveyItemGroupService.getValidItemsByTemplateID(self.item.templateID);
    }

    function _flagsStatusGroupItems(){
      var itemStartGroup = _checkEndItemGroup();
      if(itemStartGroup){
        SurveyItemGroupService.identifiesGroupItemStatus(itemStartGroup.id)
      }
    }

    function _checkEndItemGroup(){
      if(SurveyItemGroupService.verifyEndItemGroup(self.item.templateID))
        return {id: self.item.templateID};
    }

    // function _invalidItemsGroups(id){
    //   SurveyItemGroupService.identifiesInvalidItem(id)
    // }

    function setUpQuestionGroup(){
      SurveyItemGroupService.setUpQuestionGroup(self.item.templateID)
    }

    //recursive register in onInit
    function _stateControl() {
      let vm = this;
      self.stateItemGroup = vm.status;
    }

    // function _taggedItemList(){
    //   var taggedItems = SurveyItemGroupService.futureQuestionItemGroup.filter(item =>{
    //     return item.ctrl.itemCandidateCheckbox == true
    //   })
    //   return taggedItems;
    // }
  }



}());
