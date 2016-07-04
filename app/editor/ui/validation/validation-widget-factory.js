(function() {
    'use strict';

    angular
        .module('editor.ui')
        .factory('OtusValidationWidgetFactory', OtusValidationWidgetFactory);


    function OtusValidationWidgetFactory() {
        var self = this;

        /* Public interface */
        self.lalaia = lalaia;

        function lalaia(validators){
          console.log(validators);
        }

        // <otus:rangeDate-validation></otus:rangeDate-validation>


          //   'CalendarQuestion': ,
          //   'IntegerQuestion': ,
          //   'DecimalQuestion': [],
          //   'SingleSelectionQuestion': [],
          //   'TextQuestion': [],
          //   'TimeQuestion': [],
          //   'EmailQuestion': [],
          //   'PhoneQuestion': [],
          //   'CheckboxQuestion': []
          return self;


    }


}());
