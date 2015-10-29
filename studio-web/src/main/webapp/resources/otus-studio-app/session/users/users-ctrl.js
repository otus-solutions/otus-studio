angular.module('Users').controller('UsersCtrl', function($scope){

    $scope.inactiveUsers = [{
        name:'João',
        email: 'joao@email.com.br'
    }];

    $scope.activeUsers = [{
        name : 'Fernando',
        email : 'fernando@email.com.br'
    },
    {
        name : 'Carlos',
        email : 'carlos@email.com.br'
    },
    {
        name : 'Ze da Canha',
        email : 'zezinho29cm@email.com.br'
    }
    ];
});
