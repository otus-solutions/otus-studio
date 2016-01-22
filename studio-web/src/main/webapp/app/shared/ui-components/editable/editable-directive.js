(function() {

    var editable = function() {

        var editableDDO = {
            templateUrl: "shared/ui-components/editable/editable-template.html",
            restrict: "A",
            scope: {},
            replace: false,
            transclude: true,
            link: function(scope, element, attrs, controller, transclude) {
                scope.userPlaceholderText = transclude().text();
                element.append(transclude());

                element.on('click', function() {
                    element.find('md-input-container').removeClass('hidden');
                    element.find('md-input-container').addClass('visible');
                    element.find('textarea').focus();

                    if (transclude().text() != scope.userPlaceholderText) {
                        if (element.find('textarea').val().lenght == 0) {
                            element.find('textarea').val(transclude().text());
                        }
                    } else {
                        element.find('textarea').val('');
                    }

                    transclude().text('');
                });

                var editor = element.find('textarea');
                editor.on('blur', function() {
                    element.find('md-input-container').removeClass('visible');
                    element.find('md-input-container').addClass('hidden');
                    console.log(element.find('textarea').val());

                    if (element.find('textarea').val() == '')
                        transclude().text(scope.userPlaceholderText);
                    else
                        transclude().text(element.find('textarea').val());
                });
            }

        };

        return editableDDO;
    }

    angular.module('ui.components').directive('editable', editable);

}());
