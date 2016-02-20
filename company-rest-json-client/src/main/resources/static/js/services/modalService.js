'use strict';

angular.module('companyAdminServices')
    .service('ModalService', ['$modal', 'lodash', function ($modal, _) {
        return {
            openDeleteModal: function (entity, warningMessage, deleteCallback, cancelCallback) {
                var deleteModal = $modal.open({
                    templateUrl: 'views/partials/deleteModal.html',
                    windowClass: 'delete-modal',
                    controller: function ($scope, $state, $modalInstance) {
                        $scope.entity = entity;
                        $scope.warningMessage = warningMessage;

                        $scope.delete = function () {
                            $modalInstance.close();
                        };

                        $scope.cancel = function () {
                            $modalInstance.dismiss();
                        };
                    }
                });

                deleteModal.result.then(deleteCallback, cancelCallback);
            }
        }
    }]);
