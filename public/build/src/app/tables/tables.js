(function(app) {

    app.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('tables', {
            url: '/tables',
            views: {
                "main": {
                    controller: 'TablesController',
                    templateUrl: 'tables/tables.tpl.html'
                }
            },
            resolve:
            {
                isLogged: ['resolveService', function(resolveService)
                {
                    return resolveService.adminManagerResolve();
                }]

            },
            data:{ pageTitle: 'Tables' }
        });
    }]);

    app.controller('TablesController', ['$scope', '$resource', function ($scope, $resource) {


        var init = function()
        {
            //$scope.selectedIndex = 2;
            // A definitive place to put everything that needs to run when the controller starts. Avoid
            //  writing any code outside of this function that executes immediately.
            var Rooms = $resource('/api/rooms');
            $scope.rooms = Rooms.query({});

            var Parts = $resource('/api/parts');
            $scope.parts = Parts.query({});

            var Tables = $resource('/api/tables');
            $scope.tables = Tables.query({});
        };

        // modifying Table
        $scope.SaveTable = function (table, changeTable) {
            table.part = changeTable.part;
            table.room = changeTable.room;
            console.log("Selected table order: "+ table.order + " and assigned to tha part_id: " + table.part + " and room_id: " + table.room);
            var Tables = $resource('/api/tables');
            Tables.save(table);
            $scope.tables = Tables.query({});
        };

        // modifying Seat if selectbox
        //$scope.SaveTable = function (table, changedTable) {
        //    console.log("Selected table order: "+ changedTable.order);
        //    table.order = changedTable.order;
        //    var Tables = $resource('/tables');
        //    Tables.save(table);
        //    $scope.tables = Tables.query({});
        //};

        // clean Seat
        $scope.CleanTable = function (table) {
            table.room =  "";
            table.part = "";
        //    table.order = $scope.tables.length;
            console.log("Table: " + table.order);
            var Tables = $resource('/api/tables');
            Tables.save(table);
            $scope.tables = Tables.query({});
        };

        // delete Table
        $scope.DeleteTable = function (table) {
            console.log("Table: " + table.order);
            var Table = $resource('/api/tables/:id'),
                Tables = $resource('/api/tables');
            Table.delete({id: table._id});
            $scope.tables = Tables.query({});
        };

        // adding new Table
        $scope.AddTable = function (table) {
            if (table === undefined) {
                table = { order: $scope.tables.length };
            } else {
                if (table.order === undefined) {
                    table.order = $scope.tables.length;
                }
            }
            console.log(table.room+" "+table.part);
            console.log("Table order: " + table.order + " - ADDED");
            var newTable = $resource('/api/tables/add');
            console.log(table);
            newTable.save(table);
            var Tables = $resource('/api/tables');
            $scope.tables = Tables.query({}, function (data) {
                $scope.addTable = undefined;
                return data;
            });
        };


        init();
    }]);

}(angular.module("T-Res-App.tables", [
    'ui.router'
])));