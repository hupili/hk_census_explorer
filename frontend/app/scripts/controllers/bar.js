'use strict';

angular.module('frontendApp')
  .controller('BarCtrl', ['$scope', '$http', 'CensusAPI', 'Indicators', 'promiseTracker',
                           function ($scope, $http, CensusAPI, Indicators, promiseTracker) {

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
        console.log('response:');
        console.log(response);
        $scope.response = response;

        var data = [
              [{'value': 4, 'label': 'Chinese'}, {'value': 5, 'label': 'Chinese'}],
              [{'value': 6, 'label': 'Jap'}, {'value': 7, 'label': 'Jap'}],
              [{'value': 8, 'label': 'Ind'}, {'value': 9, 'label': 'Ind'}]
          ];

        

        var chartdiv = d3.select("#chart")
            .selectAll("div")
            .data(data)
            .enter()
              .append("div")
                .attr("class", "bar1")
                .style("width", function(d) { return d[0].value * 30 + "px"; })
                .text(function(d) { return d[0].label; })
               .append("div")
                .attr("class", "bar2")
                .style("width", function(d) { return d[1].value * 30 + "px"; })
                .text(function(d) { return d[1].label; });

    });
  };

  //$scope.refresh();

  console.log('here');
  }]);
