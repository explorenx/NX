var app = angular.module('ClinicApp', ['ngRoute','checklist-model', 'ngCookies','ngFileUpload','angularUtils.directives.dirPagination', 'angular-linq','angular-page-loader', 'ui.bootstrap','hm.readmore', 'ngAnimate', 'ngTouch']);

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push(function ($q, $rootScope) {
        return {
            'request': function (config) {
                $rootScope.$broadcast('loading-started');
                return config || $q.when(config);
            },
            'response': function (response) {
                $rootScope.$broadcast('loading-complete');
                return response || $q.when(response);
            },
             'responseError': function (rejection) {
                $rootScope.$broadcast('loading-complete');
                return $q.reject(rejection);
            }
        };
    });
});

app.factory('loadingCounts', function () {
    return {
        enable_count: 0,
        disable_count: 0
    }
});

app.directive("loadingIndicator", function (loadingCounts, $timeout) {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            scope.$on("loading-started", function (e) {
                loadingCounts.enable_count++;
                //alert("displaying indicator " + loadingCounts.enable_count);
                //only show if longer than one sencond
                $timeout(function () {
                    if (loadingCounts.enable_count > loadingCounts.disable_count) {
                        element.css({ "display": "" });
                    }
                }, 5000);  
            });
            scope.$on("loading-complete", function (e) {
                loadingCounts.disable_count++;
                console.log("hiding indicator " + loadingCounts.disable_count);
                if (loadingCounts.enable_count == loadingCounts.disable_count) {
                    element.css({ "display": "none" });
                }
            });
        }
    };
});
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

app.directive('formAutofillFix', function() {
  return function(scope, elem, attrs) {
    // Fixes Chrome bug: https://groups.google.com/forum/#!topic/angular/6NlucSskQjY
    elem.prop('method', 'POST');

    // Fix autofill issues where Angular doesn't know about autofilled inputs
    if(attrs.ngSubmit) {
      setTimeout(function() {
        elem.unbind('submit').submit(function(e) {
          e.preventDefault();
          elem.find('input, textarea, select').trigger('input').trigger('change').trigger('keydown');
          scope.$apply(attrs.ngSubmit);
        });
      }, 0);
    }
  };
});

//app.config(['deviceDetectorProvider', function(deviceDetectorProvider) {
 // deviceDetectorProvider.addCustom("My_Custom_Detector",{or:["\\bChrome\\b","\\bFirefox\\b","\\bSafari\\b"]});
//}]);
 app.filter('slugify', function() {
        return function(input) {
            input = input || '';

            return input.replace(/ /g, '-').toLowerCase();
       }
    });

     app.filter('slugifynolower', function() {
        return function(input) {
            input = input || '';

            return input.replace(/ /g, '-');
       }
    });
 app.filter('slugifyapostropy', function() {
        return function(input) {
            input = input || '';

            return input.replace(/'/g, '');
       }
    });

     app.filter('slug1', function() {
        return function(input) {
            input = input || '';

            return input.replace(/-/g, ' ');
       }
    });

    app.filter('slug', function() {
        return function(input) {
            input = input || '';


            return input.replace(/\./g,'');
       }
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
        //alert(attrs.address1);
        // map config
        var mapOptions = {
            center: new google.maps.LatLng(attrs.lat, attrs.lng),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
            title: 'NX-Search',

            icon: '/blue-map.png'
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
           // alert(attrs.lat);
          //  var title = attrs.address1 + ' ' + attrs.address2
            var markerOptions = {
                position: position,
                map: map,
                title: attrs.address1 + ', ' + attrs.address2,
                icon: '/map-blue.png'
            };

            marker = new google.maps.Marker(markerOptions);
            markers.push(marker); // add marker to array
            
            google.maps.event.addListener(marker, 'click', function () {
                var directionsService = new google.maps.DirectionsService();
                var directionsDisplay = new google.maps.DirectionsRenderer();
                directionsDisplay.setMap(map);
                //directionsDisplay.setPanel(map);
           
                var request = {
                  origin: 'Pune', 
                  destination: attrs.address1 + ', ' + attrs.address2,
                  travelMode: google.maps.DirectionsTravelMode.DRIVING
                };
           
                directionsService.route(request, function(response, status) {
                    //alert(status);
                  if (status == google.maps.DirectionsStatus.OK) {
                      
                   

                    directionsDisplay.setDirections(response);
                  }
                });
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
        restrict: 'AC',
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
            .when('/map', {
                templateUrl : 'views/map.html',
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
            .when('/updateSitemap', {
                templateUrl : 'views/updatesitemap.html',
            })
            .when('/updateCategory/:id', {
                templateUrl : 'views/categories/updateCategory.html',
            })
            .when('/enquiryDetails', {
                templateUrl : 'views/dashboardResults/enquiryDetails.html',
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

            .when('/demoadd', {
                templateUrl : 'views/Candidate_form.html',
            })

        .when('/editHomeServicesRecord/:id', {
                templateUrl : 'views/dashboardResults/editHomeServicesRecord.html',
            })

        .when('/register-free', {
                templateUrl : 'views/dashboardResults/clientAddDemo.html',
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
            .when('/register', {
                templateUrl : 'views/Register.html',
                //controller : 'registerController'
            })
            .when('/login', {
                templateUrl : 'views/login.html',
                //controller : 'homeController'
            })
            .when('/disclaimer', {
                templateUrl : 'views/packages.html',
               // controller : 'sitemapsController'
            })
              .when('/form', {
                templateUrl : 'views/updatesitemap.html',
               // controller : 'sitemapsController'
            })
              .when('/export', {
                templateUrl : 'views/userfeedback.html',
                //controller : 'homeController'
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

           //.when('/results/:city/:area/:category/:subcategory?', {
              //  templateUrl : 'views/dashboardResults/showResults.html',
               // controller : 'dashResultsController',
               
          //  })   
            
             .when('/:city/:category/:categoryarea?', {
                templateUrl : 'views/dashboardResults/showResults.html',
                controller : 'dashResultsController',
               
            })
            .when('/:city/:category/:area/:categoryarea?', {
                templateUrl : 'views/dashboardResults/showResults.html',
                controller : 'dashResultsController',
               
            })

                .when('/profile/:city/:category/:area/:clinicname/:id?', {
                templateUrl : 'views/doctors/ProfilePage.html',
                //controller : 'homeController'
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
            
          
           

            .otherwise({redirectTo:'/'});


    // use the HTML5 History API
        $locationProvider.html5Mode(true);
         //$locationProvider.hashPrefix('!');
});


