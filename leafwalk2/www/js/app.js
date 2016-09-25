// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('leafWalk', ['ionic', 'leafWalk.controllers','leafWalk.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/sidebar.html',
    //controller: 'OpenSpacesController'
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'mainContent': {
        templateUrl: 'templates/home.html',
        controller: 'IndexController'
      }
    }
  })

  .state('app.about', {
      url: '/about',
      views: {
        'mainContent': {
          templateUrl: 'templates/about.html',
          //controller: 'OpenSpacesController'
        }
      }
    })

   .state('app.contactus', {
      url: '/contactus',
      views: {
        'mainContent': {
          templateUrl: 'templates/contactus.html'
          //controller: 'AppCtrl'
        }
      }
    })

   .state('app.location', {
      url: '/location',
      views: {
        'mainContent': {
          templateUrl: 'templates/location.html'
        }
      }
    })

    .state('app.openspaces', {
      url: '/openspaces',
      views: {
        'mainContent': {
          templateUrl: 'templates/openspaces.html',
          controller: 'OpenSpacesController'
        }
      }
    })

  .state('app.openspacedetail', {
    url: '/openspaces/:id',
    views: {
      'mainContent': {
        templateUrl: 'templates/openspacedetail.html',
        controller: 'OpenSpaceDetailController'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');

});
