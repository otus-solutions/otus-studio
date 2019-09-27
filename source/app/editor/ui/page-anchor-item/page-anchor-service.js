(function() {
  angular
    .module('editor.ui')
    .service('PageAnchorService', PageAnchorService);

  function PageAnchorService() {
    var self = this;
    var _anchorList = {};
    var _itemManager;

    // public interface
    self.setUp = setUp;
    self.sheetAutoFocus = sheetAutoFocus;
    self.anchorRegistry = anchorRegistry;

    function setUp(itemManager) {
      _itemManager = itemManager;
    }

    function anchorRegistry(anchorElement) {
      _anchorList[anchorElement[0].id] = anchorElement;
    }

    function sheetAutoFocus() {
      if (_itemManager.getItemListSize() > 6) {
        _focusOnBottom();
      } else {
        _focusOnTop();
      }
    }

    function _focusOnTop() {
      if (_anchorList['top-anchor']) {
        _anchorList['top-anchor'].focus();
      }
    }

    function _focusOnBottom() {
      if (_anchorList['bottom-anchor']) {
        _anchorList['bottom-anchor'].focus();
      }
    }
  }

}());
