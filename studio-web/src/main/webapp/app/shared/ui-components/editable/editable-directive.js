(function() {

    function editable() {

        var editableDDO = {
            templateUrl: "shared/ui-components/editable/editable-template.html",
            restrict: "A",
            scope: {},
            replace: false,
            transclude: true,
            link: function(scope, element, attrs, controller, transclude) {
                console.log(element);
                // Pega o texto dentro da tag p
                scope.userPlaceholderText = transclude().text();
                // Insere a tag p dentro do template
                element.append(transclude());

                var mdInputContainer_node = element.find('md-input-container');
                var textarea_node = element.find('textarea');

                /**
                 *
                 * Atribui o evento de click ao elemento(p);
                 *
                 */
                element.on('click', function() {
                    // mostra input
                    mdInputContainer_node.removeClass('hidden');
                    mdInputContainer_node.addClass('visible');
                    textarea_node.focus();


                    // verifica se o texto é diferente ao que estava no p anteriormente
                    if (transclude().text() != scope.userPlaceholderText) {
                        //verifica se tem algum texto no text area
                        if (textarea_node.val().lenght == 0) {
                            textarea_node.val(transclude().text());
                        }
                    } else {
                        textarea_node.val('');
                    }
                    transclude().text('');
                });

                textarea_node.on('blur', function() {
                    // esconde input
                    mdInputContainer_node.removeClass('visible');
                    mdInputContainer_node.addClass('hidden');

                    if (textarea_node.val() == '')
                        transclude().text(scope.userPlaceholderText);
                    else
                        transclude().text(textarea_node.val());
                });
            }

        };

        return editableDDO;
    }

    angular.module('ui.components').directive('editable', editable);

}());
