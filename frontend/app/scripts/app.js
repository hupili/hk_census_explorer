'use strict';

angular.module('frontendApp', [
    'ngTable',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngAnimate',
    'leaflet-directive',
    'jm.i18next',
    'ajoslin.promise-tracker',
    'cgBusy'
  ])
  .constant('serverPrefix', '/')
  .constant('translationPrefix', '/')
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/test', {
        templateUrl: 'views/test.html',
        controller: 'TestCtrl'
      })
      .when('/bar', {
        templateUrl: 'views/bar.html',
        controller: 'BarCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/getdata', {
        templateUrl: 'views/getdata.html',
        controller: 'GetDataCtrl'
      })
      .when('/discover', {
        templateUrl: 'views/discover.html',
        controller: 'DiscoverCtrl'
      })
      .when('/explore', {
        templateUrl: 'views/explore.html',
        controller: 'ExploreCtrl'
      })
      .when('/choropleth', {
        templateUrl: 'views/choropleth.html',
        controller: 'ChoroplethCtrl'
      })
      .when('/medians', {
        templateUrl: 'views/medians.html',
        controller: 'MediansCtrl'
      })
      .when('/browser', {
        templateUrl: 'views/browser.html',
        controller: 'BrowserCtrl'
      })
      .otherwise({
        redirectTo: '/'
      })
  }]).run(['translationPrefix', function(translationPrefix) {
    // We'll manually load the translation namespaces, because the config block
    // Appears to have some bugs in how it requests namespace files.
    // Specifically, having both the ns key and the fallbackNS key causes files to be requested
    // from the server twice.
    i18n.init({
      // lng: 'en-US', //removed to allow override by query string
      useCookie: false,
      useLocalStorage: false,
      detectLngQS: 'lang',
      fallbackLng: 'en-US',
      // Must have the ns key, even though we have the fallbackNS field, otherwise it doesn't properly load namespaces
      ns: {
        namespaces: ['generated_ns', 'human_ns'],
        defaultNs: 'human_ns'
      },
      // This line seems to cause double loading of namespace files if you use ng-i18next config block
      // But is required to have automatic fallback
      fallbackNS: ['human_ns', 'generated_ns'],
      load: 'current',
      resGetPath: translationPrefix + 'locale/__lng__/__ns__-translation.json',
      getAsync: false  // We'll block, since the translation files are pretty critical
    });
  }]);

angular.module('frontendApp').filter('translate', function(){
  return function(input, prefix){
    if (_.isUndefined(prefix)) {
      return i18n.t(input);
    } else {
      return i18n.t(prefix  + '.' + input);
    }
  }
});
