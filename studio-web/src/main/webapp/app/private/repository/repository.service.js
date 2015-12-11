angular.module('Repository').service('RepositoryService', function() {
    return {
        repositories : [],
        connectedRepository : 'Não conectado',
        update : function(repository) {
            this.repositories.push(repository);
        },
        updateConnectedRepository : function(repository){
            this.connectedRepository = repository;
        }
    };
});
