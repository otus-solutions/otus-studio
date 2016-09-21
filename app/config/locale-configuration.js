(function() {

    angular
        .module('studio')
        .config(['$mdDateLocaleProvider', localeConfiguration]);

    function localeConfiguration($mdDateLocaleProvider) {

        $mdDateLocaleProvider.formatDate = function(date) {
            if (Object.prototype.toString.call(date) !== '[object Date]') {
                return null;
            }
            var day = date.getDate();
            var monthIndex = date.getMonth();
            var year = date.getFullYear();

            return day + '/' + (monthIndex + 1) + '/' + year;
        };

        $mdDateLocaleProvider.parseDate = function(dateString) {
            date = new Date(dateString);
            if (Object.prototype.toString.call(date) !== '[object Date]') {
                return date;
            } else {
                newDateString = dateString.split('/');
                if (newDateString.length === 3) {
                  var day = newDateString[0];
                  var monthIndex = newDateString[1]-1;
                  var year = newDateString[2];
                    date = new Date(year, monthIndex, day);
                    return date;
                }
            }
        };
    }

}());
