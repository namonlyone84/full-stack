'use strict';

angular.module('companyAdminControllers')
    .controller('OwnerCtrl', [
        '$scope',
        '$state',
        '$stateParams',
        'OwnerFactory',
        'CompanyFactory',
        'ModalService',
        'NotificationService',
        'OwnerCompanyFactory',
        function ($scope, $state, $stateParams, OwnerFactory, CompanyFactory, ModalService, Notification, OwnerCompanyFactory) {

            $scope.messages = {
                update: {
                    error: 'Failed to update owner.',
                    success: 'Owner updated successfully.'
                },
                create: {
                    error: 'Failed to create owner',
                    success: 'Owner created successfully.',
                    invalidNumber: 'Owner ID must be a number',
                    existed: 'An owner with this ID already exists'
                },
                delete: {
                    error: 'Failed to delete owner.',
                    success: 'Owner deleted successfully.',
                    warning: 'This owner is being assigned to {x}'
                },
                error: {
                    notFound: 'Owner not found.',
                    defaultError: 'There was an error while trying to request server.'
                }
            };

            $scope.isEditing = $stateParams.id ? true : false;
            $scope.posting = false;
            $scope.legend = 'New owner';

            // Initial factory
            var ownerFactory = new OwnerFactory();
            var ownerCompanyFactory = new OwnerCompanyFactory();
            var companyFactory = new CompanyFactory();

            $scope.checkExist = function (ownerId) {
                $scope.ownerIdExisted = false;
                ownerFactory.get(ownerId, function () {
                    // If the owner existed then error
                    $scope.ownerIdExisted = true;
                    $scope.posting = false;
                });
            };

            // Initialize owner model
            if ($scope.isEditing) {
                // Edit mode
                if ($stateParams.ownerModel) {
                    // If model is cached from create form
                    $scope.ownerModel = $stateParams.ownerModel;
                    updateLegend();
                } else {
                    // Get model from server
                    ownerFactory.get($stateParams.id, function (ownerModelResponse) {
                        $scope.ownerModel = ownerModelResponse;
                        updateLegend();
                    }, function (response) {
                        errorCallback(response);
                        $state.go('main.listOwner');
                    });
                }

                companyFactory.getCompaniesByOwnerId($stateParams.id, function (ownedCompanies) {
                    $scope.ownedCompanies = ownedCompanies;
                }, function (response) {
                    errorCallback(response);
                });
            } else {
                ownerFactory.init({name: null}, function (ownerModel) {
                    $scope.ownerModel = ownerModel;
                });
            }

            // Create or Update
            $scope.submit = function () {
                $scope.inProgress = true;

                if ($scope.ownerForm.$valid) {
                    prepareRequest();

                    if ($scope.isEditing) {
                        $scope.ownerModel.save(function () {
                            updateLegend();
                            Notification.notify($scope.messages.update.success, true);
                        }, function () {
                            Notification.notify($scope.messages.update.error, false);
                        }, function () {
                            $scope.posting = false;
                        });
                    } else {
                        // Check owner exist
                        ownerFactory.get($scope.ownerModel.id, function () {
                            // If the owner existed then error
                            Notification.notify($scope.messages.create.existed, false);
                            $scope.posting = false;
                        }, function () {
                            // If the owner hasn't existed yet then create new owner
                            $scope.ownerModel.save(function () {
                                // Switch to edit mode
                                $state.go('main.listOwner');

                                $scope.isEditing = true;
                                Notification.notify($scope.messages.create.success, true);
                            }, function () {
                                Notification.notify($scope.messages.create.error, false);
                            }, function () {
                                $scope.posting = false;
                            });
                        });
                    }
                }
            };

            // Delete
            $scope.delete = function () {
                ownerCompanyFactory.countCompaniesByOwner($scope.ownerModel.id, function (response) {
                    var warningMessage = getWarningMessage(response.data);
                    askToDelete(warningMessage);
                }, function () {
                    Notification.notify($scope.messages.delete.error, false);
                    $scope.inProgress = false;
                    $scope.posting = false;
                });
            };

            function askToDelete(warningMessage) {
                prepareRequest();
                $scope.inProgress = true;
                ModalService.openDeleteModal('owner', warningMessage, function () {
                    $scope.ownerModel.remove(function () {
                            Notification.notify($scope.messages.delete.success, true);
                            $state.go('main.listOwner');
                            $scope.inProgress = false;
                        }, function () {
                            Notification.notify($scope.messages.delete.error, false);
                            $scope.inProgress = false;
                        }
                    );
                }, function () {
                    $scope.inProgress = false;
                });
            }

            function getWarningMessage(numberCompanies) {
                var companyMessage = (numberCompanies == 1 ? numberCompanies + '  company. ' : numberCompanies + ' companies. ');
                return (numberCompanies > 0 ? $scope.messages.delete.warning.replace('{x}', companyMessage) : '');
            }

            /**
             * Reset all status before every request to server
             */
            function prepareRequest() {
                $scope.posting = true;
            }

            function updateLegend() {
                $scope.legend = $scope.ownerModel.name;
            }

            function errorCallback(response) {
                var errorMessage;
                switch (response.status) {
                    case 404:
                        errorMessage = $scope.messages.error.notFound;
                        break;
                    default :
                        errorMessage = $scope.messages.error.defaultError;
                }

                Notification.notify(errorMessage, false);
            }
        }]);