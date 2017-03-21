app.controller('homeController', function($scope, $http, $rootScope) {
    $scope.formData = {};
    $scope.location = {};

    $scope.btnValue = "Save";

    // when landing on the page, get all todos and show them
    $http.get('/api/home/clinics')
        .success(function(data) {
            $scope.todos = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        $scope.formData.location = new Array();

        $scope.formData.location.push($scope.location);
        //       alert(JSON.stringify($scope.formData));//
        //alert($scope.formData._id);
        if ($scope.formData._id) {

            $http.put('/api/home/clinics', $scope.formData)
                .success(function(data) {
                    $scope.formData = {};
                    $scope.todos = data;
                    $scope.btnValue = "Save";

                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        } else {

            $http.post('/api/home/clinics', $scope.formData)
                .success(function(data) {
                    $scope.formData = {}; // clear the form so our user is ready to enter another
                    $scope.todos = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }
    };

    $scope.editClient = function(id) {
        $http.get('/api/home/clinics/' + id)
            .success(function(data) {
                $scope.formData = data;
                $scope.btnValue = "Update";
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/api/home/clinics/' + id)
            .success(function(data) {
                $scope.todos = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

});

app.controller('InstantSearchController', InstantSearchController);
// The controller


function InstantSearchController($scope, $http, $location, $rootScope, savedMetaData, $window) {

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


    //alert(JSON.stringify(savedMetaData.getData()));//
    var dd = savedMetaData.getData();

    $scope.metaDataTitle = dd.title;
    $scope.metaDataDescription = dd.description;
    $scope.metaDataKeywords = dd.keywords;
    //alert($scope.metaData);


    $window.document.getElementsByName('title')[0].content = dd.title;
    $window.document.getElementsByName('description')[0].content = dd.description;
    $window.document.getElementsByName('keywords')[0].content = dd.keywords;





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
                    //alert($rootScope.Area);
                    //alert(JSON.stringify($rootScope.Area));
                    //$scope.cities = data;
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

            var metaKeys = metaDesc = metaTitle = '';

            angular.forEach(data, function(value, key1) {
                angular.forEach(value.category, function(cat, key2) {
                    //alert(JSON.stringify(cat));
                    if (cat.categoryDescription && cat.subCategoryDescription) {
                        metaDesc += cat.categoryDescription + ' in Pune '+ ' nxsearch';
                        metaKeys += cat.subCategoryDescription + ' in Pune ';
                    }
                });
            });

            //alert(JSON.stringify($location.path));
            if ($location.path == 'http://nxsearch.com/') {

                $window.document.getElementsByName('title')[0].content = metaKeys;
                $window.document.getElementsByName('description')[0].content = metaDesc;
            } else {

            }
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




                    var metakeys = metaDesc = metaTitle = '';

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

                    $window.document.getElementsByName('title')[0].content = metakeys;
                    $window.document.getElementsByName('description')[0].content = metaDesc;

                    //alert($scope.Categories);
                    //$scope.MainCategoriesData = newData;
                    //alert($scope.clients);
                    // alert($scope.clients);
                    // $scope.subCategories = data[0].category[0].subcategories;
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
        if (($rootScope.client.selectedCityModel != null || !$rootScope.client.selectedCityModel.$$hashKey) && category)
            $location.path('/results/' + $scope.client.selectedCityModel + '/'+ $scope.MainAreas.selectedAreaModel.Area+'/' + category);
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

        if (($rootScope.client.selectedCityModel != null || !$rootScope.client.selectedCityModel.$$hashKey) && subCategory)
            $location.path('/results/' + $rootScope.client.selectedCityModel + '/'+ $scope.MainAreas.selectedAreaModel.Area+'/' + subCategory);
             }
        // if(category)
        //     $location.path('/showResults/'+ category);
        // if(angular.isDefined($scope.client.selectedCityModel))
        //     $location.path('/showResults/'+ $scope.client.selectedCityModel);
    }



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

    $scope.items = [{
            url: 'http://tutorialzine.com/2013/07/50-must-have-plugins-for-extending-twitter-bootstrap/',
            title: '50 Must-have plugins for extending Twitter Bootstrap',
            image: 'http://cdn.tutorialzine.com/wp-content/uploads/2013/07/featured_4-100x100.jpg'
        },
        {
            url: 'http://tutorialzine.com/2013/08/simple-registration-system-php-mysql/',
            title: 'Making a Super Simple Registration System With PHP and MySQL',
            image: 'http://cdn.tutorialzine.com/wp-content/uploads/2013/08/simple_registration_system-100x100.jpg'
        },
        {
            url: 'http://tutorialzine.com/2013/08/slideout-footer-css/',
            title: 'Create a slide-out footer with this neat z-index trick',
            image: 'http://cdn.tutorialzine.com/wp-content/uploads/2013/08/slide-out-footer-100x100.jpg'
        },
        {
            url: 'http://tutorialzine.com/2013/06/digital-clock/',
            title: 'How to Make a Digital Clock with jQuery and CSS3',
            image: 'http://cdn.tutorialzine.com/wp-content/uploads/2013/06/digital_clock-100x100.jpg'
        },
        {
            url: 'http://tutorialzine.com/2013/05/diagonal-fade-gallery/',
            title: 'Smooth Diagonal Fade Gallery with CSS3 Transitions',
            image: 'http://cdn.tutorialzine.com/wp-content/uploads/2013/05/featured-100x100.jpg'
        },
        {
            url: 'http://tutorialzine.com/2013/05/mini-ajax-file-upload-form/',
            title: 'Mini AJAX File Upload Form',
            image: 'http://cdn.tutorialzine.com/wp-content/uploads/2013/05/ajax-file-upload-form-100x100.jpg'
        },
        {
            url: 'http://tutorialzine.com/2013/04/services-chooser-backbone-js/',
            title: 'Your First Backbone.js App – Service Chooser',
            image: 'http://cdn.tutorialzine.com/wp-content/uploads/2013/04/service_chooser_form-100x100.jpg'
        }
    ];
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
