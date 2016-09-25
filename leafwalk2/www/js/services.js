'use strict';

angular.module('leafWalk.services', ['ngResource'])
        .constant("baseURL","http://localhost:3000/")
        .service('openSpacesFactory', ['$resource', 'baseURL', function($resource,baseURL) {

              this.getOpenSpaces = function() {
                  return $resource(baseURL+"openspaces/:id",null,  {'update':{method:'PUT' }});
              };

              /*openSpaceFactory.getOpenSpaces().query(
              function(response) {
                $scope.openspaces = response;
                $scope.showResults = true;
              },
              function(response) {
                $scope.message = "Error: "+response.status + " " + response.statusText;
              });*/
        }])
        /*.factory('corporateFactory', ['$resource', 'baseURL', function($resource,baseURL) {
            return $resource(baseURL+"leadership/:id");
        }])
        .factory('feedbackFactory', ['$resource', 'baseURL', function($resource,baseURL) {
            return $resource(baseURL+"feedback/:id");
        }])*/
        .factory('favouriteFactory', ['$resource', 'baseURL', function ($resource, baseURL) {
          var favFac = {};
          var favourites = [];

          favFac.addToFavourites = function (index) {
              for (var i = 0; i < favourites.length; i++) {
                  if (favourites[i].id == index)
                      return;
              }
              favourites.push({id: index});
          };

          favFac.deleteFromFavourites = function (index) {
              for (var i = 0; i < favourites.length; i++) {
                  if (favourites[i].id == index) {
                      favourites.splice(i, 1);
                  }
              }
          }

          favFac.getFavourites = function () {
              return favourites;
              //console.log(favourites[0]);
          };

          return favFac;
        }])
;
