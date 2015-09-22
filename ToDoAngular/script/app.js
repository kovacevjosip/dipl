(function () {
    'use strict';
    var app = angular.module('todo', ['ngRoute']);

    app.service('Data', function () {
        var data = {},
            incId = 0;

        function setData(item) {
            incId += 1;
            item.id = incId;
            data[item.id] = item;
        }

        function getData(id) {
            console.log(data[id]);
            return data[id];
        }

        function listData() {
            return data;
        }

        return {
            setData: setData,
            getData: getData,
            listData: listData
        };
    });

    app.controller('toDoCtrl', function ($rootScope, $scope, $http, $timeout, Data) {
        $scope.taskList = Data.listData();

        var checkStatus = function () {
            if ($scope.checkbox) {
                $scope.checkbox = 'Done';
            } else {
                $scope.checkbox = 'Doing';
            }
        };

        $scope.addTask = function () {
            var item;
            checkStatus();

            item = {
                name: $scope.name,
                status: $scope.checkbox
            };

            Data.setData(item);
            console.log($scope.taskList);

            $scope.checkbox = '';
        };

        $scope.deleteTask = function (id) {
            delete $scope.taskList[id];
        };

        $scope.loadTasks = function () {
            $http.get('./data/data.json').then(function (response) {
                console.time('render');
                $scope.taskList = response.data;

                setTimeout(function () {
                    console.timeEnd('render');
                });
            });
        };

        $scope.deleteTasks = function () {
            $scope.taskList = {};
        };
    });

    app.controller('detailsCtrl', function ($rootScope, $scope, $location, Data) {
        var id = $location.$$url.substr($location.$$url.lastIndexOf('/') + 1);
        $scope.item = Data.getData(id);
    });

    app.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/home.html',
                controller: 'toDoCtrl'
            })
            .when('/details/:id', {
                templateUrl: 'partials/details.html',
                controller: 'detailsCtrl'
            })
            .when('edit', {
                templateUrl: 'partials/edit.html',
                controller: 'editCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
}());