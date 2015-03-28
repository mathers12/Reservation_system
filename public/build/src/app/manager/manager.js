(function(app) {

    app.config(['$stateProvider',function ($stateProvider) {

        $stateProvider
            .state('manager', {
                url: '/manager',
                views: {
                    "main": {
                        controller: 'managerController',
                        templateUrl: 'manager/manager.tpl.html'
                    }
                },
                resolve:
                {
                    isLogged: ['resolveService', function(resolveService)
                    {
                        return resolveService.managerResolve();
                    }]
                }
            })
            .state('manager.invitations', {
                url: "/invitations",
                templateUrl: "manager/manager.invitations.tpl.html",
                controller: "managerController"
            })
            .state('manager.sendInvitation', {
                url: "/sendInvitation",
                templateUrl: "manager/manager.sendInvitation.tpl.html",
                controller: "managerController"
            })
            .state('manager.receivedInvitations', {
                url: "/receivedInvitations",
                templateUrl: "manager/manager.receivedInvitations.tpl.html",
                controller: "managerController"
            })
            .state('manager.options', {
                url: "/options",
                templateUrl: "manager/manager.options.tpl.html",
                controller: "managerController"
            });
    }]);

    app.controller('managerController', ["$stateParams","$state","isLogged","$rootScope","$scope","$location","$resource","$http","$window",
        function($stateParams,$state,isLogged,$rootScope,$scope,$location,$resource,$http,$window)
    {
        var init = function()
        {
            $scope.roles =
                [
                    {
                        label: 'Manager',
                        value: 'manager'
                    },
                    {
                        label: 'Klient',
                        value: 'client'
                    }
                ];
            $scope.userRole = $scope.roles[0];

            var createdByConfirmations = $resource('/api/confirmations/getCreatedBy');
            $scope.createdByConfirmations= createdByConfirmations.query({email: isLogged.email});

            var addressedToConfirmations = $resource('/api/confirmations/getAddressedToWithEmail');
            $scope.addressedToConfirmations= addressedToConfirmations.query({email: isLogged.email});


            var Clients = $resource('/api/clients/getAllAboutUser');
            $scope.clients= Clients.query({id: isLogged.id});
        };

        $scope.editName =  function (clientId, modifiedName, name) {
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

        $scope.sendInvitation = function()
        {
            var user =
            {
                email: $scope.userEmail,
                role: $scope.userRole.value,
                fromRole: localStorage.getItem('role'),
                fromEmail: isLogged.email
            };

            console.log(user);
            var User = $resource('/auth/invitation');
            User.save(user,function(data)
            {
                /*--Email sa uz v DB nachadza--*/
                if (data.hasAllRoles)
                {
                    alert("Daný e-mail už je registrovaný na klienta a manazera");
                    $state.transitionTo($state.current, $stateParams, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                }
                else if (data.sameRole)
                {
                    alert("Klient s daným e-mailom už danú rolu má, zvoľte inú rolu prosím!");
                    $state.transitionTo($state.current, $stateParams, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                }
                else if (data.sentInvitation)
                {
                    alert("Klientovi už bola odoslaná pozvánka na danú rolu!");
                    $state.transitionTo($state.current, $stateParams, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                }
                /*--Pozvanka bola uspesne poslana--*/
                else
                {
                    alert("Pozvánka bola úspešne odoslaná!");
                    $state.transitionTo($state.current, $stateParams, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                }
            },function(err)
            {
                if (err)
                {
                    alert('Ooops, nastala chyba, prosím opakujte akciu!');
                    $state.transitionTo($state.current, $stateParams, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });                }
            });
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

        $scope.resend = function(confirmation)
        {

        };
        $scope.delete = function(confirmation)
        {
            var Confirmation = $resource('/api/confirmations/:id');
            Confirmation.delete({id: confirmation._id});
            $state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        };
        init();

    }]);

}(angular.module("T-Res-App.manager", [
    'ui.router',
    "ngResource"
])));