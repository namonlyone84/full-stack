'use strict';

angular.module('companyAdminServices')
    .factory('BaseFactory', ['$rootScope', '$http', '$filter', 'SpringDataRestAdapter', 'lodash',
        function ($rootScope, $http, $filter, SpringDataRestAdapter, lodash) {
        var BaseFactory = function () {
            var that = this;
            this.REST_URL = $rootScope.restServerHost + '/rest/';

            this.Entity = function (entity) {
                lodash.merge(this, entity);

                if (entity._resources) {
                    this.resources = entity._resources("self", {}, {
                        update: {
                            method: 'PATCH'
                        }
                    });

                    this.save = function (successCallback, errorCallback, finallyCallback) {
                        this.resources.update(this, function (data) {
                            successCallback && successCallback(data);
                        }, function (data) {
                            errorCallback && errorCallback(data);
                        }).$promise.finally(function () {
                            finallyCallback && finallyCallback();
                        });
                    };

                    this.remove = function (successCallback, errorCallback, finallyCallback) {
                        this.resources.remove(function (data) {
                            successCallback && successCallback(data);
                        }, function (data) {
                            errorCallback && errorCallback(data);
                        }).$promise.finally(function () {
                            finallyCallback && finallyCallback();
                        });
                    };
                } else {
                    this.save = function (successCallback, errorCallback, finallyCallback) {
                        this.resources.save(this, function (data) {
                            SpringDataRestAdapter.process(data).then(function (newEntity) {
                                successCallback && successCallback(new that.Entity(newEntity));
                            });
                        }, function (data) {
                            errorCallback && errorCallback(data);
                        }).$promise.finally(function () {
                            finallyCallback && finallyCallback();
                        });
                    };
                }

                return this;
            };

            this.Entity.prototype.resources = null;
        };

        BaseFactory.prototype.get = function (id, successCallback, errorCallback, finallyCallback) {
            var self = this;

            $http.get(this.REST_URL + this.ENTITIES + "/" + id)
                .then(function (data) {
                    SpringDataRestAdapter.process(data).then(function (entity) {
                        successCallback && successCallback(new self.Entity(entity));
                    });
                }, function (data) {
                    errorCallback && errorCallback(data);
                }).finally(function () {
                    finallyCallback();
                });
        };

        BaseFactory.prototype.getAll = function (successCallback, errorCallback, finallyCallback) {
            var self = this;

            $http.get(this.REST_URL + this.ENTITIES)
                .then(function (data) {
                    SpringDataRestAdapter.process(data).then(function (entities) {
                        var listEntities = lodash.map(entities._embeddedItems, function(entity) {
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

        BaseFactory.prototype.init = function (entity, successCallback, errorCallback, finallyCallback) {
            var self = this;

            $http.get(this.REST_URL)
                .then(function (data) {
                    SpringDataRestAdapter.process(data).then(function (entities) {
                        self.Entity.prototype.resources = entities._resources(self.ENTITIES);
                        successCallback && successCallback(new self.Entity(entity));
                    });
                }, function (data) {
                    errorCallback && errorCallback(data);
                }).finally(function () {
                    finallyCallback();
                });
        };

        return BaseFactory;
    }]);