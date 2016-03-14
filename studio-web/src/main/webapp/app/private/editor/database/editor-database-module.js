(function() {
    'use strict';

    angular
        .module('editor.database', [])
        .config(function($indexedDBProvider) {
            // window.indexedDB.deleteDatabase('otus-studio');
            $indexedDBProvider
                .connection('otus-studio')
                .upgradeDatabase(1, function(event, db, tx) {
                    db.createObjectStore('survey_template', { keyPath: 'template_oid' });
                });
        });

}());
