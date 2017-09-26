(function() {
  'use strict';

  angular
    .module('editor.ui')
    .component('otusButton', {
      templateUrl: 'app/editor/ui/base/button/button.html',
      controller: Controller,
      bindings: {
        //event
        click: '&',
        //template
        label: '@',
        tooltip: '@',
        leftIcon: '@',
        tooltipDirection: '@',
        rightIcon: '@',
        ariaLabel: '@',
        // CSS
        iconButton: '@'
      }
    });

  function Controller() {
    var self = this;

    self.$onInit = onInit;

    function onInit() {
      /* Valid values */
      var validTooltipDirections = ['top', 'bottom', 'left', 'right'];

      /* Type definitions */
      self.css = {};
      self.template = {};
      self.event = {};

      /* Template definitions */
      self.template.ariaLabel = self.ariaLabel || self.label;
      self.template.label = self.label;
      self.template.tooltip = self.tooltip || self.label;
      self.template.tooltipDirection = (self.tooltipDirection !== undefined && (validTooltipDirections.indexOf(self.tooltipDirection) !== -1)) ? self.tooltipDirection : 'top';
      self.template.leftIcon = self.iconButton || self.leftIcon;
      self.template.rightIcon = self.rightIcon;

      self.template.hasLeftIcon = self.template.leftIcon !== undefined;
      self.template.hasRightIcon = (self.iconButton === undefined && self.template.rightIcon !== undefined);

      /* CSS definitions */
      self.css.iconButton = (self.iconButton !== undefined) ? 'md-icon-button' : '';

      /* Event definitions */
      self.event.click = self.click;
    }

  }

}());
