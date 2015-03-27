(function(app) {

    app.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('register', {
            url: '/register',
            views: {
                "main": {
                    controller: 'RegisterController',
                    templateUrl: 'register/register.tpl.html'
                }
            },
            data:{ pageTitle: 'Register' }
        });
    }]);

    app.controller('RegisterController', ['$scope', '$resource', '$window', '$mdDialog', function ($scope,$resource,$window,$mdDialog) {

        /*--Dialog message---*/
        $scope.messageDialog = function(message,link)
        {
            $mdDialog.show({
                controller: messageDialogController,
                templateUrl: 'assets/tpl/messageDialog.tpl.html',
                locals: {
                    message: message,
                    link: link
                }
            });
        };

        /*--Registrácia užívateľa--*/
        $scope.register = function (user) {
            /*--RESOURCE VARIANT--*/
            var Register = $resource('/auth/registration');
            Register.save(user, function (data)
            {
                /*--Registracia s rovnakym emailom--*/
                if (data.sameEmail)
                {
                    $scope.messageDialog("V systéme sa už nachádza klient s daným e-mailom!");
                }
                /*--Registracia so zle opisanym heslom--*/
                else if (!data.comparePasswords)
                {
                    $scope.messageDialog("Zadané hesla nie sú rovnaké, opakujte akciu prosím!");
                }
                /*--Uspesna registracia--*/

                else
                {
                    /*SUCCESS*/
                    $scope.messageDialog("Pre úplne dokončenie registrácie, prosím potvrdťe verifikačný e-mail!",'/login');
                }
            },function(err)
            {
                if (err)
                {
                    $scope.messageDialog("Ooops nastala chyba, prosím opakujte akciu!");
                }
            });

        };
    }]);

    function messageDialogController($scope,$window,message,link)
    {
        $scope.message = message;
       $scope.closeDialog = function()
        {
            if (link !== undefined)
            {
                $window.location.assign(link);
            }
            else
            {
                $window.location.reload();
            }
        };
    }
}(angular.module("T-Res-App.register", [
    'ui.router'
])));