'use strict';

// const base = 'http://localhost:53406/api/Thesaurus';
const base = 'http://demo7762620.mockable.io/';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/page1', {
    templateUrl: '/tpl1.html',
    controller: 'View1Ctrl as ctrl'
  });
}])

.controller('View1Ctrl', ['$http', '$scope', function($http, $scope) {
    $scope.words = [];
    $scope.added = false;

        var Load = () => {
            $http.get(`${base}/GetWords`).then(({data}) => {
                $scope.added = false;
                $scope.words = data;
            });

        };

        Load();

$scope.Add = () => {
$http.post(`${base}/AddSynonyms`, $scope.text.split(',')).then(() => {
    $scope.added = true;
})
};

        $scope.Load = Load;

$scope.GetSynonyms = () => {
	var word = $scope.word;
	$http.get(`${base}/GetSynonym?word=${word}`).then(({data}) => {
	    console.log(data);
    $scope.words = data;
    $scope.added = false;
});

}
}]);