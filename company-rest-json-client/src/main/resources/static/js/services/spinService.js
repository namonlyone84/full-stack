'use strict';

angular.module('companyAdminControllers').service('SpinService', ['$rootScope', 'usSpinnerService', function ($rootScope, usSpinnerService) {

    $rootScope.spinnerActive = false;

    $rootScope.$on('us-spinner:spin', function () {
        $rootScope.spinnerActive = true;
    });

    $rootScope.$on('us-spinner:stop', function () {
        $rootScope.spinnerActive = false;
    });

    return {
        spin: function () {
            if (!$rootScope.spinnerActive) {
                usSpinnerService.spin('spinner');
            }
        },

        stop: function () {
            if ($rootScope.spinnerActive) {
                usSpinnerService.stop('spinner');
            }
        }
    };
}]);