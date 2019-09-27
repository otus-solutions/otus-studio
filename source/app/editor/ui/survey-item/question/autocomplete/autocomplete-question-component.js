(function() {
  'use strict';

  angular
    .module('editor.ui')
    .component('autocompleteQuestion', {
      templateUrl: 'app/editor/ui/survey-item/question/autocomplete/autocomplete-question-template.html',
      controller: Controller,
      bindings: {
        item: '<'
      }
    });

  Controller.$inject = [
    'AddDataSourceEventFactory',
    'RemoveDataSourceEventFactory',
    '$q'
  ];

  function Controller(AddDataSourceEventFactory, RemoveDataSourceEventFactory, $q) {
    var self = this;
    // lifecycle hooks
    self.$onInit = onInit;
    // public methods
    self.addDataSource = addDataSource;
    self.removeDataSource = removeDataSource;
    self.dummyQuery = dummyQuery;

    function onInit() {
      self.autoCompleteSettings = {
        selectedItem: null,
        searchText: "",
      };
    }

    function addDataSource(dataSourceName) {
      AddDataSourceEventFactory.create().execute(self.item, dataSourceName);
    }

    function removeDataSource(dataSourceName) {
      RemoveDataSourceEventFactory.create().execute(self.item, dataSourceName);
    }

    // TODO: It needs to use a query of model.
    function dummyQuery(typedText) {
      var deferred = $q.defer();
      deferred.resolve(_stateList);
      return deferred.promise;
    }

    var _stateList = ["Acre",
      "Alagoas",
      "Amapá",
      "Amazonas",
      "Bahia",
      "Ceará",
      "Distrito Federal",
      "Espírito Santo",
      "Goiás",
      "Maranhão",
      "Mato Grosso",
      "Mato Grosso do Sul",
      "Minas Gerais",
      "Pará",
      "Paraíba",
      "Paraná",
      "Pernambuco",
      "Piauí",
      "Rio de Janeiro",
      "Rio Grande do Norte",
      "Rio Grande do Sul",
      "Rondônia",
      "Roraima",
      "Santa Catarina ",
      "São Paulo",
      "Sergipe",
      "Aracaju ",
      "Tocantins"
    ];
  }

}());
