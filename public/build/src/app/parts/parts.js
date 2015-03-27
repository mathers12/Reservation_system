(function(app) {

    app.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('parts', {
            url: '/parts',
            views: {
                "main": {
                    controller: 'PartsController',
                    templateUrl: 'parts/parts.tpl.html'
                }
            },
            resolve:
            {
                isLogged: ['resolveService', function(resolveService)
                    {
                        return resolveService.adminManagerResolve();
                    }]

            },
            data:{ pageTitle: 'Parts' }
        });
    }]);

    app.controller('PartsController', ['$scope', '$resource', '$location', '$filter', function ($scope, $resource, $location, $filter) {

        var init = function() {
            //var state = $location.path().slice(1);
            //var tab = $filter('filter')($scope.tabs, {'route': state});
            //$scope.selectedIndex = 1;
            //console.log("Filter expression: " + "state" + ", Filered Tab: " + "tab.title" + ", SelectedIndex: " + "tab.order 1");
            // A definitive place to put everything that needs to run when the controller starts. Avoid
            //  writing any code outside of this function that executes immediately.
            var States = $resource('/api/states');
            $scope.states = States.query({});

            var Rooms = $resource('/api/rooms');
            $scope.rooms = Rooms.query({});

            var Tables = $resource('/api/tables');
            $scope.tables = Tables.query({});

            var Parts = $resource('/api/parts');
            $scope.parts = Parts.query({});

        };

        // modifying Part if input box
        $scope.SavePart = function (part, changePart) {
            console.log("Selected part order: " + part.order + " and name: " + changePart.room._id);
            var Parts = $resource('/api/parts');
            part.room = changePart.room._id;
            Parts.save(part);
            $scope.parts = Parts.query({});
        };

        // clean Part
        $scope.CleanPart = function (part) {
            part.name =  "";
            part.positioning = "";
            part.room = part.room._id;
            console.log("Part: " + part.order);
            var Parts = $resource('/api/parts');
            Parts.save(part);
            $scope.parts = Parts.query({});
        };

        // delete Part
        $scope.DeletePart = function (part) {
            console.log("Part: " + part.name);
            var Part = $resource('/api/parts/:id'),
                Parts = $resource('/api/parts');
            Part.delete({id: part._id});
            $scope.parts = Parts.query({});
        };

        // adding new Part
        $scope.AddPart = function (part) {
            if ($scope.parts === undefined) {
                $scope.parts = {
                    order: 0,
                    room: $scope.rooms[0]._id
                };
            }
            console.log($scope.parts.length);
            var partTemplate = {
                            name: "",
                            positioning: "",
                            order: $scope.parts.length,
                            room: $scope.rooms[0]._id
                        };
            if (part === undefined) {
                part = partTemplate;
            }
            part.order = $scope.parts.length;
            var newPart = $resource('/api/parts/add');
            console.log(part);
            newPart.save(part);
            var Parts = $resource('/api/parts');
            $scope.parts = Parts.query({});
            $scope.newPart = undefined;
        };


        init();
    }]);

}(angular.module("T-Res-App.parts", [
    'ui.router'
])));