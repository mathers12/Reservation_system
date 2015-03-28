(function(app) {

    app.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('account', {
            url: '/account',
            views: {
                "main": {
                    controller: 'AccountController',
                    templateUrl: 'account/account.tpl.html'
                }
            },
            resolve: {
                isLogged: ['resolveService', function(resolveService)
                {
                    return resolveService.clientResolve();
                }]
            },
            data:{ pageTitle: 'Account' }
        })
            .state('account.options', {
                url: "/options",
                templateUrl: "account/account.options.tpl.html",
                controller: "AccountController"
            })
            .state('account.invitations', {
                url: "/invitations",
                templateUrl: "account/account.invitations.tpl.html",
                controller: "AccountController"
            });

    }]);


    app.controller('AccountController', ["$stateParams","$state","isLogged","$scope","$location","$resource","$http","$window",
        function($stateParams,$state,isLogged,$scope,$location,$resource,$http,$window)
    {

        var init = function()
        {
            var Confirmations = $resource('/api/confirmations/getAddressedTo');
             $scope.confirmations= Confirmations.query({id: isLogged.id});

            console.log($scope.confirmations);
            var Clients = $resource('/api/clients/getAllAboutUser');
            $scope.clients= Clients.query({id: isLogged.id});
        };


        $scope.editName =  function (clientId, modifiedName, name) {
            console.log(modifiedName);
                if (name === 'firstName') {
                    var FirstName = $resource('/api/clients/editFirstName');
                    FirstName.save({id: clientId, firstName: modifiedName}, function () {
                        alert("Meno zmenené");
                        var Clients = $resource('/api/clients/getAllAboutUser');
                        $scope.clients = Clients.query({id: isLogged.id});

                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                    });
                }
                else if (name === 'lastName') {
                    var LastName = $resource('/api/clients/editLastName');
                    LastName.save({id: clientId, lastName: modifiedName}, function () {
                        alert("Priezvisko zmenené");
                        var Clients = $resource('/api/clients/getAllAboutUser');
                        $scope.clients = Clients.query({id: isLogged.id});
                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                    });
                }
            };


        $scope.editPassword = function(oldPassword,password,password2)
        {
            console.log(oldPassword);
            if (password === password2)
            {
                var EditPassword = $resource('/api/clients/editOldPassword');
                EditPassword.save({id: isLogged.id,oldPassword: oldPassword,newPassword: password},function(data)
                {
                    if (data.oldPassword)
                    {
                        alert("Heslo sa úspešne zmenilo");
                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                    }
                    else
                    {
                        alert("Staré heslo nie je správne");
                        $state.transitionTo($state.current, $stateParams, {
                            reload: true,
                            inherit: false,
                            notify: true
                        });
                    }
                });
            }
            else
            {
                alert("Nové heslo sa nezhoduje!");
                $state.transitionTo($state.current, $stateParams, {
                    reload: true,
                    inherit: false,
                    notify: true
                });
            }

        };

        $scope.accept = function(confirmation)
        {
            var Accept = $resource('/api/clients/acceptRole');
            Accept.save({id: confirmation.addressedTo._id, role: confirmation.role, confirmationId: confirmation._id},function()
            {
                alert("Úspešne ste prijali rolu");
                $state.transitionTo($state.current, $stateParams, {
                    reload: true,
                    inherit: false,
                    notify: true
                });            });
        };
        $scope.reject = function(confirmation)
        {
            console.log(confirmation);
            var Reject = $resource('/api/clients/rejectRole');
            Reject.save({id: confirmation.addressedTo._id, role: confirmation.role, confirmationId: confirmation._id},function()
            {
                alert("Úspešne ste zamietli rolu");
                $state.transitionTo($state.current, $stateParams, {
                    reload: true,
                    inherit: false,
                    notify: true
                });
            });
        };





        init();
    }]);


}(angular.module("T-Res-App.account", [
    'ui.router',
    "ngResource"
])));