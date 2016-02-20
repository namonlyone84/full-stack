'use strict';

angular.module('companyAdminServices')
    .factory('OwnerCompanyFactory', ['$http', '$filter', 'SpringDataRestAdapter', 'BaseFactory', 'lodash',
        function ($http, $filter, SpringDataRestAdapter, BaseFactory, _) {
            // Create our new custom object that reuse the original object constructor
            var OwnerCompanyFactory = function () {
                BaseFactory.apply(this, arguments);
                this.ENTITIES = 'ownerCompanies';
            };

            // Inherit base prototype
            OwnerCompanyFactory.prototype = new BaseFactory();

            // Define private method
            OwnerCompanyFactory.prototype.getOwnersByCompany = function (companyId, successCallback, errorCallback, finallyCallback) {
                var self = this;

                $http.get(this.REST_URL + "companies/" + companyId + "/" + this.ENTITIES)
                    .then(function (data) {
                        SpringDataRestAdapter.process(data).then(function (entities) {
                            var listEntities = _.map(entities._embeddedItems, function (entity) {
                                return new self.Entity(entity);
                            });
                            successCallback && successCallback(listEntities);
                        });
                    }, function (data) {
                        errorCallback && errorCallback(data);
                    }).finally(function () {
                        finallyCallback();
                    });
            };

            OwnerCompanyFactory.prototype.countCompaniesByOwner = function (autId, successCallback, errorCallback) {
                $http.get(this.REST_URL + this.ENTITIES + '/search/numberCompaniesByOwner?ownerId=' + autId)
                    .then(function (data) {
                        successCallback && successCallback(data);
                    }, function (data) {
                        errorCallback && errorCallback(data);
                    });
            };

            OwnerCompanyFactory.prototype.addOwnersForCompany = function (companyOwnerModels, successCallback, errorCallback, finallyCallback) {
                var options = {
                    method: 'POST',
                    url: this.REST_URL + this.ENTITIES,
                    data: companyOwnerModels,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                $http(options)
                    .then(function (response) {
                        successCallback && successCallback(response.data);
                    }, function (data) {
                        errorCallback && errorCallback(data);
                    }).finally(function () {
                        finallyCallback();
                    });
            };

            OwnerCompanyFactory.prototype.removeOwnersForCompany = function (companyOwnerModels, successCallback, errorCallback, finallyCallback) {
                $http({
                    method: 'DELETE',
                    url: this.REST_URL + this.ENTITIES,
                    data: companyOwnerModels,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function (data) {
                    successCallback && successCallback(data);
                }, function (data) {
                    errorCallback && errorCallback(data);
                }).finally(function () {
                    finallyCallback();
                });
            };

            return OwnerCompanyFactory;
        }]);