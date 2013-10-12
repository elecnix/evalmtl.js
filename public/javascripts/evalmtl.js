angular.module('evalmtl', ['restangular']).
  service('SelectedStreet', function() {
    this.street_id = null;
    this.select = function(street_id) { this.street_id = street_id; };
    this.clear = function() { this.street_id = null; };
  }).
  controller('EvalMtlCtrl', function($scope, Restangular, SelectedStreet) {
    $scope.SelectedStreet = SelectedStreet;
    $scope.loaded = true;
    $scope.streets = [];
    $scope.search = function() {
      if ($scope.q_street.length < 2) return $scope.streets = [];
      $scope.loaded = false;
      Restangular.all('streets').getList({q: $scope.q_street}).then(function(streets) {
        $scope.loaded = true;
        $scope.streets = streets;
      }, function errorCallback() {
        alert("Oops error from server :(");
      });
    };
    $scope.select = function(street_id) {
      SelectedStreet.select(street_id);
    };
  }).
  controller('StreetCtrl', function($scope, Restangular) {
    $scope.street = null;
    $scope.$watch('SelectedStreet.street_id', function(street_id){
      if (street_id == null) return;
      Restangular.one('streets', street_id).get().then(function(street) {
        $scope.street = street;
      }, function errorCallback() {
        alert("Oops error from server :(");
      });
    });
  });

