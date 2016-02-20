'use strict';

angular.module('companyAdminControllers')
    .controller('ListCtrl', [
        '$http',
        '$rootScope',
        '$scope',
        '$state',
        'NotificationService',
        'NgTableParams',
        'lodash',
        function ($http, $rootScope, $scope, $state, Notification, NgTableParams, _) {
            if (!$rootScope.authenticated) {
                /*$state.go('main.home');*/
            }

            $scope.entity = $state.current.data.searchEntity;
            $scope.messages = {
                error: 'There was an error while trying to request server.'
            };
            $scope.inProgress = true;

            $scope.entitiesTable = new NgTableParams({
                page: 1,
                count: 10
            }, {
                counts: [],
                getData: getData
            });

            $scope.edit = function (id) {
                $state.go($scope.entity.editState, {id: id});
            };

            $scope.addNew = function () {
                $state.go($scope.entity.addState, undefined , {reload: true});
            };

            $scope.baseUrl = $rootScope.restServerHost + '/rest/' + $scope.entity.pluralName;

            function getUrlForFilters(filters, offset, limit, sorting) {
                var availableFilters = $scope.entity.filteringFields;
                var filterParams = [];

                availableFilters.forEach(function (property) {
                    filterParams.push(property + '=' + (filters[property] ? '%' + filters[property].toLowerCase() + '%' : '%'));
                });

                filterParams.push('offset=' + offset);
                filterParams.push('limit=' + limit);
                filterParams.push('s=' + sorting);

                    return $scope.baseUrl + '/findByProperties?' + filterParams.join('&');
            }

            function getData($defer, params) {

                var offset = params.page() - 1;
                var limit = params.count();
                var sorting = !_.isEmpty(params.sorting()) ? _.keys(params.sorting())[0] + ',' + _.values(params.sorting())[0] : getDefaultSort();
                var url;

                if (params.hasFilter()) {
                    url = getUrlForFilters(params.filter(), offset, limit, sorting);
                } else {
                    url = getDefaultUrl(offset, limit, sorting);
                }

                url = encodeURI(url);
                fetchEntities(url, $defer);
            }

            function fetchEntities(url, $defer) {
                $http.get(url)
                    .then(function (res) {
                        var entities = res.data._embedded[$scope.entity.pluralName];
                        $scope.entitiesTable.total(res.data.page.totalElements);
                        $scope.inProgress = false;

                        if ($defer) {
                            $defer.resolve(entities);
                        }
                    }, function () {
                        Notification.notify($scope.messages.error, false);
                    });
            }

            function getDefaultSort() {
                return $scope.entity.defaultSortField + ',asc';
            }

            function getDefaultUrl(offset, limit, sorting) {
                return $scope.baseUrl + '/search/listAllInPages?offset=' + offset + '&limit=' + limit + '&sort=' + (sorting || getDefaultSort());
            }
        }
    ]);
