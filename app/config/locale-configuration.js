(function() {

  angular
    .module('studio')
    .config(['$mdDateLocaleProvider', localeConfiguration]);

  function localeConfiguration($mdDateLocaleProvider) {

    $mdDateLocaleProvider.formatDate = function(date) {
      if (!date) { //check if date is a valid date
        return '';
      }
      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();

      return _pad(day,2) + '/' + _pad(monthIndex + 1, 2) + '/' + year;
    };

    $mdDateLocaleProvider.parseDate = function(dateString) {
      date = new Date(dateString);
      if (Object.prototype.toString.call(date) !== '[object Date]') {
        return date;
      } else {
        newDateString = dateString.split('/');
        if (newDateString.length === 3) {
          var day = newDateString[0];
          var monthIndex = newDateString[1] - 1;
          var year = newDateString[2];
          date = new Date(year, monthIndex, day);
          return date;
        }
      }
    };

    function _pad(n, width, z) {
      z = z || '0';
      n = n + '';
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

  }

}());
