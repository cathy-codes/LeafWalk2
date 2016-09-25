angular.module('leafWalk.controllers', [])
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  //Contact Us Form
  $scope.contact = {};

  // Create the contact modal that we will use later
  $ionicModal.fromTemplateUrl('templates/contactus.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.contactForm = modal;
  });

  // Triggered in the contact modal to close it
  $scope.closeContact = function() {
    $scope.contactForm.hide();
  };

  // Open the contact modal
  $scope.showContactForm = function() {
    $scope.contactForm.show();
  };

  // Perform the submit action when the user submits the contact form
  $scope.doContact = function() {
    console.log('Submitting comment form', $scope.contact);

    // Simulate a contact form delay. Remove this and replace with your reservation
    // code if using a server system
    $timeout(function() {
      $scope.closeContact();
    }, 1000);
  };
})

.controller('OpenSpacesController', ['$scope', 'openSpacesFactory', 'favouriteFactory', 'baseURL', '$ionicListDelegate', function($scope, openSpacesFactory, favouriteFactory, baseURL, $ionicListDelegate) {
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

    $scope.addFavorite = function (index) {
      console.log("index is " + index);
      favouriteFactory.addToFavourites(index);
      $ionicListDelegate.closeOptionButtons();
    }
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

}])
.controller('FavouritesController', ['$scope', 'openSpacesFactory', 'favouriteFactory', 'baseURL', '$ionicListDelegate', function ($scope, openSpacesFactory, favouriteFactory, baseURL, $ionicListDelegate) {

    $scope.baseURL = baseURL;
    $scope.shouldShowDelete = false;

    $scope.favourites = favouriteFactory.getFavourites();

    $scope.openspaces = openSpacesFactory.getOpenSpaces().query(
      function (response) {
          $scope.openspaces = response;
      },
      function (response) {
          $scope.message = "Error: " + response.status + " " + response.statusText;
      });
      console.log($scope.openspaces, $scope.favourites);

      $scope.toggleDelete = function () {
          $scope.shouldShowDelete = !$scope.shouldShowDelete;
          console.log($scope.shouldShowDelete);
      }

      $scope.deleteFavourite = function (index) {
          favouriteFactory.deleteFromFavourites(index);
          $scope.shouldShowDelete = false;
      }}
  ])
  .filter('favouriteFilter', function () {
      return function (openspaces, favourites) {
        var out = [];
        for (var i = 0; i < favourites.length; i++) {
            for (var j = 0; j < openspaces.length; j++) {
                if (openspaces[j].id === favourites[i].id)
                    out.push(openspaces[j]);
            }
        }
        return out;

    }});

;
