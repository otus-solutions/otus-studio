(function() {
  'use strict';

  angular
    .module('ui.components')
    .component('itemContainer', {
      templateUrl: 'app/shared/ui-components/item-container/item-container-template.html',
      controller: Controller,
      transclude: {
        headerSlot: 'itemContainerHeader',
        bodySlot: 'itemContainerBody'
      }
    });

  Controller.$inject = [];

  function Controller() {
    var self = this;

    self.changeState = changeState;

    self.$onInit = function() {
      self.css = {};
      self.template = {};
      self.event = {};
      self.isToShow = false;
      self.template.icon = 'expand_more';
    }

    function changeState() {
      self.isToShow = !self.isToShow;
      self.template.icon = (self.isToShow) ? 'expand_less' : 'expand_more';
    }
  }

}());
