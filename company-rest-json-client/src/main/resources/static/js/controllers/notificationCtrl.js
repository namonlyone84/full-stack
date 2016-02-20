'use strict';

angular.module('companyAdminControllers')
    .controller('NotificationCtrl', ['$scope', function ($scope) {
        $scope.closed = true;

        $scope.close = function () {
            $scope.closed = true;
        };

        $scope.$on('updateNotification', function (evt, type, message) {
            $scope.closed = false;
            $scope.message = message;
            $scope.type = type;
        });
    }]);