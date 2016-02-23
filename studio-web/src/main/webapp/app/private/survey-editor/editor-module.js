(function() {
    'use strict';

    angular
        .module('editor', [
            'editor.database',
            'editor.engine',
            'editor.ui',
            'editor.workspace',
            'otusjs'
        ]);

}());
