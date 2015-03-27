(function(app) {

    app.config(function ($stateProvider) {
        $stateProvider.state('states', {
            url: '/states',
            views: {
                "main": {
                    controller: 'StatesController',
                    templateUrl: 'states/states.tpl.html'
                }
            },
            resolve:
            {
                isLogged: function(resolveService)
                {
                    return resolveService.adminManagerResolve();
                }

            },
            data:{ pageTitle: 'States' }
        });
    });

    app.controller('StatesController', function ($scope, $resource) {

        var init = function() {
            // A definitive place to put everything that needs to run when the controller starts. Avoid
            //  writing any code outside of this function that executes immediately.

            var States = $resource('/api/states');
            $scope.states = States.query({});

        };

        // modifying State
        $scope.SaveState = function (state) {
            console.log("State: " + state.name + "\t Selected state number: "+ state.num);
            var States = $resource('/api/states');
            States.save(state);
            $scope.states = States.query({});
        };

        // clean State
        $scope.CleanState = function (state) {
            state.name =  "";
            console.log("State: '" + state.name + "'\t Number of selected state: "+ state.num + " cleaning");
            var States = $resource('/api/states');
            States.save(state);
            $scope.states = States.query({});
        };

        // delete State
        $scope.DeleteState = function (state) {
            console.log("DELETE State name: '" + state.name + "'");
            var State = $resource('/api/states/:id'),
                States = $resource('/api/states');
            State.delete({id: state._id});
            $scope.states = States.query({});
        };

        // adding new State
        $scope.AddState = function (state) {

            if (state === undefined) {
                alert("Musite zadat nazov!");
            }
            else
            {
                state.num = $scope.states.length;


                console.log("State: '" + state.name + "'\t Selected state order: " + state.num);

                var newState = $resource('/api/states/add');
                newState.save(state);
                var States = $resource('/api/states');
                $scope.states = States.query({}, function (data) {
                    $scope.addState = undefined;
                    return data;
                });
            }
        };

        init();
    });

}(angular.module("T-Res-App.states", [
    'ui.router'
])));