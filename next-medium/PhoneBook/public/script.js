var app = angular.module('myApp', []);
app.controller('myCtrl', ($scope, $http) => {
  var getData = () =>
    $http({
      method: 'GET',
      url: '/persons',
    }).then(
      (response) => {
        $scope.persons = response.data;
      },
      (error) => {
        console.log('error: ' + error.message);
      },
    );

  getData();
  $scope.deletePerson = (person) => {
    $http({
      method: 'DELETE',
      url: '/persons/:id',
      params: { id: person.id },
    }).then(
      (response) => {
        console.log(response);
        return getData();
      },
      (error) => {
        console.log('error: ' + error.message);
      },
    );
  };
  $scope.addPerson = () => {
    var body =
      '{ "name": "' +
      $scope.Name +
      '", "phone": "' +
      $scope.Phone +
      '", "street": "' +
      $scope.Street +
      '", "city": "' +
      $scope.City +
      '" }';
    $http({
      method: 'POST',
      url: '/persons',
      data: body,
    }).then(
      (response) => {
        console.log(response);
        return getData();
      },
      (error) => {
        console.log('error: ' + error.message);
      },
    );
  };
});
