'use strict';

angular.module('leafWalk.services', ['ngResource'])
        //.constant("baseURL","http://localhost:3000/")
        .constant("baseURL","http://192.168.2.12:3000/")
        .service('openSpacesFactory', ['$resource', 'baseURL', function($resource,baseURL) {

          return $resource(baseURL + "openspaces/:id", null, {
            'update': {
                method: 'PUT'
            }
          });
        }])
        /*.factory('corporateFactory', ['$resource', 'baseURL', function($resource,baseURL) {
            return $resource(baseURL+"leadership/:id");
        }])
        .factory('feedbackFactory', ['$resource', 'baseURL', function($resource,baseURL) {
            return $resource(baseURL+"feedback/:id");
        }])*/
        .factory('favouriteFactory', ['$resource', '$localStorage', 'baseURL', function ($resource, $localStorage, baseURL) {
          var favFac = {};
          //var favourites = [];
          var favourites = $localStorage.getObject('favourites', '[]');

          favFac.addToFavourites = function (index) {
              for (var i = 0; i < favourites.length; i++) {
                  if (favourites[i].id == index)
                      return;
              }
              favourites.push({id: index});

              //Add to localStorage
              $localStorage.storeObject('favourites',favourites);
              console.log(favourites);
          };

          favFac.deleteFromFavourites = function (index) {
              for (var i = 0; i < favourites.length; i++) {
                  if (favourites[i].id == index) {
                      console.log(favourites[i]);
                      favourites.splice(i, 1);

                      //Replace favourites in localStorage with new favourites
                      $localStorage.storeObject('favourites', favourites);
                  }
              }
          }

          favFac.getFavourites = function () {
              return favourites;
              //console.log(favourites[0]);
          };

          return favFac;
        }])

        .factory('$localStorage', ['$window', function($window) {
          return {
            store: function(key, value) {
              $window.localStorage[key] = value;
            },
            get: function(key, defaultValue) {
              return $window.localStorage[key] || defaultValue;
            },
            storeObject: function(key, value) {
              $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function(key,defaultValue) {
              return JSON.parse($window.localStorage[key] || defaultValue);
            }
          }
        }])
;
