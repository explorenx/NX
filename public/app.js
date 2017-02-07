var app = angular.module('ClinicApp', ['ngRoute','checklist-model', 'ngCookies','ngFileUpload','angularUtils.directives.dirPagination', 'angular-linq']);


app.filter('searchFor', function(){

	// All filters must return a function. The first parameter
	// is the data that is to be filtered, and the second is an
	// argument that may be passed with a colon (searchFor:searchString)

	return function(arr, searchString){

		if(!searchString){
			return arr;
		}

		var result = [];

		searchString = searchString.toLowerCase();

		// Using the forEach helper method to loop through the array
		angular.forEach(arr, function(item){

			if(item.title.toLowerCase().indexOf(searchString) !== -1){
				result.push(item);
			}

		});

		return result;
	};

});



app.directive('clickAnywhereButHere', function($document){
  return {
    restrict: 'A',
    link: function(scope, elem, attr, ctrl) {
      elem.bind('click', function(e) {
        // this part keeps it from firing the click on the document.
        e.stopPropagation();
      });
      $document.bind('click', function() {
        // magic here.
        //alert(11);
        scope.$apply(attr.clickAnywhereButHere);
      })
    }
  }
});

app.factory("savedMetaData", function() {
   var metaInfo = {
       title : '',
       description : '',
       keywords : ''
   };

  return {
    setData: function(info) {
				metaInfo = info;
			},
    getData: function() {
        return metaInfo;
    }

  };
});

app.factory("LS", function($window, $cookies) {
   
  return {
    setCookieData: function(userStorage) {
				$cookies.put("userStorage", userStorage);
			},
    getCookieData: function() {
        var userStorage = $cookies.get("userStorage");
        return userStorage;
    },
    clearCookieData: function() {
        $cookies.remove("userStorage");
    }

  };
});

app.factory("authenticationSvc", function($http, $q, $window, $rootScope, LS) {
  
var userInfo;

function login(obj) {
//alert(1);
    var deferred = $q.defer();
		$http.post('/api/account/authenticate', obj)
			.success(function(data) {
                if(data.success)
                {


var clinicName = '';
$http.get('/api/dashbord/results/?userId='+ data.userDetails.id)
            .success(function(data) 
            {
                if(data){
                    clinicName = data[0].ClinicName;
                    //alert(clinicName);
                }
            }).error(function(e){

            });





                    userInfo = {
                            accessToken: data.token,
                            userName: data.userDetails.name,
                            role : data.userDetails.userRole,
                            clinicName : clinicName,
                            isAuthenticated : data.success
                        };
                        LS.setCookieData(JSON.stringify(userInfo));
                        //$window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
                        //alert($window.sessionStorage["userInfo"]);
                        $rootScope.UserName = data.userDetails.name;
                        deferred.resolve(userInfo);
                    // $rootScope.User = {};
                    // $rootScope.User.Id = data.userDetails.id;
                    // $rootScope.User.AuthToken = data.token;
                    // $rootScope.User.IsAuthenticated = data.success;

                    // $location.path("/showResults");

                }
                else
                {
                    alert('Invalid credentils !');
                }
            }).error(function(error) {
                        deferred.reject(error);
                });
                return deferred.promise;
};
console.log('token - '+ JSON.stringify(userInfo));
function logout() {
  var deferred = $q.defer();
    
    $http({
            method: "POST",
            url: '/api/account/logout',
            headers: {
                "access_token": userInfo.accessToken
            }
        }).then(function (result) {
            userInfo = null;
            LS.clearCookieData();
            //$window.sessionStorage["userInfo"] = null;
            deferred.resolve(result);
        }, function (error) {
            deferred.reject(error);
        });

    return deferred.promise;
};

function getUserInfo() {
    return userInfo;
  }

  function init() {
        if (LS.getCookieData()) {
            userInfo = JSON.parse(LS.getCookieData());
        }
    }

init();

return {
    login: login,
    logout : logout,
    getUserInfo : getUserInfo
  };

});

app.directive('myMap', function() {
    // directive link function
    var link = function(scope, element, attrs) {
        var map, infoWindow;
        var markers = [];
        
        // map config
        var mapOptions = {
            center: new google.maps.LatLng(attrs.lat, attrs.lng),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
            title: 'Pune',

            icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
        };
        
        // init the map
        function initMap() {
            if (map === void 0) {
                map = new google.maps.Map(element[0], mapOptions);
            }
        }    
        
        // place a marker
        function setMarker(map, position, title, content) {
            var marker;
            var markerOptions = {
                position: position,
                map: map,
                title: title,
                icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
            };

            marker = new google.maps.Marker(markerOptions);
            markers.push(marker); // add marker to array
            
            google.maps.event.addListener(marker, 'click', function () {
                // close window if not undefined
                if (infoWindow !== void 0) {
                    infoWindow.close();
                }
                // create new window
                var infoWindowOptions = {
                    content: content
                };
                infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                infoWindow.open(map, marker);
            });
        }
        
        
        // show the map and place some markers
        initMap();
        //alert((attrs.lat +' ' +attrs.lng));
        setMarker(map, new google.maps.LatLng(attrs.lat, attrs.lng), 'Pune',  attrs.address1 + ' ' + attrs.address2);

        // setMarker(map, new google.maps.LatLng(52.370216, 4.895168), 'Amsterdam', 'More content');
        // setMarker(map, new google.maps.LatLng(48.856614, 2.352222), 'Paris', 'Text here');
    };
    
    return {
        restrict: 'A',
        template: '<div id="gmaps"></div>',
        replace: true,
        link: link
    };
});


app.directive("select2", function($timeout, $parse) {
  return {
    restrict: 'AC',
    require: 'ngModel',
    link: function(scope, element, attrs) {
      console.log(attrs);
      $timeout(function() {
        element.select2();
        element.select2Initialized = true;
      });

      var refreshSelect = function() {
        if (!element.select2Initialized) return;
        $timeout(function() {
          element.trigger('change');
        });
      };
      
      var recreateSelect = function () {
        if (!element.select2Initialized) return;
        $timeout(function() {
          element.select2('destroy');
          element.select2();
        });
      };

      scope.$watch(attrs.ngModel, refreshSelect);

      if (attrs.ngOptions) {
        var list = attrs.ngOptions.match(/ in ([^ ]*)/)[1];
        // watch for option list change
        scope.$watch(list, recreateSelect);
      }

      if (attrs.ngDisabled) {
        scope.$watch(attrs.ngDisabled, refreshSelect);
      }
    }
  };
});

app.run(["$rootScope", "$location", function($rootScope,  $location, LS) {
     
  $rootScope.$on("$routeChangeSuccess", function(userInfo) {

//savedData.setCurrentPath('');

console.log('dataa ------ ');
//console.log(JSON.parse(LS.getData()));
 //if(LS.getCookieData())
   // $rootScope.UserName = JSON.parse(this.getCookieData()).userName;
  
  });

  $rootScope.$on("$routeChangeError", function(event, current, previous, eventObj) {
    if (eventObj.authenticated === false) {
      $location.path("/login");
    }
  });

$rootScope.$on("$routeChangeSuccess", function($rootScope,currentRoute, previousRoute){
    //Change page title, based on Route information
   
  });

  $rootScope.$on("$routeChangeSuccess", function($rootScope){
    //Change page title, based on Route information
   var url = $location.$$absUrl;
   //alert(url);

  });

  $rootScope.$on('$locationChangeSuccess', function(event, newUrl, oldUrl){
    // TODO What you want on the event.
    $rootScope.currentPath = newUrl;
    //alert(newUrl);
});

}]);

app.factory('sessionInjector', function(LS, $window) {  
    var sessionInjector = {
        request: function(config) {
           // console.log('sddd' + JSON.stringify(LS.getData()));
            
            if(LS.getCookieData())
            {
                 sessionInfo = JSON.parse(LS.getCookieData());
                 if(sessionInfo)
                    config.headers['access_token'] = sessionInfo.accessToken;
            }
                return config;
        }
    };
    return sessionInjector;
});
app.config(['$httpProvider', function($httpProvider,LS) {  
    //if(LS )
        $httpProvider.interceptors.push('sessionInjector');
}]);

app.config(function($routeProvider, $locationProvider) {

        $routeProvider 
        
        .when('/login', {
                templateUrl : 'views/login.html',
                //controller : 'homeController'
               
            })

            .when('/homepage/:id', {
                templateUrl : 'views/homepage.html',
                //controller : 'homeController'
                 resolve: {
                    auth: ["$q", "authenticationSvc", function($q, authenticationSvc) {
                        var userInfo = authenticationSvc.getUserInfo();

                        if (userInfo) {
                            return $q.when(userInfo);
                        } else {
                            return $q.reject({ authenticated: false });
                        }
                    }]
                }
            })

             .when('/profilepage/:id?', {
                templateUrl : 'views/doctors/ProfilePage.html',
                //controller : 'homeController'
            })
            .when('/addClient/:id?', {
                templateUrl : 'views/dashboardResults/addClient.html',
                controller : 'dashResultsController',
                resolve: {
                    auth: ["$q", "authenticationSvc", function($q, authenticationSvc) {
                        var userInfo = authenticationSvc.getUserInfo();

                        if (userInfo) {
                            return $q.when(userInfo);
                        } else {
                            return $q.reject({ authenticated: false });
                        }
                    }]
                }
           })

            
            .when('/results/:city/:area/:category?', {
                templateUrl : 'views/dashboardResults/showResults.html',
                controller : 'dashResultsController',
               
            })
            .when('/results/:city/:category?', {
                templateUrl : 'views/dashboardResults/showResults.html',
                controller : 'dashResultsController',
               
            })
            
            .when('/clientlist', {
                templateUrl: 'views/dashboardResults/ClientList.html',
                controller: 'dashResultsController',
                resolve: {
                    auth: ["$q", "authenticationSvc", function($q, authenticationSvc) {
                        var userInfo = authenticationSvc.getUserInfo();

                        if (userInfo) {
                            return $q.when(userInfo);
                        } else {
                            return $q.reject({ authenticated: false });
                       }
                    }]
               }
            })

            .when('/aditionalProfile/:id', {
                templateUrl : 'views/dashboardResults/aditionalProfile.html',
                controller : 'dashResultsController',
                resolve: {
                       auth: ["$q", "authenticationSvc", function($q, authenticationSvc) {
                      var userInfo = authenticationSvc.getUserInfo();

                           if (userInfo) {
                                return $q.when(userInfo);
                            } else {
                                return $q.reject({ authenticated: false });
                            }
                            }]
                        }
            })
            .when('/showResults', {
                templateUrl : 'views/dashboardResults/showResults.html',
                controller : 'dashResultsController',
                  //resolve: {
                         //   auth: ["$q", "authenticationSvc", function($q, authenticationSvc) {
                          //  var userInfo = authenticationSvc.getUserInfo();

                          //  if (userInfo) {
                           //     return $q.when(userInfo);
                         //   } else {
                          //      return $q.reject({ authenticated: false });
                         //   }
                         //   }]
                     //   }
            })
            .when('/dentist', {
                templateUrl : 'views/doctors/dentist.html',
                //controller : mainController
            })
            .when('/addCities', {
                templateUrl : 'views/locations/addCities.html',
                controller : 'citiesController',
                resolve: {
                    auth: ["$q", "authenticationSvc", function($q, authenticationSvc) {
                        var userInfo = authenticationSvc.getUserInfo();

                        if (userInfo) {
                            return $q.when(userInfo);
                        } else {
                            return $q.reject({ authenticated: false });
                        }
                    }]
                }
            })

           
            .when('/updateCity/:id', {
                templateUrl : 'views/locations/updateCity.html',
            })
            .when('/updateSitemap/:id', {
                templateUrl : 'views/updatesitemap.html',
            })
            .when('/updateCategory/:id', {
                templateUrl : 'views/categories/updateCategory.html',
            })


        .when('/editHomeServicesRecord/:id', {
                templateUrl : 'views/dashboardResults/editHomeServicesRecord.html',
            })
         .when('/editService/:id', {
                templateUrl : 'views/dashboardResults/editService.html',
               
            })
            .when('/editGallary/:id', {
                templateUrl : 'views/dashboardResults/editGallery.html',
               
            })
        .when('/editFeedback/:id', {
                templateUrl : 'views/dashboardResults/editFeedback.html',
               
            })

             .when('/editContact/:id', {
                templateUrl : 'views/dashboardResults/editContact.html',
               
            })
            .when('/school', {
                templateUrl : 'views/school/preschool.html',
                //controller : mainController
            })
           .when('/', {
                templateUrl : 'views/doctors/home.html',
                //controller : 'homeController'
                
            })
            .when('/contactus', {
                templateUrl : 'views/contactusbb.html',
                //controller : 'homeController'
            })
            .when('/aboutus', {
                templateUrl : 'views/AboutUs.html',
                //controller : 'homeController'
            })
            .when('/career', {
                templateUrl : 'views/Career.html',
                //controller : 'homeController'
            })
            .when('/privacypolicy', {
                templateUrl : 'views/privacyPolicy.html',
                //controller : 'homeController'
            })
             .when('/termsandconditions', {
                templateUrl : 'views/Terms.html',
                //controller : 'homeController'
            })
            .when('/login', {
                templateUrl : 'views/login.html',
                //controller : 'homeController'
            })
            .when('/packages', {
                templateUrl : 'views/packages.html',
                controller : 'sitemapsController'
            })

            .when('/categories', {
                templateUrl : 'views/categories/categories.html',
                controller : 'categoriesController',
                resolve: {
                    auth: ["$q", "authenticationSvc", function($q, authenticationSvc) {
                        var userInfo = authenticationSvc.getUserInfo();

                        if (userInfo) {
                            return $q.when(userInfo);
                        } else {
                            return $q.reject({ authenticated: false });
                        }
                    }]
                }
            })
            .when('/addCategories', {
                templateUrl : 'views/categories/addCategory.html',
                controller : 'categoriesController'
            })
            .when('/userfeedback', {
                templateUrl : 'views/userfeedback.html',
                //controller : 'homeController'
            })
            .when('/sitemap', {
                templateUrl : 'views/sitemap.xml',
                //controller : 'homeController'
            })




    // use the HTML5 History API
        $locationProvider.html5Mode(true);
         $locationProvider.hashPrefix('!');
});


