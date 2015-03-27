(function(app) {

    app.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('about', {
            url: '/about',
            views: {
                "main": {
                    controller: 'AboutController',
                    templateUrl: 'about/about.tpl.html'
                }
            },
            data:{ pageTitle: 'About' }
        });
    }]);

    app.controller('AboutController', ['$scope', function ($scope) {

        var init = function() {
        };

        init();
    }]);

}(angular.module("T-Res-App.about", [
    'ui.router'
])));