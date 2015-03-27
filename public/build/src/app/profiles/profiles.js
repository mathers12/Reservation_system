(function(app) {


    app.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('profiles', {
            url: '/profiles',
            views: {
                "main": {
                    controller: 'ProfilesController',
                    templateUrl: 'profiles/profiles.tpl.html'

                }
            },
            resolve: {
                isLogged: ['resolveService', function (resolveService) {
                    return resolveService.managerResolve();
                }]
            },



            data:{ pageTitle: 'Profiles' }
        });


    }]);

    app.controller('ProfilesController', ['$scope', '$state', '$resource', function ($scope,$state, $resource) {

        var init = function() {
            // A definitive place to put everything that needs to run when the controller starts. Avoid
            //  writing any code outside of this function that executes immediately.

            var Users = $resource('/api/users');
            $scope.users= Users.query({});

            var Profiles = $resource('/api/profiles');
            $scope.profiles= Profiles.query({});
        };

        // modifying Profile
        $scope.SaveProfile = function (profile, changedProfile) {
            console.log("Profile email: '" + profile.email + "'");
            profile.user = changedProfile.user._id;
            var Profiles = $resource('/api/profiles');
            Profiles.save(profile);
            $scope.profiles = Profiles.query({});
        };

        // clean Profile
        //$scope.CleanUser = function (profile) {
        //    profile.firs_name =  "";
        //    profile.last_name =  "";
        //    profile.email =  "";
        //    profile.mobil =  "";
        //    profile.under_18 = true;
        //    console.log("Profile email: '" + profile.email + "'");
        //    var Profiles = $resource('/profiles');
        //    Profiles.save(profile);
        //    $scope.profiles = Profiles.query({});
        //};

        // delete Profile
        $scope.DeleteProfile = function (profile) {
            console.log("Profile: '" + profile.email + "'");
            var Profile = $resource('/api/profiles/:id'),
                Profiles = $resource('/api/profiles');
            Profile.delete({id: profile._id});
            $scope.profiles = Profiles.query({});
        };

        // adding new Profile
        $scope.AddProfile = function (profile) {
            var profileTemplate = {
                first_name: "",
                last_name: "",
                email: "",
                mobil: "",
                under_18: true
            };
            var Profiles = $resource('/api/profiles');
            var profiles = Profiles.query({}, function(){
                if (profile === undefined) {
                    profile = profileTemplate;
                } else {

                }
                console.log("Adding Profile: '" + profile.email + "'");
                var newProfile = $resource('/api/profiles/add');
                newProfile.save(profile);
                var Profiles = $resource('/api/profiles');
                $scope.profiles = Profiles.query({}, function (data){
                    $scope.addProfile = undefined;
                    return data;
                });
            });
        };

        init();
        console.log("fdf");
    }]);

}(angular.module("T-Res-App.profiles", [
    'ui.router'
])));