(function () {
  'use strict';

  angular
    .module('studio.commons')
    .controller('dialogController', DialogController);


  function DialogController(data) {
    var vm = this;
    var DEFAULT_DIMENSIONS = {'min-height':'200px', 'min-width':'300px'};

    vm.HEADER = data.header;
    vm.TITLE =  data.title;
    vm.TEXT = data.text;
    vm.ariaLabel = data.ariaLabel;
    vm.IMG = data.img;
    vm.STYLE = data.style;
    vm.BUTTONS = Array.isArray(data.buttons) ? data.buttons : [];
    vm.cancel = data.cancel;

    /* Public methods */
    vm.isAvailableImage = isAvailableImage;

    useDefaultDimensions();

    function isAvailableImage() {
      return '' !== data.img;
    }

    function useDefaultDimensions() {
      if(!data.dimensionsDialog){
        vm.dialogDimensions = DEFAULT_DIMENSIONS;
      } else {
        vm.dialogDimensions = data.dimensionsDialog;
      }
    }
  }
}());
