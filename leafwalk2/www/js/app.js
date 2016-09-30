// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('leafWalk', ['ionic', 'ngCordova', 'leafWalk.controllers','leafWalk.services'])

.run(function($ionicPlatform, $rootScope, $ionicLoading, $cordovaSplashscreen, $timeout) {
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

    $rootScope.$on('loading:show', function () {
        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner> Loading...'
        });
    });

    $rootScope.$on('loading:hide', function () {
        $ionicLoading.hide();
    });

    $rootScope.$on('$stateChangeStart', function () {
        console.log('Loading...');
        $rootScope.$broadcast('loading:show');
    });

    $rootScope.$on('$stateChangeSuccess', function () {
        console.log('done');
        $rootScope.$broadcast('loading:hide');
    });

    $timeout(function(){
      $cordovaSplashscreen.hide();
      console.log("Splashscreen");
    },20000);
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
        controller: 'IndexController',
        resolve: {
            openspace: ['openSpacesFactory', function (openSpacesFactory) {
               return openSpacesFactory.get({ id: 0 });
            }],
            /*feature: ['featureFactory', function (featureFactory) {
                return featureFactory.get({ id: 0 });
            }],*/
            /*leader: ['corporateFactory', function (corporateFactory) {
                return corporateFactory.get({id: 3});
            }]*/
         }
      }
    }
  })

  .state('app.about', {
      url: '/about',
      views: {
        'mainContent': {
          templateUrl: 'templates/about.html',
          //controller: 'AboutController',
          /*resolve: {
              leaders: ['corporateFactory', function (corporateFactory) {
                  return corporateFactory.query();
              }]
          }*/
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
          controller: 'OpenSpacesController',
          resolve: {
              openspaces: ['openSpacesFactory', function (openSpacesFactory) {
                  return openSpacesFactory.query();
              }]
          }
        }
      }
    })

  .state('app.openspacedetail', {
    url: '/openspaces/:id',
    views: {
      'mainContent': {
        templateUrl: 'templates/openspacedetail.html',
        controller: 'OpenSpaceDetailController',
        resolve: {
            openspace: ['$stateParams','openSpacesFactory', function($stateParams, openSpacesFactory){
                return openSpacesFactory.get({id:parseInt($stateParams.id, 10)});
            }]
        }
      }
    }
  })
  .state('app.favourites', {
    url: '/favourites',
    views: {
      'mainContent': {
        templateUrl: 'templates/favourites.html',
          controller:'FavouritesController',
          resolve: {
              openspaces:  ['openSpacesFactory', function(openSpacesFactory){
                return openSpacesFactory.query();
              }],
              favourites: ['favouriteFactory', function(favouriteFactory) {
                  return favouriteFactory.getFavourites();
              }]
          }
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');

});
