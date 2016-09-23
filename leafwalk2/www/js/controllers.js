angular.module('leafWalk.controllers', [])

.controller('OpenSpacesController', ['$scope', 'openSpacesFactory', function($scope, openSpacesFactory) {
  $scope.showResults = false;
  $scope.message = "Loading ...";

  openSpacesFactory.getOpenSpaces().query(
    function(response) {
      $scope.openspaces = response;
      $scope.showResults = true;
    },
    function(response) {
      $scope.message = "Error: "+response.status + " " + response.statusText;
    });
}])

.controller('IndexController', ['$scope', 'openSpacesFactory', 'baseURL', function($scope, openSpacesFactory, baseURL) {
    $scope.baseURL = baseURL;
    $scope.showResults = false;
    $scope.message="Loading ...";

    $scope.openspace = openSpacesFactory.getOpenSpaces().get({id:0})
    .$promise.then(
        function(response){
            $scope.openspace = response;
            $scope.showResults = true;
        },
        function(response) {
            $scope.message = "Error: "+response.status + " " + response.statusText;
        }
    );
}]);
