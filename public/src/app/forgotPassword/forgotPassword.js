(function(app) {

    app.config(function ($stateProvider) {
        $stateProvider.state('forgotPassword', {
            url: '/forgotPassword',
            views: {
                "main": {
                    controller: 'forgotPasswordController',
                    templateUrl: 'forgotPassword/forgotPassword.tpl.html'
                }
            },
            data: {pageTitle: 'forgotPassword'}

        });
    });


    app.controller('forgotPasswordController', ["$mdDialog","$scope","$location","$resource","$http","$window",function($mdDialog,$scope,$location,$resource,$http,$window)
    {
        console.log("RESET OUT");

        $scope.ResetPassword = function()
        {
            console.log("RESET");
            var forgotPassword = $resource('/auth/forgotPassword');
            forgotPassword.save({email: $scope.email},function(data)
            {
              if (data.emailNotFound)
              {
                  $scope.messageDialog($location.url(),"E-mail neexistuje v systéme!");
              }
              else
              {
                  $scope.messageDialog('/login',"Príde Vám e-mail ohľadom resetovania hesla!");
              }
            });
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

        $scope.addNewPassword = function()
        {
            if ($scope.password === $scope.password2)
            {
                var addNewPassword = $resource('/api/clients/editPassword');
                addNewPassword.save({id: $location.search().id, password: $scope.password},function()
                {
                    $scope.messageDialog('/login',"Vaše heslo bolo zmenené, môžete sa teraz prihlásiť s novým heslom!");
                });
            }
            else
            {
                console.log($location.path());
                $scope.messageDialog($location.url(),"Zadané heslá nie sú rovnaké!");

            }

        };
        var init = function()
        {
            if ($location.search().id !== undefined)
            {
               var getUser = $resource('/api/clients/getUser');
                getUser.get({id: $location.search().id},function()
                {
                    $scope.resetForm = false;
                    $scope.addNewPasswordForm = true;
                });
            }
            else
            {
                $scope.resetForm = true;
            }
        };

        init();
    }]);

function messageDialogController($mdDialog,$scope,message,link,$window)
{
    $scope.message = message;

    /*--Zrusenie formulara, odhlasenie--*/
    $scope.closeDialog = function()
    {
        $mdDialog.cancel();
        $window.location.assign(link);

    };
}


}(angular.module("T-Res-App.forgotPassword", [
    'ui.router',
    "ngResource"
])));