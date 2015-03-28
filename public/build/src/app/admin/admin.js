(function(app) {

    app.config(['$stateProvider',function ($stateProvider) {

        $stateProvider
            .state('admin', {
            url: '/admin',
            views: {
                "main": {
                    controller: 'adminController',
                    templateUrl: 'admin/admin.tpl.html'
                }
            },
            resolve:
            {
                isLogged: ['resolveService', function(resolveService)
                {
                    return resolveService.adminResolve();
                }]
            }
        })
            .state('admin.invitations', {
                url: "/invitations",
                templateUrl: "admin/admin.invitations.tpl.html",
                controller: "adminController"
            })
            .state('admin.sendInvitation', {
                url: "/sendInvitation",
                templateUrl: "admin/admin.sendInvitation.tpl.html",
                controller: "adminController"
            })
            .state('admin.receivedInvitations', {
                url: "/receivedInvitations",
                templateUrl: "admin/admin.receivedInvitations.tpl.html",
                controller: "adminController"
            })
            .state('admin.options', {
                url: "/options",
                templateUrl: "admin/admin.options.tpl.html",
                controller: "adminController"
            });
    }]);


    app.controller('adminController', ["$stateParams","$state","isLogged","$rootScope","$scope","$location","$resource","$http","$window",
        function($stateParams,$state,isLogged,$rootScope,$scope,$location,$resource,$http,$window)
    {
        var init = function()
        {
            $scope.roles =
                [
                    {
                        label: 'Admin',
                        value: 'admin'
                    },
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

            $scope.receivedInvitations = true;
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
                    alert("Daný e-mail už je registrovaný na klienta, manažéra a admina");
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
                    });
                }
            });
        };

        $scope.registerClient = function(user)
        {
            user.email = isLogged.email;
            console.log(user);
          var Register = $resource('/api/clients/registerClient');
            Register.save(user,function()
            {
                /*--Musi vyplnit email ktory aj ma registrovany--*/
                    alert("Gratulujeme, Vaše údaje sú uložené a rola pridelená");
                    $state.transitionTo($state.current, $stateParams, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                    $scope.hasName = false;
                    $scope.receivedInvitations = true;

            });
        };

        $scope.accept = function(confirmation)
        {
            var Accept = $resource('/api/clients/acceptRole');
            Accept.save({id: confirmation.addressedTo._id, role: confirmation.role, confirmationId: confirmation._id},function(result)
            {
                /*--Plati len pre hlavneho admina-*/
                if (result.firstName === undefined)
                {
                    alert("Prosím vyplňte svoje údaje ešte!");
                    $scope.hasName = true;
                    $scope.receivedInvitations = false;
                }
                else
                {
                    alert("Úspešne ste prijali rolu");
                    $state.transitionTo($state.current, $stateParams, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                }
            });
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
            var user = {
                id: confirmation._id,
                addressedTo: confirmation.addressedTo._id,
                role: confirmation.role,
                fromRole: localStorage.getItem('role'),
                fromEmail: isLogged.email
            };

            var Resend = $resource('/auth/resend');
            Resend.save(user,function(data)
            {
                console.log(data);
                alert("Pozvánka bola úspešne znova odoslaná");
                $state.transitionTo($state.current, $stateParams, {
                    reload: true,
                    inherit: false,
                    notify: true
                });
            });
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

}(angular.module("T-Res-App.admin", [
    'ui.router',
    "ngResource"
])));