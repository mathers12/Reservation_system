(function(app) {


    app.config(function ($stateProvider) {
        $stateProvider.state('login', {
            url: '/login',
            views: {
                "main": {
                    controller: 'LoginController',
                    templateUrl: 'login/login.tpl.html'
                }
            },
            data: {pageTitle: 'Login'}
        });
    });


    app.controller('LoginController', ["$mdDialog","$rootScope","$scope","$location","$resource","$http","$window",
        function($mdDialog,$rootScope,$scope,$location,$resource,$http,$window)
    {


        /*--Funkcia na kontrolu verifikovaneho emailu a nasledne zobrazenie spravy pre usera--*/
        var init = function()
        {
            /*--Ak  uzivatel klikol na verifikaciu, vidime ?verify_id=123--*/
            if ($location.search().verify_id !== undefined)
            {
                var id = $location.search().verify_id;
                var User_id = $resource('/auth/getVerifyMessage');
                User_id.get({verify_id: id},function () {
                    $scope.messageDialog('/login',"Verifikácia prebehla úspešne, teraz sa môžete prihlásiť!");
                },function(err)
                {

                });
            }

        };

        var getCorrectUrl = function()
        {
            var link = "";
            if ($location.search().from === undefined)
            {
                link = '/home';
            }
            /*--Ak sme chceli objednat sedadlo ale neprihlaseny--*/
            else if ($location.search().order !== undefined)
            {
                link = $location.search().from+"?order="+$location.search().order;
            }
            /*--Ak sme boli na zakazanom linku--*/
            else
            {
                link = $location.search().from;
            }

            return link;
        };


        /*--Vsetky roly od klienta si ulozime a zobrazime v dialogu--*/
        var getRoles = function(client,link)
        {
            var roles = [];

            /*--Je len jeden ucet, tak nezobrazuj selectBox-*/
            if (client.role.length === 1)
            {
                $scope.messageDialog(link,"Prihlásenie prebehlo úspešne",client.role[0]);
            }
            else {
                /*--Ulozime si role klienta do selectboxu--*/
                for (var i = 0; i < client.role.length; i++) {

                    switch (client.role[i]) {
                        case 'client':
                            roles.push({label: 'Klient', value: client.role[i]});
                            break;
                        case 'admin':
                            roles.push({label: 'Administrátor', value: client.role[i]});
                            break;
                        case 'manager':
                            roles.push({label: 'Manažér', value: client.role[i]});
                            break;
                    }
                }
                $scope.selectDialog(link,roles);
            }

        };

        /*--PRIHLASOVANIE--*/
        $scope.Login = function()
        {
            var data = {
                email: $scope.user.email,
                password: $scope.user.password
            };

            /*--Testujeme ci mame nejake parametre v URL--*/
            var linkUrl = getCorrectUrl();

            /*--RESOURCE VARIANT--*/
            var Login = $resource('/auth/');
            Login.save(data,function(user)
            {
                console.log(user);
                getRoles(user,linkUrl);

                /*Neplatne meno alebo heslo, reload stranky login*/
            },function(err)
            {
                if (err.status == 401)
                {
                    $scope.messageDialog("/login","Neplatné meno alebo heslo!");
                }
            });
        };

        /*--Dialog message---*/
         $scope.messageDialog = function(link,message,role)
        {

            $mdDialog.show({
                controller: messageDialogController,
                templateUrl: 'assets/tpl/messageDialog.tpl.html',
                locals: {
                    afterLoginLink: link,
                    message: message,
                    role: role
                },
                clickOutsideToClose: false

            });
        };

        /*--SelectBox dialog--*/
        $scope.selectDialog = function(link,roles)
        {
            $mdDialog.show({
                controller: selectDialogController,
                templateUrl: 'assets/tpl/selectDialog.tpl.html',
                locals: {
                    clientRoles: roles,
                    link: link
                },
                clickOutsideToClose: false

            });
        };

        $rootScope.encryptionText = function(text)
        {
            var bcrypt = dcodeIO.bcrypt;
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(text, salt, function(err, hash) {
                    localStorage.setItem('role',hash);
                });
            });

        };

        $rootScope.getUrl = function(role,link)
        {

            /*--Presmeruj nas na presnu URL, kde chceme ist--*/
                switch (role) {
                    case "client":
                        $window.location.assign(link);
                        break;
                    case 'admin':
                        if ($location.search().from !== undefined) {
                            /*--Ak by chcel admin sa prihlasit, tak sa mu nezobrazi rezervovane sedadlo co chcel--*/
                            if ($location.search().order !== undefined) {
                                $window.location.assign('/admin');
                            }
                            /*--Zobrazi sa naposledy otvorena URL--*/
                            else {
                                $window.location.assign(link);
                            }
                        }
                        else {
                            $window.location.assign('/admin');
                        }
                        break;
                    case 'manager':
                        if ($location.search().from !== undefined) {
                            /*--Ak by chcel manager sa prihlasit, tak sa mu nezobrazi rezervovane sedadlo co chcel--*/
                            if ($location.search().order !== undefined) {
                                $window.location.assign('/manager');
                            }
                            /*--Zobrazi sa naposledy otvorena URL--*/
                            else {
                                $window.location.assign(link);
                            }
                        }
                        else {
                            $window.location.assign('/manager');
                        }
                        break;
                    default:
                        $window.location.assign('/login');
                }
        };


        init();
    }

]);

function messageDialogController($scope,afterLoginLink,message,role,$rootScope)
{
    $scope.message = message;

    /*--Po zobrazeni uspesnej spravy, zatvorime okno a presmeruje nas kde chceme--*/
    $scope.closeDialog = function()
    {
        localStorage.setItem('role',role);
        $rootScope.getUrl(role,afterLoginLink);
    };
}

function selectDialogController($scope, $mdDialog,$resource,clientRoles,link,$rootScope,$window)
{

    /*--ROLE klienta--*/
    $scope.roles = clientRoles;
    $scope.userRole = clientRoles[0];
    /*Potvrdenie vyberovho formulara*/
    $scope.submit = function(role)
    {
        localStorage.setItem('role',role.value);
        $rootScope.getUrl(role.value,link);
    };

    /*--Zrusenie formulara, odhlasenie--*/
    $scope.cancel = function()
    {
      var Logout = $resource('/auth/logout');
        Logout.get(function()
        {
            $mdDialog.cancel();
            $window.location.reload();

        });
    };

}

}(angular.module("T-Res-App.login", [
    'ui.router',
    "ngResource",
    'ui.select'
])));