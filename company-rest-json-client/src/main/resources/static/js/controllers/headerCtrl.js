'use strict';

angular.module('companyAdminControllers')
    .controller('HeaderCtrl', [
        '$http',
        '$rootScope',
        '$scope',
        '$state',
        'searchEntities',
        'lodash',
        function ($http, $rootScope, $scope, $state, searchEntities, _) {
            // Init search entity
            $scope.initSearchEntity = function (searchEntity) {
                $scope.searchEntity = searchEntity.entity;
                $scope.linkToAddState = $state.href(searchEntity.addState);
                $scope.editState = searchEntity.editState;
                $scope.searchUrl = searchEntity.searchUrl;
                $scope.dataField = searchEntity.dataField;
                $scope.modelName = searchEntity.modelName;
            };

            $scope.credentials = {
                username: 'admin',
                password: 'admin'
            };

            if (!$rootScope.restServerHost) {
                $rootScope.restServerHost = 'http://localhost:18181';
            };

            $scope.initSearchEntity($state.current.data.searchEntity);

            $scope.setSearchEntity = function (entity) {
                $scope.initSearchEntity(searchEntities[entity]);
            };

            $rootScope.$on('$stateChangeSuccess', function () {
                $scope.initSearchEntity($state.current.data.searchEntity);
            });

            var authenticate = function(credentials, callback) {

                var headers = credentials ? {authorization : "Basic " + btoa(credentials.username + ":" + credentials.password)} : {};

                $http.get($rootScope.restServerHost + '/user', {headers : headers}).success(function(data) {
                    if (data.name) {
                        $rootScope.authenticated = true;
                    } else {
                        $rootScope.authenticated = false;
                    }
                    callback && callback();
                }).error(function() {
                    $rootScope.authenticated = false;
                    callback && callback();
                });

            }
            authenticate();

            var logout = function (callback) {
                $http.get($rootScope.restServerHost + '/logout').success(function() {
                    $state.go('main.home');
                    $rootScope.authenticated = false;
                    callback && callback();
                }).error(function() {
                    $rootScope.authenticated = true;
                    callback && callback();
                });
            }

            $scope.login = function() {
                if ($rootScope.authenticated) {
                    logout();
                } else {
                    authenticate($scope.credentials, function() {
                        if ($rootScope.authenticated) {
                            $state.go('main.listCompanies', undefined, {reload: true});
                        } else {
                            $state.go('main.home');
                        }
                    });
                }
            };

            $rootScope.$watch('authenticated', function (authenticated, old) {
                $scope.buttonLoginText = authenticated ? 'Log out' : 'Log in';

                if (!authenticated) {
                    $state.go('main.home');
                }
            });
        }]);