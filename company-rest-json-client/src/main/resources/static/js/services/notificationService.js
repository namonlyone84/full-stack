'use strict';

angular.module('companyAdminControllers').service('NotificationService', ['$rootScope', function ($rootScope) {

    function getType(successful) {
        return successful ? 'success' : 'danger';
    }

    function broadCastUpdate(type, message) {
        $rootScope.$broadcast('updateNotification', type, message);
    }

    return {
        // For general error notification, which would pass the error message from out side
        notify: function (message, successful) {
            var type = getType(successful);
            broadCastUpdate(type, message);
        }
    };
}]);

