angular.module('evalmtl', ['restangular']).
  controller('EvalMtlCtrl', function($scope, Restangular) {
    $scope.loaded = true;
    $scope.streets = [];
    $scope.search = function() {
      if ($scope.q_street.length < 2) return $scope.streets = [];
      $scope.loaded = false;
      Restangular.all('streets').getList({q: $scope.q_street}).then(function(streets) {
        $scope.loaded = true;
        $scope.streets = streets;
      });
    };
  });

