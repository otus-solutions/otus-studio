(function() {
    'use strict';

    angular
        .module('editor', [
            'editor.core',
            'editor.database',
            'editor.ui',
            'editor.workspace'
        ]);

}());
