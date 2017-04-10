app.controller('InstantSearchController', InstantSearchController);
// The controller


function InstantSearchController($scope, $http, $location, $rootScope, savedMetaData, $window,$routeParams) {

    //$scope.currentPath = $location.path();
    // The data model. These items would normally be requested via AJAX,
    // but are hardcoded here for simplicity. See the next example for
    // tips on using AJAX.
//console.log = function() {};

    //$scope.onHomePage = false;
    //$rootScope.currentPath = $location.path();
    // 

    $rootScope.$on('$locationChangeSuccess', function(event, newUrl, oldUrl) {
        // TODO What you want on the event.
        $rootScope.currentPath = newUrl;
        //alert(newUrl);
    });
    function getData() {
        $http.get('/api/locations/area')
            .success(function(data) {

                $rootScope.client = {
                    selectedCityModel: {},
                    cities: data
                };
                $rootScope.client.selectedCityModel = 'Pune';
                //$scope.cities = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
    getData();

    
$scope.removeSearchString = function(d){
    console.log(d);
    //var d = $scope.searchString;
    //$scope.searchString = d.slice(d.length);
}

    $rootScope.$watch('client.selectedCityModel', function(newVal, oldVal) {
        if (oldVal == newVal) return;
        //alert(newVal);
        $http.get('/api/dashbord/results/?City=' + newVal)
            .success(function(data) {
                $scope.clients = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        angular.forEach($rootScope.client.cities, function(value, key) {
            if (value.city == newVal) {
                //alert(JSON.stringify(value));
                $scope.MainAreas = {
                    selectedAreaModel: {},
                    areas: value.areas
                };
            }
        });
    }, true);


    function GetClientsData(searchStr) {
        $http.get('/api/dashbord/results/?&City=' + $rootScope.client.selectedCityModel) // + '&DoctorName=' + searchStr + '&limit=5')
            .success(function(data) {
                $scope.clients = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
   // $rootScope.Area = $rootScope.Area;
    $scope.$watch('MainAreas.selectedAreaModel', function(newVal, oldVal) {
        //alert(JSON.stringify($rootScope.client));

        if (oldVal == newVal) return;
        //alert(JSON.stringify(newVal));
        if ($scope.MainAreas.selectedAreaModel.Area != null) {
            //alert('ssas'+ JSON.stringify(newVal));
            $http.get('/api/dashbord/results/?Area=' + newVal.Area)
                .success(function(data) {
                    $scope.clients = data;
                    $rootScope.Area = newVal;
                   // alert(JSON.stringify($rootScope.Area));
                   // alert(JSON.stringify($routeParams.category));
                    if ($rootScope.Area !=0 && $routeParams.category != undefined){
                       // alert(11);
                       $scope.MainAreas.selectedAreaModel.Area = $scope.MainAreas.selectedAreaModel.Area.replace(/ /g, '-');
                         $location.path('/' + $scope.client.selectedCityModel+'/' + $routeParams.category + '/'+ $scope.MainAreas.selectedAreaModel.Area);
                    }

                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }
    }, true);

    $scope.MainCategoriesData = [];
    $http.get('/api/category/categories')
        .success(function(data) {
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });



    $scope.loadDefaultCategories = function() {


        $scope.EnableTextInputResult = false;
        $scope.Categories = [];
        $scope.SubCategories = [];

        if ($scope.MainCategoriesData.length > 0) {} else {




            $http.get('/api/category/categories')
                .success(function(data) {
                    $scope.categories = data;
                    console.log(data);
                    //alert($scope.clients);
                    var newData = data.map(function(el) {

                        //alert(JSON.stringify(el));
                        metaDesc = el.categoryDescription;
                        metaKeys = el.subCategoryDescription;
                        var sss = el.category.map(function(s) {
                            $scope.Categories.push(s.name);
                            
                            angular.forEach(s.subcategories, function(value, key) {
                                               $scope.SubCategories.push(value.subCategoryName);
                                                
                           });
                           // var subCats = s.subcategories.map(function(subs) {
                               // $scope.SubCategories.push(subs);
                                // alert(subs);
                             //   return subs;
                           // });

                            return s.name;
                        });
                        return sss;

                        //return el.category.name; 
                    });

                   
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });




            // $scope.Categories = $scope.CategoriesTemp;
            // $scope.SubCategories = $scope.SubCategoriesTemp;

        }
        //  $http.get('/api/dashbord/results/?speciality='+ newVal.Area)
        //     .success(function(data) {
        //     $scope.clients = data;
        //         //$scope.cities = data;
        //         console.log(data);
        //     })
        //     .error(function(data) {
        //         console.log('Error: ' + data);
        //     });
        //  alert(t);
    }

    $scope.gotoResultsPageByCategory = function(category) {

        //alert(JSON.stringify($scope.client.selectedCityModel));
        //alert(JSON.stringify($scope.client.selectedCityModel.$$hashKey));
        if ($rootScope.client.selectedCityModel == null || $rootScope.client.selectedCityModel.$$hashKey)
            alert('Please enter City to begin search !');

             if ($scope.MainAreas.selectedAreaModel.Area == null){
                 $window.document.getElementById("mymodal1").className = "alert alert-danger";
                 $window.document.getElementById('mymodal1').innerHTML ='Please Select Area to begin search !';
                 alert('Please Select Area to begin search !');
             }else{
        if (($rootScope.client.selectedCityModel != null || !$rootScope.client.selectedCityModel.$$hashKey) && category){
                    category = category.replace(/ /g, '-');
                    $scope.MainAreas.selectedAreaModel.Area = $scope.MainAreas.selectedAreaModel.Area.replace(/ /g, '-');
                    $location.path('/' + $scope.client.selectedCityModel+'/' + category + '/'+ $scope.MainAreas.selectedAreaModel.Area);
                }
             }
        // if(category)
        //     $location.path('/showResults/'+ category);
        // if(angular.isDefined($scope.client.selectedCityModel))
        //     $location.path('/showResults/'+ $scope.client.selectedCityModel);
    }
    $scope.gotoResultsPageBySubCategory = function(subCategory) {

        //alert(JSON.stringify($rootScope.client.selectedCityModel));
        //alert(JSON.stringify($scope.client.selectedCityModel.$$hashKey));
        if ($rootScope.client.selectedCityModel == null || $rootScope.client.selectedCityModel.$$hashKey)
            alert('Please enter City to begin search !');

             if ($scope.MainAreas.selectedAreaModel.Area == null){
            alert('Please Select Area to begin search !');
            $window.document.getElementById("mymodal1").className = "alert alert-danger";
             $window.document.getElementById('mymodal1').innerHTML ='Please Select Area to begin search !';
             }else{

        if (($rootScope.client.selectedCityModel != null || !$rootScope.client.selectedCityModel.$$hashKey) && subCategory){
            subCategory = subCategory.replace(/ /g, '-');
            $scope.MainAreas.selectedAreaModel.Area = $scope.MainAreas.selectedAreaModel.Area.replace(/ /g, '-');
            $location.path('/' + $rootScope.client.selectedCityModel + '/'+subCategory+'/' + $scope.MainAreas.selectedAreaModel.Area );
        }
             }
        // if(category)
        //     $location.path('/showResults/'+ category);
        // if(angular.isDefined($scope.client.selectedCityModel))
        //     $location.path('/showResults/'+ $scope.client.selectedCityModel);
    }

$scope.selectedCategory = $routeParams.category;
$scope.selectedArea = $routeParams.area;
//alert($scope.selectedCategory);
//document.getElementById('exampleInputPassword2').value = selectedCategory;

    $scope.doSomething = function($event, test) {
        //        alert(1313);
        console.log(test);
        $event.stopPropagation();
    }


    $scope.isTextEntered = false;
    $scope.ShowDropdownData = false;
    $scope.EnableData = false;

    $scope.EnableDropDownData = function(searchStr) {

        if (searchStr) {
            //alert(1);
            $scope.EnableData = true;
        } else {
            $scope.EnableData = false;
        }
    }
    $scope.callScriptThenServer = function(searchStr) {
        //alert(searchStr);
        $scope.EnableTextInputResult = true;
        GetClientsData(searchStr);



        //alert($scope.searchString);
        if ($scope.searchString != null || $scope.searchString != undefined)
            $scope.isTextEntered = true;
        else
            $scope.isTextEntered = false;
    }
}
app.controller('ImageUploadController', function(Upload, $window, $scope, $http) {

    var vm = this;
    vm.submit = function() { //function to call on form submit
        if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
            // alert(vm.file.originalname);
            vm.upload(vm.file); //call upload function
        }
    }
    vm.upload = function(file) {
        file = Upload.rename(file, "hhh.jpeg");
        Upload.upload({
            url: 'http://nxsearch.com/uploadProfileImage', //webAPI exposed to upload the file
            data: { file: file } //pass file as data, should be user ng-model
        }).then(function(resp) { //upload function returns a promise
            if (resp.data.error_code === 0) { //validate success
                $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
            } else {
                $window.alert('an error occured');
            }
        }, function(resp) { //catch error
            console.log('Error status: ' + resp.status);
            $window.alert('Error status: ' + resp.status);
        }, function(evt) {
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
    };

});
