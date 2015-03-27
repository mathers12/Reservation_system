(function(app) {

    app.config(['$stateProvider',function ($stateProvider) {

        $stateProvider
            .state('invitation', {
                url: '/invitation',
                views: {
                    "main": {
                        controller: 'invitationController',
                        templateUrl: 'invitation/invitation.tpl.html'
                    }
                },
                resolve:
                {
                    resolvedPerson: ['resolveService', function(resolveService)
                    {
                        return resolveService.confirmedInvitation();
                    }]
                }
            });
    }]);


    app.controller('invitationController', ["$mdDialog","resolvedPerson","$rootScope","$scope","$location","$resource","$http","$window",
        function($mdDialog,resolvedPerson,$rootScope,$scope,$location,$resource,$http,$window)
    {
        var getRoleName = function(role)
        {
            switch (role)
            {
                case 'admin':
                    return 'ADMINISTRÁTOR';
                case 'client':
                    return 'KLIENT';
                case 'manager':
                    return 'MANAŽÉR';
            }
        };

        var init = function()
        {

            if (resolvedPerson.addressedTo.verifiedEmail === undefined)
            {
                $scope.email = resolvedPerson.addressedTo.email;
                $scope.role = getRoleName(resolvedPerson.role);
                $scope.registerForm = true;
                $scope.form = false;
                $scope.registerMainAdminForm = false;
            }
            /*--Plati pre hlavneho admina--*/
            else if (resolvedPerson.addressedTo.firstName === undefined && resolvedPerson.addressedTo.verifiedEmail !== undefined)
            {
                $scope.email = resolvedPerson.addressedTo.email;
                $scope.role = getRoleName(resolvedPerson.role);
                $scope.registerForm = false;
                $scope.registerMainAdminForm = true;
                $scope.form = false;
            }
            /*--Nezobrazime registracny formular, lebo klient uz je v systeme--*/
            else
            {
                $scope.firstName = resolvedPerson.addressedTo.firstName;
                $scope.lastName = resolvedPerson.addressedTo.lastName;
                $scope.email = resolvedPerson.addressedTo.email;
                $scope.role = getRoleName(resolvedPerson.role);
                $scope.registerForm = false;
                $scope.form = true;
                $scope.registerMainAdminForm = false;

            }

        };

        /*--Pozvanka na potvrdenie pre registrovaneho klienta--*/
        $scope.registerOldUser = function()
        {
            var acceptRole = $resource('/api/clients/acceptRole');
            acceptRole.save({role: resolvedPerson.role,id: resolvedPerson.addressedTo._id,confirmationId: resolvedPerson._id},function()
            {
                $scope.messageDialog('/login',"Pridelenie roly prebehlo úspešne");
            });
        };

        /*--Pozvanka na potvrdenie pre neregistrovaneho klienta--*/
        $scope.registerMainAdmin = function()
        {
            var user=
            {
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                email: $scope.email,
                date: $scope.date,
                sex: $scope.sex,
                role: resolvedPerson.role,
                confirmationId: resolvedPerson._id,
                mainAdmin: true
            };

                var User = $resource('/api/clients/registerNewClient');
                User.save(user,function()
                {
                    $scope.messageDialog('/login',"Registrácia prebehla úspešne, teraz sa môžete prihlásiť!");
                },function(err)
                {
                    if (err)
                    {
                        $scope.messageDialog($location.url(),"Ooops nastala chyba, opakujte akciu prosím");
                    }
                });
        };

        /*--Pozvanka na potvrdenie pre neregistrovaneho klienta--*/
        $scope.register = function()
        {
            console.log(resolvedPerson._id);
            var user=
            {
              firstName: $scope.firstName,
              lastName: $scope.lastName,
              email: $scope.email,
              password: $scope.password,
              password2: $scope.password2,
              date: $scope.date,
              sex: $scope.sex,
              role: resolvedPerson.role,
              confirmationId: resolvedPerson._id,
              mainAdmin: false
            };

            /*Hesla su zhodne*/
            if (user.password === user.password2)
            {
                var User = $resource('/api/clients/registerNewClient');
                User.save(user,function()
                {
                    $scope.messageDialog('/login',"Registrácia prebehla úspešne, teraz sa môžete prihlásiť!");
                },function(err)
                {
                    if (err)
                    {
                        $scope.messageDialog($location.url(),"Ooops nastala chyba, opakujte akciu prosím");
                    }
                });
            }
            else
            {
                $scope.messageDialog($location.url(),"Zadané heslá sa nezhodujú, opakujte akciu prosím!");
            }
        };

        /*--Dialog message---*/
        $scope.messageDialog = function(link,message)
        {

            $mdDialog.show({
                controller: messageDialogController,
                templateUrl: 'assets/tpl/messageDialog.tpl.html',
                locals: {
                    message: message,
                    link: link
                },
                clickOutsideToClose: false

            });
        };
        init();
    }]);

function messageDialogController ($scope,message,link,$window,$mdDialog)
{
    $scope.message = message;
    /*--Zrusenie formulara, odhlasenie--*/
    $scope.closeDialog = function()
    {
        $mdDialog.cancel();
        $window.location.assign(link);

    };
}
}(angular.module("T-Res-App.invitation", [
    'ui.router',
    "ngResource"
])));