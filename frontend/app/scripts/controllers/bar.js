'use strict';

angular.module('frontendApp')
  .controller('BarCtrl', ['$scope', 'GeoMappings', '$http', 'CensusAPI', 'Indicators', 'promiseTracker',
                           function ($scope, GeoMappings, $http, CensusAPI, Indicators, promiseTracker) {

  var _defaultModel = {skip: 0, count: 5};
  $scope.model = _.clone(_defaultModel);
  // Available options
  $scope.options = {};

  // Build the query from the model filters
  $scope.refresh = function() {
    var q = new CensusAPI.Query($scope.model);
    q.addParam('return', 'options,data');
    q.addParam('projector', 'row,value');
    q.addParam('groupby', 'area');

    console.log('model:');
    console.log($scope.model);

    q.fetch().then(function(response) {
      $scope.options = response.options;
      // Sort the areas and regions
      $scope.options.area = _.sortBy($scope.options.area);
      $scope.options.district = _.sortBy($scope.options.district);

      console.log('response:');
      console.log(response);
      $scope.response = response;
    });
  };

  // Clear all selections, or the selection for a single model field
  $scope.clear = function(field) {
    if (_.isUndefined(field)) {
      $scope.model = _.clone(_defaultModel);
    } else {
      delete $scope.model[field];
    }
    $scope.refresh();
  };

  $scope.plot = function() {
    var q = new CensusAPI.Query($scope.model);
    q.addParam('return', 'groups,options');
    q.addParam('projector', 'row,value');
    q.addParam('groupby', 'area');

    console.log('model:');
    console.log($scope.model);

    q.fetch().then(function(response) {
      $scope.options = response.options;
      // Sort the areas and regions
      $scope.options.area = _.sortBy($scope.options.area);
      $scope.options.district = _.sortBy($scope.options.district);

      console.log('response:');
      console.log(response);
      $scope.response = response;
    });
  };

  //$scope.refresh();

  console.log('here');

  }]);
