'use strict';

angular.module('companyAdminControllers').service('commonService', function () {
    return {
        watchFilterToScrollUp: function ($scope, filterField, container) {
            $scope.$watch(filterField, function (newValue) {
                if (newValue) {
                    container.scrollTop = 0;
                    Ps.update(container);
                }
            });
        }
    };
});