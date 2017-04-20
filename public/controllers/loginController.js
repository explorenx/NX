app.controller('loginController', function (authenticationSvc,$scope, $http, $routeParams, $location, $rootScope) {
	$scope.formData = {};

    
	
    //console.log($routeParams.id)
    //var clientId = $routeParams.id;
// function getData(){
//     $http.get('/api/category/categories')
//         .success(function(data) {
//             $scope.categories = data;
//             console.log(data);
//         })
//         .error(function(data) {
//             console.log('Error: ' + data);
//         });
// }
// getData();

$scope.userInfo = null;
$scope.login = function () {
   // alert(1);
    authenticationSvc.login($scope.formData)
        .then(function (result) {
            $scope.userInfo = result;
            $rootScope.ClinicName = result.clinicName;
            //alert(JSON.stringify(result));
              $rootScope.Role = result.role;
            console.log('lodin done');
            console.log(result);
            //$rootScope.UserName = $window.sessionStorage["userInfo"].UserName;
               $location.path("/enquiryDetails");
        }, function (error) {
            $window.alert("Invalid credentials");
            console.log(error);
        });
};


// $scope.login = function() {
// 		$http.post('/api/account/authenticate', $scope.formData)
// 			.success(function(data) {
//                 if(data.success)
//                 {
//                     $rootScope.User = {};
//                     $rootScope.User.Id = data.userDetails.id;
//                     $rootScope.User.AuthToken = data.token;
//                     $rootScope.User.IsAuthenticated = data.success;

//                      $location.path("/showResults");

//                 }
//                 else
//                 {
//                     alert('Invalid credentils !');
//                 }
// 			})
// 			.error(function(data) {
// 				console.log('Error: ' + data);
//         });
// };

$scope.logout = function () {
        authenticationSvc.logout()
            .then(function (result) {
                $scope.userInfo = null;
                 $rootScope.isAuthenticated = false;
                 $rootScope.UserName = undefined;
                $location.path("/login");
            }, function (error) {
                console.log(error);
            });
    };

});

