'use strict';

angular.module('companyAdminServices')
    .factory('CompanyFactory', ['$http', 'SpringDataRestAdapter', 'BaseFactory', function ($http, SpringDataRestAdapter, BaseFactory) {
        // Create our new custom object that reuse the original object constructor
        var CompanyFactory = function () {
            BaseFactory.apply(this, arguments);
            this.ENTITIES = 'companies';
        };

        // Reuse the original object prototype
        CompanyFactory.prototype = new BaseFactory();

        CompanyFactory.prototype.getCompaniesByOwnerId = function (ownerId, successCallback, errorCallback, finallyCallback) {
            $http.get(this.REST_URL + this.ENTITIES + "/search/byOwnerId?ownerId=" + ownerId)
                .then(function (res) {
                    successCallback && successCallback(res.data._embedded.companies);
                }, function (data) {
                    errorCallback && errorCallback(data);
                }).finally(function () {
                    finallyCallback();
                });
        };

        return CompanyFactory;
    }]);