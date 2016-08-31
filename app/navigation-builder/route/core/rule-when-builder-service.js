(function() {
  'use strict';

  angular
    .module('otusjs.studio.navigationBuilder')
    .service('otusjs.studio.navigationBuilder.routeBuilder.RuleWhenBuilderService', service);

  function service() {
    var self = this;

    /* Public methods */
    self.build = build;

    function build(item) {
      var builded = {};

      builded.type = item.objectType;
      builded.icon = item.objectType;
      builded.customID = item.customID;
      builded.label = item.label;
      builded.item = item;

      return builded;
    }
 }
})();
