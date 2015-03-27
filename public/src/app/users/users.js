(function(app) {

    app.config(function ($stateProvider) {
        $stateProvider.state('users', {
            url: '/users',
            views: {
                "main": {
                    controller: 'UsersController',
                    templateUrl: 'users/users.tpl.html'
                }
            },
            resolve:
            {
                isLogged: function(resolveService)
                {
                    return resolveService.managerResolve();
                }

            },
            data:{ pageTitle: 'Users' }
        });
    });

    app.controller('UsersController', function ($scope, $resource) {

        var init = function() {
            // A definitive place to put everything that needs to run when the controller starts. Avoid
            //  writing any code outside of this function that executes immediately.

            var Users = $resource('/api/users');
            $scope.users = Users.query({});

        };

        // modifying users
        $scope.SaveUser = function (user) {
            console.log("users: " + user.name + "\t Selected users number: "+ user.num);
            var Users = $resource('/api/users');
            Users.save(user);
            $scope.users = Users.query({});
        };

        // clean users
        $scope.CleanUser = function (user) {
            state.name =  "";
            console.log("user: '" + user.profile.email + "'\t Number of selected user: "+ user._id + " cleaning");
            var Users = $resource('/api/users');
            Users.save(user);
            $scope.users = Users.query({});
        };

        // delete users
        $scope.DeleteUser = function (user) {
            console.log("DELETE User with eMail: '" + user.profile.email + "'");
            var User = $resource('/api/users/:id'),
                Users = $resource('/api/users');
            User.delete({id: user._id});
            $scope.Users = Users.query({});
        };

        // adding new User
        $scope.AddUser = function (user) {

            if (User === undefined) {
                user = {
                    profile: {
                        first_name: "",
                        last_name: "",
                        email: "",
                        mobil: ""
                    }
                };
            } else {

            }
            console.log("User: '" + user.profile.email + "'");

            var newUser = $resource('/api/users/add');
            newUser.save(user);
            var Users = $resource('/api/users');
            $scope.users = Users.query({}, function (data){
                $scope.addUser = undefined;
                return data;
            });
        };

        init();
    });

}(angular.module("T-Res-App.users", [
    'ui.router'
])));