(function() {
  'use strict';

  angular
    .module('editor.ui')
    .directive('otusItemIcon', otusItemIcon);

  otusItemIcon.$inject = [];

  function otusItemIcon() {
    var ddo = {
      scope: {
        item: '@item',
      },
      templateUrl: 'app/editor/ui/survey-item-editor/item-icon/otus-item-icon-template.html',
      retrict: 'E',
      link: function linkFunc(scope, element, attrs) {
        scope.type = getItemIcon(scope.item);
      }
    };

    return ddo;
  }

  function getItemIcon(objectType) {
    var mapping = {
      CalendarQuestion: {
        icon: 'date_range',
        tooltip: 'Data'
      },
      IntegerQuestion: {
        icon: 'looks_one',
        tooltip: 'Número Inteiro'
      },
      DecimalQuestion: {
        icon: 'exposure_zero',
        tooltip: 'Número Decimal'
      },
      SingleSelectionQuestion: {
        icon: 'radio_button_checked',
        tooltip: 'Seleção Única'
      },
      CheckboxQuestion: {
        icon: 'check_box',
        tooltip: 'Checkbox'
      },
      TextQuestion: {
        icon: 'text_format',
        tooltip: 'Texto'
      },
      EmailQuestion: {
        icon: 'email',
        tooltip: 'Email'
      },
      TimeQuestion: {
        icon: 'access_time',
        tooltip: 'Hora'
      },
      PhoneQuestion: {
        icon: 'phone',
        tooltip: 'Telefone'
      },
      AutocompleteQuestion: {
        icon: 'youtube_searched_for',
        tooltip: 'Autocompletar'
      },
      FileUploadQuestion: {
        icon: 'attach_file',
        tooltip: 'Upload de Arquivo'
      },
      TextItem: {
        icon: 'message',
        tooltip: 'Texto'
      },
      ImageItem: {
        icon: 'image',
        tooltip: 'Imagem'
      }
    };

    return mapping[objectType];
  }

}());
