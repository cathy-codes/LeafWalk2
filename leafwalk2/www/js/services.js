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
;
