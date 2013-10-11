angular.module('evalmtl', ['restangular']).
  controller('EvalMtlCtrl', function($scope, Restangular) {
    $scope.streets = [];
    $scope.search = function() {
      if ($scope.q_street.length < 2) return $scope.streets = [];
      $scope.streets = Restangular.all('streets').getList({q: $scope.q_street});
    };
  });

