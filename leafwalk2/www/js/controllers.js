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

  openSpacesFactory.query(
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

.controller('IndexController', ['$scope', 'openSpacesFactory', 'baseURL',
  function($scope, openSpacesFactory, baseURL) {
    $scope.baseURL = baseURL;

    $scope.showResults = false;
    $scope.message="Loading ...";

    $scope.openspace = openSpacesFactory.get({id:0})
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
.controller('OpenSpaceDetailController', ['$scope', '$stateParams', 'openspace', 'openSpacesFactory', 'favouriteFactory', 'baseURL', '$ionicPopover', '$ionicModal',
  function($scope, $stateParams, openspace, openSpacesFactory, favouriteFactory, baseURL, $ionicPopover, $ionicModal) {
    $scope.baseURL = baseURL;
    $scope.openspace = {};
    $scope.showResults = false;
    $scope.message="Loading ...";

    //$scope.openspace = openSpacesFactory.get({id:parseInt($stateParams.id,10)})
    $scope.openspace = openspace
    .$promise.then(
      function(response){
          $scope.openspace = response;
          $scope.showResults = true;

          var myId = $scope.openspace.id;

            //Add to favourite
            $scope.addFavourite = function () {
                favouriteFactory.addToFavourites(myId);
                $scope.closePopover();
            };

            //Add comment
            $scope.addComment = function () {
                $scope.closePopover();
                $scope.openModal();
                console.log(addCommentForm.length);
            };

            //Popover
            $scope.popover = $ionicPopover.fromTemplateUrl('templates/openspace-detail-popover.html', {
                scope: $scope
            }).then(function (popover) {
                $scope.popover = popover;
            });

            $scope.openPopover = function ($event) {
                $scope.popover.show($event);
            };

            $scope.closePopover = function () {
                $scope.popover.hide();
            };

            $scope.$on('$destroy', function () {
                $scope.popover.remove();
            });

            //Modal
            $ionicModal.fromTemplateUrl('templates/openspace-comment.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
            });

            $scope.openModal = function () {
                $scope.modal.show();
            };
            $scope.closeModal = function () {
                $scope.modal.hide();
            };

            $scope.$on('$destroy', function () {
                $scope.modal.remove();
            });

            //Comment
            $scope.mycomment = { rating: 5, comment: "", author: "", date: "" };

            $scope.submitComment = function () {

                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);

                $scope.openspace.comments.push($scope.mycomment);
                openSpacesFactory.update({ id: $scope.openspace.id }, $scope.openspace);

                //$scope.addCommentForm.$setPristine();

                $scope.mycomment = { rating: 5, comment: "", author: "", date: "" };

                $scope.closeModal();
            };
      },
      function(response) {
          $scope.message = "Error: "+response.status + " " + response.statusText;
      }
    );


}])
.controller('OpenSpaceCommentController', ['$scope', 'openSpacesFactory', function($scope,openSpacesFactory) {

    $scope.mycomment = {rating:5, comment:"", author:"", date:""};

    $scope.submitComment = function () {

        $scope.mycomment.date = new Date().toISOString();
        console.log($scope.mycomment);

        $scope.openspace.comments.push($scope.mycomment);
        openSpacesFactory.update({id:$scope.openspace.id},$scope.openspace);

        $scope.commentForm.$setPristine();

        $scope.mycomment = {rating:5, comment:"", author:"", date:""};
    }
}])

.controller('AboutController', ['$scope', 'corporateFactory', 'baseURL', function ($scope, corporateFactory, baseURL) {

    $scope.baseURL = baseURL;
    $scope.leaders = corporateFactory.query();

}])
.controller('FavouritesController', ['$scope', 'openspaces', 'favourites', 'openSpacesFactory', 'favouriteFactory', 'baseURL', '$ionicListDelegate', '$ionicPopup', '$ionicLoading', '$timeout',
  function ($scope, openspaces, favourites, openSpacesFactory, favouriteFactory, baseURL, $ionicListDelegate, $ionicPopup, $ionicLoading, $timeout) {

    $scope.baseURL = baseURL;
    $scope.shouldShowDelete = false;

    $scope.favourites = favourites;
    $scope.openspaces = openspaces;

    /*$ionicLoading.show({
        template: '<ion-spinner></ion-spinner> Loading...'
    });*/

    //$scope.favourites = favouriteFactory.getFavourites();

    /*$scope.openspaces = openSpacesFactory.query(
      function (response) {
          $scope.openspaces = response;
          $timeout(function () {
              $ionicLoading.hide();
          }, 1000);
      },
      function (response) {
          $scope.message = "Error: " + response.status + " " + response.statusText;
          $timeout(function () {
            $ionicLoading.hide();
          }, 1000);
      });*/
      console.log($scope.openspaces, $scope.favourites);

      $scope.toggleDelete = function () {
          $scope.shouldShowDelete = !$scope.shouldShowDelete;
          console.log($scope.shouldShowDelete);
      }

      $scope.deleteFavourite = function (index) {
          var confirmPopup = $ionicPopup.confirm({
              title: 'Confirm Delete',
              template: 'Are you sure you want to delete this item?'
          });

          confirmPopup.then(function (res) {
            if (res) {
                console.log('Ok to delete');
                favouriteFactory.deleteFromFavourites(index);
            } else {
                console.log('Canceled delete');
            }
          });

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
