angular.module('leafWalk.controllers', [])

.controller('OpenSpacesController', ['$scope', 'openSpacesFactory', 'baseURL', function($scope, openSpacesFactory, baseURL) {
  $scope.baseURL = baseURL;
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
}])
.controller('OpenSpaceDetailController', ['$scope', '$stateParams', 'openSpacesFactory', 'baseURL', function($scope, $stateParams, openSpacesFactory, baseURL) {
    $scope.baseURL = baseURL;
    $scope.openspace = {};
    $scope.showResults = false;
    $scope.message="Loading ...";

    $scope.openspace = openSpacesFactory.getOpenSpaces().get({id:parseInt($stateParams.id,10)})
    .$promise.then(
      function(response){
          $scope.openspace = response;
          $scope.showResults = true;
      },
      function(response) {
          $scope.message = "Error: "+response.status + " " + response.statusText;
      }
    );


}])
.controller('DishCommentController', ['$scope', 'openSpacesFactory', function($scope,openSpacesFactory) {

    $scope.mycomment = {rating:5, comment:"", author:"", date:""};

    $scope.submitComment = function () {

        $scope.mycomment.date = new Date().toISOString();
        console.log($scope.mycomment);

        $scope.dish.comments.push($scope.mycomment);
        openSpacesFactory.getDishes().update({id:$scope.openspace.id},$scope.openspace);

        $scope.commentForm.$setPristine();

        $scope.mycomment = {rating:5, comment:"", author:"", date:""};
    }
}])

.controller('AboutController', ['$scope', 'corporateFactory', 'baseURL', function ($scope, corporateFactory, baseURL) {

    $scope.baseURL = baseURL;
    $scope.leaders = corporateFactory.query();

}]);


;
