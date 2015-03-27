/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * 'src/app/home', however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a 'note' section could have the submodules 'note.create',
 * 'note.delete', 'note.edit', etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take of the rest.
 */
(function(app) {

    app.config(['$stateProvider', function ($stateProvider) {

        $stateProvider.state('home', {
            url: '/home',
            views: {
                "main": {
                    controller: 'HomeController',
                    templateUrl: 'home/home.tpl.html'
                }
            },
            data:{ pageTitle: 'Home' }
        });
    }]);

    app.controller('HomeController', ['$scope', '$resource', '$mdDialog', '$http', '$rootScope', '$location', function ($scope, $resource, $mdDialog,$http,$rootScope,$location) {

        /*--Generovanie pre /home a kontrola prihlasenia--*/
        var init = function() {
            var Rooms = $resource('/api/rooms');
            var rooms = Rooms.query({}, function(){
                $scope.rooms = rooms;
                console.log($scope.rooms);

            });

            var Parts = $resource('/api/parts');
            var parts = Parts.query({}, function(){
                $scope.parts= parts;
            });


            var Tables = $resource('/api/tables');
            var tables = Tables.query({}, function(){
                $scope.tables = tables;
            });


            var States = $resource('/api/states');
            var states = States.query({}, function(){
                $scope.states= states;
            });


            var Profiles = $resource('/api/profiles');
            var profiles= Profiles.query({}, function(){
                $scope.profiles= profiles;
            });

            var Clients = $resource('api/clients');
            var clients = Clients.query({},function()
            {
               $scope.clients = clients;
            });

            var Users = $resource('api/users');
            var users = Users.query({},function()
            {
                $scope.users= users;
            });

            /*--Kontrola ci sme prihlaseny--*/
            $http.get('/auth/loggedin')
                .success(function(user)
                {
                    /*--Prihlaseny--*/
                    if (user)
                    {
                        $rootScope.isLogged = true;
                        $rootScope.clientEmail = user.email;
                    }
                    /*--Neprihlaseny--*/
                    else
                    {
                        $rootScope.isLogged = false;
                    }
                });

            showDialogController();

        };

        /*--Funkcia na kontrolu, ci sme nechceli nieco objednat a boli neprihlaseny--*/
        var showDialogController = function()
        {
            /*--Ak sme chceli objednat sedadlo, tak sa vratime k nemu--*/
           if ($location.search().order !== undefined)
           {
               $mdDialog.show({
                   controller: DialogController,
                   templateUrl: 'assets/tpl/dialog.tpl.html'
               });

           }
        };

        /*$scope.alert = '';
        $scope.showAlert = function(ev) {
            $mdDialog.show(
                $mdDialog.alert()
                    .title('This is an alert title')
                    .content('You can specify some description text in here.')
                    .ariaLabel('Password notification')
                    .ok('Got it!')
                    .targetEvent(ev)
            );
        };

        $scope.showConfirm = function(ev) {
            var confirm = $mdDialog.confirm()
                .title('Would you like to delete your debt?')
                .content('All of the banks have agreed to forgive you your debts.')
                .ariaLabel('Lucky day')
                .ok('Please do it!')
                .cancel('Sounds like a scam')
                .targetEvent(ev);
            $mdDialog.show(confirm).then(function() {
                $scope.alert = 'You decided to get rid of your debt.';
            }, function() {
                $scope.alert = 'You decided to keep your debt.';
            });
        };*/

        /*--Ukaz dialog sedadla--*/
        $scope.showReservation = function(ev,seat) {
            /*--Len klient moze si rezervovat sedadlo a vidiet formular alebo neprihlaseny clovek--*/
            console.log($rootScope.isLogged);
            console.log(localStorage.getItem('role'));
            if (!$rootScope.isLogged || (localStorage.getItem('role')=== 'client')) {
                for (var j = 0; j < $scope.profiles.length; j++) {
                    /*--Ulozime si udaje osoby zo sedadla do localStorage--*/
                    /*--Ak mame v profiles niekoho, tak ho ulozime--*/
                    if ($scope.profiles[j]._id === seat.profile) {
                        localStorage.setItem('first_name', $scope.profiles[j].first_name);
                        localStorage.setItem('last_name', $scope.profiles[j].last_name);
                        localStorage.setItem('under_18', $scope.profiles[j].under_18);
                        localStorage.setItem('email', $scope.profiles[j].email);
                        localStorage.setItem('mobil', $scope.profiles[j].mobil);
                    }
                }
                for (var i = 0; i < $scope.states.length; i++) {
                    /*--Hladame konkretne  id farby sedadla--*/
                    if ($scope.states[i]._id === seat.state) {
                        $mdDialog.show({
                            controller: DialogController,
                            templateUrl: 'assets/tpl/dialog.tpl.html',
                            targetEvent: ev
                        });
                        console.log(seat);
                        localStorage.setItem('seatId', seat._id);
                        localStorage.setItem('state', seat.state);
                        localStorage.setItem('stateColor', $scope.states[i].color);
                    }
                }
            }
        };
        init();


    }]);
    // Still Ingrid's home function
    function DialogController($scope, $mdDialog,$http,$window,$rootScope,$location) {
        /*--Funkcia na inicializaciu dialogControlleru pre showReservation--*/
        var init = function()
        {
            /*--Zobrazime udaje na zaklade stavu sedadla--*/
            if(localStorage.getItem('stateColor') === 'yellow' || localStorage.getItem('stateColor') === 'green')
            {
                    $scope.first_name = localStorage.getItem('first_name');
                    $scope.last_name = localStorage.getItem('last_name');
                    $scope.under_18 =(localStorage.getItem('under_18') =="true") ? true : false;
                    $scope.email = localStorage.getItem('email');
                    $scope.mobil= localStorage.getItem('mobil');

            }
            /*--Zobrazime udaje pre sedadlo, ak mame ?order=true--*/
            if ($location.search().order !== undefined)
            {
                $scope.first_name = localStorage.getItem('first_name');
                $scope.last_name = localStorage.getItem('last_name');
                $scope.under_18 = (localStorage.getItem('under_18') =="true") ? true : false;
                $scope.email = localStorage.getItem('email');
                $scope.mobil = localStorage.getItem('mobil');
            }
        };

        /*--Spracovanie formulara--*/
        $scope.submit = function() {
            /*--Ak sme prihlaseny--*/
            if ($rootScope.isLogged)
            {
                var user = {
                    first_name: $scope.first_name,
                    last_name: $scope.last_name,
                    email: $scope.email,
                    mobil: $scope.mobil,
                    under_18: $scope.under_18,
                    clientEmail: $rootScope.clientEmail, /*--Pridame clientsky email, aby sme vedeli komu patria rezervacie.*/
                    seatId: localStorage.getItem('seatId'),
                    state: localStorage.getItem('state')
                };
                /*--Kvoli vratenej hodnoty undefined, nastavime ako false--*/
                if (user.under_18 === undefined)
                {
                    user.under_18 = false;
                }
                /*--Pridavanie noveho uzivatela--*/
                $http.post('/api/profiles/add',user)
                    .success(function()
                    {
                       alert("Rezervacia prebehla uspesne, pride Vam e-mail ohladom uhradenia faktury!");
                        $window.location.assign('/home');
                    })
                    .error(function(data,status)
                    {
                       alert("Error "+status);
                    });
            }
            /*--Ak nie sme prihlaseny, redirect na login--*/
            else
            {
                /*--Ulozime docasne vypisane udaje uzivatela--*/
                localStorage.setItem('first_name',$scope.first_name);
                localStorage.setItem('last_name',$scope.last_name);
                localStorage.setItem('under_18',$scope.under_18);
                localStorage.setItem('email',$scope.email);
                localStorage.setItem('mobil',$scope.mobil);
                alert("Pred potvrdením objednávky musite by prihlasený!");
                $window.location.assign('/login?from='+$location.url()+"&order=true");
            }
        };
        /*-- Zrusit dialog formular --*/
        $scope.cancel = function()
        {
            localStorage.removeItem('first_name');
            localStorage.removeItem('last_name');
            localStorage.removeItem('under_18');
            localStorage.removeItem('email');
            localStorage.removeItem('mobil');
            $mdDialog.cancel();
        };

        init();

    }
// The name of the module, followed by its dependencies (at the bottom to facilitate enclosure)
}(angular.module("T-Res-App.home", [
    'ui.router'
])));