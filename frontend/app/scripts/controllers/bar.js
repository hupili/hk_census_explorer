'use strict';

angular.module('frontendApp')
  .controller('BarCtrl', ['$scope', 'GeoMappings', '$http', 'CensusAPI', 'Indicators', 'promiseTracker',
                           function ($scope, GeoMappings, $http, CensusAPI, Indicators, promiseTracker) {

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

      var  config= _medianMonthlyIncomeConfig;
      var  parser= _medianMonthlyIncomeParser;
      var promise = query.fetch().then(function(response) {
        console.log('response:');
        console.log(response);
        $scope.response = response;
      });
    };

    /*
     * Median / mode income related indicators
     */

    // 14 categories total
    var _medianMonthlyIncomeColors = _.clone(colorbrewer.Reds['7']).reverse().concat(colorbrewer.Greens['7']);
    var _medianMonthlyIncomeConfig = {
      colors: _medianMonthlyIncomeColors,
      valueVar: 'row'
    };
    var _medianMonthlyIncomeParser = function(data) {
      var d = CensusAPI.joinGroups(data.groups, 'area');
      var scale = d3.scale.ordinal().domain(data.options.row).range(d3.range(14));
      _medianMonthlyIncomeConfig.scale = scale;
      return d;
    };

    $scope.indicators = [
      {
        name: 'Median monthly income',
      },
      {
        name: 'Most common monthly income',
        params: _.extend(_.clone(Indicators.queries.householdIncome, true), Indicators.queries.areaModeModifier),
        config: _medianMonthlyIncomeConfig,
        parser: _medianMonthlyIncomeParser
      },
      {
        name: 'Median housing rental amount',
        params: _.extend(_.clone(Indicators.queries.householdRent, true), Indicators.queries.areaModeModifier),
        config: _medianMonthlyIncomeConfig,
        parser: _medianMonthlyIncomeParser
      }
    ];

    $scope.mapLevel = 'ca';
    $scope.theData = $scope.areaData;
  }]);
