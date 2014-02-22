'use strict';

angular.module('frontendApp')
  .controller('BarCtrl', ['$scope', '$http', 'CensusAPI', 'Indicators', 'promiseTracker',
                           function ($scope, $http, CensusAPI, Indicators, promiseTracker) {

    $scope.refresh = function(){
      console.log('indicator:');

      var params={
          'return': 'groups',
          'groupby': 'area',
          'area': ['a01', 'a02'],
          'projector': 'value,row',
          'table': 0,
          'column': 'tab0_both',
      } ;//_.extend(_.clone(Indicators.queries.householdIncome, true), Indicators.queries.areaMedianModifier);
      var query = new CensusAPI.Query(params);

      console.log("query filters:");
      console.log(query._filters);

      var promise = query.fetch().then(function(response) {
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

  }]);
