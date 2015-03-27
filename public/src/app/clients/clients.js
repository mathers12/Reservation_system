(function(app) {

    app.config(function ($stateProvider) {
        $stateProvider.state('clients', {
            url: '/clients',
            views: {
                "main": {
                    controller: 'ClientsController',
                    templateUrl: 'clients/clients.tpl.html'
                }
            },
            resolve: {
                isLogged: function (resolveService) {
                    return resolveService.managerResolve();
                }
            },
            data:{ pageTitle: 'Clients' }
        });
    });


    app.controller('ClientsController', ["$scope","$location","$resource","$http","$window",function($scope,$location,$resource,$http,$window)
    {
        var init = function ()
        {
            var Clients = $resource('/api/clients');
            var clients = Clients.query({}, function(){
                for (var i = 0;i<clients.length;i++)
                {
                    var date = new Date(clients[i].date_of_birth);
                    clients[i].date_of_birth = date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear();
                }
                $scope.clients = clients;
            });

        };

        $scope.DeleteClient = function(client)
        {
            console.log("Room: " + client.email);
            var Client = $resource('/api/clients/:id');
            Client.delete({id: client._id},function(data)
            {
               console.log('Client '+data.firstName+" "+data.lastName+" was removed!");
                init();
            },function(err)
            {
                if (err)
                {
                    alert("Nastala chyba, opakujte akciu prosim");
                }
            });
        };

        init();
    }]);

}(angular.module("T-Res-App.clients", [
    'ui.router',
    "ngResource"
])));