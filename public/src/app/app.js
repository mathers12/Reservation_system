(function(app) {




    app.service('resolveService', function($q,$http,$window,$location,$resource) {
        return {
            adminResolve: function() {
                var deferred = $q.defer();
                /*--Testujeme, ci je uzivatel prihlaseny--*/
                $http.get('/auth/loggedin').success(function (user) {

                    /*-Prihlaseny a s pravami-*/
                    if (user && localStorage.getItem('role') === 'admin')
                    {
                        if (user.role.indexOf(localStorage.getItem('role')) > -1)
                        {
                            deferred.resolve(user); // vratime uspesne vykonanie resolve
                        }
                        else
                        {
                            deferred.reject();
                            $window.location.assign('/home');
                        }

                    }

                    /*-Prihlaseny ale nema opravnenia-*/
                    else if (user) {

                        deferred.reject();
                        $window.location.assign('/home');
                    }
                    /*--Neprihlaseny--*/
                    else {
                        deferred.reject();
                        $window.location.assign('/login?from=' + $location.url());
                    }
                });
                return deferred.promise;
            },
        accountResolve: function() {
            var deferred = $q.defer();
            /*--Testujeme, ci je uzivatel prihlaseny--*/
            $http.get('/auth/loggedin').success(function (user) {
                    /*-Prihlaseny a s pravami-*/
                    if (user && localStorage.getItem('role') === 'client') {
                        if (user.role.indexOf(localStorage.getItem('role')) > -1) {
                            deferred.resolve(user); // vratime uspesne vykonanie resolve
                        }
                        else {
                            deferred.reject();
                            $window.location.assign('/home');
                        }
                    }
                    /*--Neprihlaseny--*/
                    else {
                        deferred.reject();
                        $window.location.assign('/login?from=' + $location.url());
                    }
            });

            return deferred.promise;
        },
        managerResolve: function()
        {
            var deferred = $q.defer();
            /*--Testujeme, ci je uzivatel prihlaseny--*/
            $http.get('/auth/loggedin').success(function (user) {

                /*-Prihlaseny a s pravami-*/
                if (user && localStorage.getItem('role') === 'manager')
                {
                    if (user.role.indexOf(localStorage.getItem('role')) > -1)
                    {
                        deferred.resolve(user); // vratime uspesne vykonanie resolve
                    }
                    else
                    {
                        deferred.reject();
                        $window.location.assign('/home');
                    }

                }
                /*-Prihlaseny ale nema opravnenia-*/
                else if (user) {

                    deferred.reject();
                    $window.location.assign('/home');
                }
                /*--Neprihlaseny--*/
                else {
                    deferred.reject();
                    $window.location.assign('/login?from=' + $location.url());
                }
            });
            return deferred.promise;
        },
        adminManagerResolve: function()
        {
            var deferred = $q.defer();
            /*--Testujeme, ci je uzivatel prihlaseny--*/
            $http.get('/auth/loggedin').success(function (user) {
                /*-Prihlaseny a s pravami-*/
                if (user && (localStorage.getItem('role') === 'admin' || localStorage.getItem('role') === 'manager'))
                {
                    if (user.role.indexOf(localStorage.getItem('role')) > -1)
                    {
                        deferred.resolve(user); // vratime uspesne vykonanie resolve
                    }
                    else
                    {
                        deferred.reject();
                        $window.location.assign('/home');
                    }

                }
                /*-Prihlaseny ale nema opravnenia-*/
                else if (user) {

                    deferred.reject();
                    $window.location.assign('/home');
                }
                /*--Neprihlaseny--*/
                else {
                    deferred.reject();
                    $window.location.assign('/login?from=' + $location.url());
                }
            });
            return deferred.promise;
        },
        confirmedInvitation: function()
        {
            var deferred = $q.defer();

            /*--Ak bude v URL ?id tak riesime ho--*/
            if (($location.search().id !== undefined) && ($location.search().role !== undefined))
            {
                var User = $resource('/api/clients/getUserWithConfirmation');
                User.get({id: $location.search().id, role: $location.search().role},function(data)
                {
                    deferred.resolve(data);
                },function(err)
                {
                    if (err)
                    {
                        deferred.reject();
                    }
                });

            }
            else
            {
                deferred.reject();
            }
            return deferred.promise;
        },
        clientResolve: function()
        {
            var deferred = $q.defer();
            /*--Testujeme, ci je uzivatel prihlaseny--*/
            $http.get('/auth/loggedin').success(function (user) {

                console.log(user);
                /*-Prihlaseny a s pravami-*/
                if (user && localStorage.getItem('role') === 'client')
                {
                    if (user.role.indexOf(localStorage.getItem('role')) > -1)
                    {
                        deferred.resolve(user); // vratime uspesne vykonanie resolve
                    }
                    else
                    {
                        deferred.reject();
                        $window.location.assign('/home');
                    }

                }
                /*-Prihlaseny ale nema opravnenia-*/
                else if (user) {

                    deferred.reject();
                    $window.location.assign('/home');
                }
                /*--Neprihlaseny--*/
                else {
                    deferred.reject();
                    $window.location.assign('/login?from=' + $location.url());
                }
            });
            return deferred.promise;
        }};
        }
    );

    app.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider) {

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $mdThemingProvider.theme('default').primaryPalette('grey');

        $urlRouterProvider.otherwise('/home');

    });

    app.controller('AppController', function ($scope,$mdDialog, $mdToast, $location,$http,$window,$rootScope) {


        var initLog = function()
        {
            /*--Zistime ci sme prihlaseny, ak ano, tak pridame logout a odoberieme login--*/
            $http.get('/auth/loggedin').success(function(user)
            {
                if (user)
                {
                    console.log(user);
                    $scope.role = user.role;
                    $scope.logButton = true;
                    /*--Ak sa prihlasil admin alebo manager, tak ukaz admin tlacitko--*/
                    if ( localStorage.getItem('role') === 'admin' && (user.role.indexOf(localStorage.getItem('role')) > -1))
                    {
                        $scope.adminButton = true;
                    }
                    else if ( localStorage.getItem('role') === 'manager' && (user.role.indexOf(localStorage.getItem('role')) > -1))
                    {
                        $scope.managerButton = true;
                    }
                    else if (localStorage.getItem('role') === 'client' && (user.role.indexOf(localStorage.getItem('role')) > -1))
                    {
                        $scope.accountButton = true;
                    }
                }
                else{
                    $scope.logButton = false;
                    $scope.adminButton = false;
                    $scope.managerButton = false;
                    $scope.accountButton = false;
                }
            });
        };


        /*--Funkcia na odhlasovanie sa --*/
        $scope.logout = function()
        {
            $http.get('/auth/logout').success(function()
            {
                localStorage.clear();
                $window.location.assign('/login');
            });
        };

        var tabs = [
            { title: 'Miestnosti', route: "rooms", order: 0, content: ""},
            { title: 'Čadsti v miestnotiach', route: "parts", order: 1, content: ""},
            { title: 'Stoly', route: "tables", order: 2, content: ""},
            { title: 'Miesta', route: "seats", order: 3, content: ""},
            { title: 'Stavy miest', route: "states", order: 4, content: ""},
            { title: 'Užívatelia', route: "users", order: 5, content: ""},
            { title: 'Register osôb', route: "profiles", order: 6, content: ""}
        ];
        //console.log("Current state: " + $location.path());
        $scope.tabs = tabs;
        $scope.selectedIndex = 2;
        $scope.announceSelected = announceSelected;
        $scope.announceDeselected = announceDeselected;

        function announceDeselected(tab) {
            $scope.farewell = 'Goodbye ' + tab.title + '!';
        }
        function announceSelected(tab) {
            $scope.greeting = 'Hello ' + tab.title + '!';
        }

        $scope.getNavPosition = function() {
            return Object.keys($scope.navPosition)
                .filter(function(pos) { return $scope.navPosition[pos]; })
                .join(' ');
        };

        /*--Kontrola na prihlasenie--*/
        initLog();

    });

}(angular.module("T-Res-App", [
    'T-Res-App.home',
    'T-Res-App.about',
    'T-Res-App.rooms',
    'T-Res-App.parts',
    'T-Res-App.tables',
    'T-Res-App.seats',
    'T-Res-App.states',
    'T-Res-App.login',
    'T-Res-App.users',
    'T-Res-App.forgotPassword',
    'T-Res-App.admin',
    'T-Res-App.account',
    'T-Res-App.invitation',
    'T-Res-App.manager',
    'T-Res-App.clients',
    'T-Res-App.register',
    'T-Res-App.profiles',
    'ngMaterial',
    'ngResource',
    'templates-app',
    'templates-common',
    'ui.router.state',
    'ui.router',
    'ui.select',
    'ngAria'
])));