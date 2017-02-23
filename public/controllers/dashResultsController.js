app.controller('dashResultsController', function($scope, $rootScope, $http, $routeParams, $location, authenticationSvc, savedMetaData, LS, $window, Upload, $linq) {
    $scope.formData = {};
    $scope.location = {};

    $scope.random = function() {
        return 0.5 - Math.random();
    };
   
    $scope.currentPath = $location.path();
    console.log($location.path())
    console.log('LS.getCookieData');
    console.log(LS.getCookieData());
    if (LS.getCookieData()) {
        var udata = JSON.parse(LS.getCookieData());
        $rootScope.UserName = udata.userName;
        $rootScope.isAuthenticated = udata.isAuthenticated;
        $rootScope.ClinicName = udata.clinicName;
    }


    $scope.btnValue = "Save";



    //console.log($routeParams.id)
    //var clientId = $routeParams.id;
    function getData() {
        // var area = $routeParams.Area.Area;
        // alert(area);
        if($rootScope.Tags != null){
        //alert(JSON.stringify($rootScope.Area.Area));
            tags = $rootScope.Tags.Tags;
           // alert(tags);
           // alert(JSON.stringify(area));
            //var area = $routeParams.Area;
        }
        
        var city = $routeParams.city;
        var category = $routeParams.category;
         if($rootScope.Area != null){
        //alert(JSON.stringify($rootScope.Area.Area));
            area = $rootScope.Area.Area;
          //  alert(JSON.stringify(area));
            //var area = $routeParams.Area;
        }
         if($rootScope.subCategory != null){
        //alert(JSON.stringify($rootScope.Area.Area));
            subcategory = $rootScope.subCategory.subCategory;
           // alert(JSON.stringify(subcategory));
            //var area = $routeParams.Area;
        }
        var area = $routeParams.area;
        var subcategory = $routeParams.subcategory;
      //  $routeParams.area = area;
        //alert(subcategory);
       
        //alert(category + '  ' + city);
        var url = '/api/dashbord/results/?';

       // if(area)
        //url = url + '&Area=' + area;
        //alert(url);
        if (category && !area)
        url = url + '&Categories=' + category
       // alert(url);
        if (category && area)
           url = url + '&Categories=' + category + '&Area=' + area;
            
        if (category && city && area)
            url = url + '&City=' + city ;
           // alert(url);
        if (!category && city && area)
            url = url + '&City=' + city + '&Area=' + area;
        


        $window.document.title = category + ' in '+ area+' '  + city + ' | NXsearch';
        $window.document.getElementsByName('title')[0].content = category + ' in '+area+' '  + city + ' | NXsearch';
        $window.document.getElementsByName('description')[0].content = category + ' in '+area + ' ' + city + ' | NXsearch';
        $window.document.getElementsByName('keywords')[0].content = category + ' in '+area + ' ' + city + ' | NXsearch';
        // $window.document.getAttribute("og:title").content = category + ' in '+area+' '  + city;
         document.querySelector('[property="og:title"]').content = category + ' in '+area+' '  + city + ' | NXsearch';
         document.querySelector('[property="og:description"]').content = category + ' in '+area+' '  + city + ' | NXsearch';
         document.querySelector('[name="twitter:title"]').content = category + ' in '+area+' '  + city + ' | NXsearch';
         document.querySelector('[name="twitter:description"]').content = category + ' in '+area+' '  + city + ' | NXsearch';


        $http.get(url)
            .success(function(data) {
                $scope.results = data;
                console.log(JSON.stringify(data));
                //alert(JSON.stringify(url));
                if (data.length == 0) {
                    $http.get('/api/dashbord/results/?&City=' + city + '&Area=' + area + '&SubCategories=' + category)
                        .success(function(resdata) {
                            $scope.results = resdata;
                            console.log(data);
                            if (resdata.length == 0) {
                                //alert('inside by clinc ');
                                $http.get('/api/dashbord/results/?&City=' + city)
                                    .success(function(resClinicsdata) {
                                        //$scope.results = resClinicsdata;
                                        console.log(resClinicsdata);
                                        //if(resClinicsdata.length == 0){

                                        angular.forEach(resClinicsdata, function(value, key) {
                                            if (value.ClinicName.toLowerCase().indexOf(category.toLowerCase()) != -1) {
                                                $scope.results.push(value);
                                            }
                                        });

                                        if ($scope.results.length == 0) {
                                            angular.forEach(resClinicsdata, function(value, key) {
                                                if (value.DoctorName.toLowerCase().indexOf(category.toLowerCase()) != -1) {
                                                    $scope.results.push(value);
                                                }
                                            });
                                        }
                                        //alert(JSON.stringify($scope.results));

                                        //}
                                    })
                                    .error(function(data) {
                                        console.log('Error: ' + data);
                                    });

                            }
                        })
                        .error(function(data) {
                            console.log('Error: ' + data);
                        });
                }
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
    getData();


    $scope.SubCatetories = {
        subs: []
    };
    $scope.subCategories = [];

    function getCategoriesData() {
        $http.get('/api/category/categories')
            .success(function(data) {
                $scope.categories = data;
               // alert(JSON.stringify(data));
                  //  alert($scope.data.mainCategoryName);
                $scope.sample = data;
               //  var metaKeys = metaDesc = metaTitle = '';

        //    angular.forEach(data, function(value, key1) {
            //    angular.forEach(value.category, function(cat, key2) {
                    //alert(JSON.stringify(cat));
                 
            //        if (cat.categoryDescription && cat.subCategoryDescription) {
            //            metaDesc += cat.categoryDescription + ' nxsearch';
            //            metaKeys += cat.subCategoryDescription + ' nxsearch ';
                       
            //        }
                
              //              });
           // });
           // alert(metaDesc);
           
              
               // window.document.getElementsByName('description')[0].content = metaDesc;
              //  $window.document.getElementsByName('keywords')[0].content = metaKeys;
            
                // $scope.subCategories = data[0].category[0].subcategories;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
    getCategoriesData();


    $scope.getMainselectval = function() {

        $scope.SubSample = $scope.selitemMain.category;

        //$scope.selectedvalues= 'Name: ' + $scope.selitem.mainCategoryName + ' Id: ' + $scope.selitem._id;
    }
    $scope.getCatsselectval = function() {
        $scope.subCategories = $scope.selitemCats.subcategories;

        $scope.selectedvalues = 'subs: ' + $scope.selitemCats.subcategories;
        console.log($scope.selitemCats.name);
    }


    function getLocationsData() {
        $http.get('/api/locations/area')
            .success(function(data) {
                $scope.locations = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
    getLocationsData();
    $scope.SubLocationCatetories = {
        subs: []
    };
    $scope.getLocationselectval = function() {
        $scope.SubLocationsSample = $scope.selitemLocations.areas;

        //$scope.selectedvalues= 'Name: ' + $scope.selitem.mainCategoryName + ' Id: ' + $scope.selitem._id;
    }
    $scope.getSubLocationselectval = function() {
        $scope.subLocationCategories = $scope.selitemSubLocations.subArea;
        $scope.selectedvalues = 'subs: ' + $scope.selitemCats.subArea;
        //$scope.selectedvalues = 'subs: ' + $scope.selitemSubLocations.subArea;
        console.log($scope.selitemSubLocations.subArea);
        console.log($scope.selitemLocations.Area)
    }

    var vm = this;

 
 //alert($routeParams._id);
    if ($routeParams.id) {
        //$scope.getRecById = function(id) {
           
        $http.get('/api/dashbord/results/' + $routeParams.id)
            .success(function(data) {
                $scope.formData = data;
               // alert( $scope.formData);

                var metaInfo = {
                    title: data.ClinicName,
                    description: data.ClinicName,
                    keywords: data.ClinicName 
                };

                savedMetaData.setData(metaInfo);
                //alert(data.ClinicName);
                $window.document.title = data.ClinicName + ' in ' + data.Area + ' ' + data.City + ' ' + '| NXsearch';
                $window.document.getElementsByName('title')[0].content = data.ClinicName + ' in ' + data.Area + ' ' + data.City + ' ' + '| NXsearch';
                $window.document.getElementsByName('description')[0].content = data.ClinicName + ' in ' + data.Area + ' '+ data.Tags +' ' + data.City + ' | ' + data.Tags + ' | NXsearch';
                $window.document.getElementsByName('keywords')[0].content = data.Tags  + ' | ' + 'NXsearch';

                 document.querySelector('[property="og:title"]').content = data.ClinicName + ' in ' + data.Area + ' ' + data.City + ' ' + '| NXsearch';
                 document.querySelector('[property="og:description"]').content = data.ClinicName + ' in ' + data.Area + ' '+ data.Tags +' ' + data.City + ' | ' + data.Tags + ' | NXsearch';
                 document.querySelector('[name="twitter:title"]').content = data.ClinicName + ' in ' + data.Area + ' ' + data.City + ' ' + '| NXsearch';
                 document.querySelector('[name="twitter:description"]').content = data.ClinicName + ' in ' + data.Area + ' '+ data.Tags +' ' + data.City + ' | ' + data.Tags + ' | NXsearch';
                  document.querySelector('[name="twitter:image"]').content = 'www.nxsearch.com/' + data.imageUrl;

            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        //};
    }

    $scope.tempCategories = [{
        id: 'cat1',
        subs: [{ id: 'choice1' }, { id: 'choice2' }, { id: 'choice3' }]
    }];
    $scope.addNewSubCategories = function(id) {
        console.log(JSON.stringify($scope.tempCategories));
        for (var i = 0; i < $scope.tempCategories.length; i++) {
            if ($scope.tempCategories[i].id === id) {
                console.log(JSON.stringify($scope.tempCategories[i].subs));
                var newItemNo = $scope.tempCategories[i].subs.length + 1;
                $scope.tempCategories[i].subs.push({ 'id': 'choice' + newItemNo });
            }
        }
    };
    $scope.addNewCategory = function() {
            var newCategoryNo = $scope.tempCategories.length + 1;
            $scope.tempCategories.push({ 'id': 'cat' + newCategoryNo, subs: [{ id: 'choice1' }, { id: 'choice2' }, { id: 'choice3' }] });
        }
        // $scope.showAddChoice = function(choice) {
        //   return choice.id === $scope.categories.subs[$scope.categories.subs.length-1].id;
        // };


    // when submitting the add form, send the text to the node API
    $scope.createEditRec = function() {


        //$scope.formData.category = [];
        //  alert(JSON.stringify($scope.SubCatetories));//

        // angular.forEach($scope.tempCategories, function(value, key){
        //     if(value.id.length > 0)
        // 	{
        // 		 var subCats = value.subs.map( function( el ){ 
        //                             return el.name; 
        //                            });
        // 		$scope.formData.category.push({name : value.id, subcategories : subCats })
        //      	//subs.push(value);
        // 	}        
        // });
        // $scope.formData.category  = [];
        // var subs = [];
        // angular.forEach($scope.formData.subcats, function(value, key){
        //     if(value.length > 0)
        //         subs.push(value);        
        // });
        // $scope.formData.category.push({
        //                 name : $scope.formData.cats.name1,
        //                 subcategories : subs 
        // });
        // if($scope.formData._id)
        // {
        //     console.log($scope.formData);
        //     $http.put('/api/dashbord/results', $scope.formData)
        //     .success(function(data) {
        //         //$scope.formData = {};
        //         //$scope.cities = data;
        //         $scope.btnValue = "Save";
        //     })
        //     .error(function(data) {
        //         console.log('Error: ' + data);
        //     });
        // }
        // else{

        $scope.formData.City = $scope.selitemLocations.city;
        $scope.formData.Area = $scope.selitemSubLocations.Area;
        $scope.formData.SubArea = $scope.SubLocationCatetories.subs;


        $scope.formData.MainCategory = $scope.selitemMain.mainCategoryName;
        $scope.formData.Categories = $scope.selitemCats.name;
        $scope.formData.SubCategories = $scope.SubCatetories.subs;

        //      alert(JSON.stringify($scope.formData));//

        var registerUser = {
            Name: $scope.formData.DoctorName,
            Email: $scope.formData.email,
            Password: $scope.formData.password
        };


        if (vm.file) {
            alert(vm.file.name);
            var fileName = $scope.formData.ClinicName + '-' + $scope.formData.Area + '-' + $scope.formData.City + '-'+$routeParams.id + '-nxsearch.jpg';
            $scope.formData.imageUrl = 'uploads/clientProfilePictures/' + fileName;
            vm.file.name = fileName;
            //       alert('new file name -' + vm.file.name);//
            //        alert(JSON.stringify($scope.formData));//

            vm.file = Upload.rename(vm.file, fileName);
            Upload.upload({
                url: 'http://nxsearch.com/uploadProfileImage', //webAPI exposed to upload the file
                data: { file: vm.file } //pass file as data, should be user ng-model
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
        }


        if ($scope.formData._id) {
            $http.put('/api/dashbord/results/' + $scope.formData._id, $scope.formData)
                .success(function(data) {
                    //$scope.formData = {}; // clear the form so our user is ready to enter another
                    console.log(data);
                    $location.path("/showResults");
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        } else {

            $http.post('/api/account/signup', registerUser)
                .success(function(data) {
                    //$scope.formData = {}; // clear the form so our user is ready to enter another
                    console.log(data);

                    $scope.formData.userId = data.userId;
                    $http.post('/api/dashbord/results', $scope.formData)
                        .success(function(data) {
                            //$scope.formData = {}; // clear the form so our user is ready to enter another
                            console.log(data);
                        })
                        .error(function(data) {
                            console.log('Error: ' + data);
                        });

                    authenticationSvc.login(registerUser)
                        .then(function(result) {
                            $scope.userInfo = result;

                            $location.path("/showResults");
                        }, function(error) {
                            $window.alert("Invalid credentials");
                            console.log(error);
                        });
                    //getData();
                    //$location.path("/showResults");
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });

        }
    };




    // delete a city after checking it

    $scope.deleteRec = function(id) {
        $http.delete('/api/dashbord/results/' + id)
            .success(function(data) {
                getData();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    ///console.log('username - '+ LS.getData().UserName);



    $scope.tempHomeData = [{
        DoctorName: '',
        Image: '',
        Description: '',
        ClinicId: ''
    }];
    // $scope.addNewSubCategories = function(id) {
    //      console.log(JSON.stringify($scope.tempCategories));  
    //      for (var i=0; i < $scope.tempCategories.length; i++) {
    //           if ($scope.tempCategories[i].id === id) {
    // 			  console.log(JSON.stringify($scope.tempCategories[i].subs));  
    //               var newItemNo = $scope.tempCategories[i].subs.length+1;
    //               $scope.tempCategories[i].subs.push({'id':'choice'+newItemNo});
    //           }
    //       }
    // };

    var clientId = $routeParams.id;
   


    $scope.addNewCategory = function() {
        $scope.tempHomeData.push({
            DoctorName: '',
            Image: '',
            Description: '',
            ClinicId: ''
        });
    };
    $scope.onSelectUploadImage2 = function(i) {
        //alert(JSON.stringify(i));
        alert(i.$$hashKey);
        angular.forEach($scope.tempHomeData, function(value, key) {
            value.ClinicId = clientId;
            //alert(value.$$hashKey == i.$$hashKey);
            if (value.$$hashKey == i.$$hashKey) {
                //                        alert(vm.file);
                if (vm.file) {
                    var datetimestamp = Date.now();
                    var ImageName = 'Home_Profile_' + $routeParams.id + '_' + datetimestamp + '.jpg';
                    value.Image = 'uploads/clientRelatedImages/' + ImageName;
                    //    alert(vm.file.name);

                    //$scope.formData.imageUrl = 'uploads/clientProfilePictures/' + fileName;
                    //alert(JSON.stringify($scope.formData));

                    vm.file = Upload.rename(vm.file, ImageName);
                    Upload.upload({
                        url: 'http://nxsearch.com/uploadClientImage', //webAPI exposed to upload the file
                        data: { file: vm.file } //pass file as data, should be user ng-model
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
                }
            }

        });
        //       alert(JSON.stringify($scope.tempHomeData));//

    }
    $scope.addHomeData = function() {
        //alert(JSON.stringify($scope.tempHomeData));
        clientId = $routeParams.id;
        if (clientId != undefined || clientId != null) {

            angular.forEach($scope.tempHomeData, function(value, key) {
                value.ClinicId = clientId;
                alert(value);
                $http.post('/api/profile/clinicProfile', value)
                    .success(function(data) {
                        //$scope.formData = {}; // clear the form so our user is ready to enter another
                        console.log(data);
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
                $location.path("/aditionalProfile/"+$routeParams.id);

            });

        }

    };

    //Service
    $scope.tempServiceData = [{
        ServiceName: '',
        ServiceImage: '',
        ServiceInfo: '',
        ClinicId: ''
    }];
    // $scope.addNewSubCategories = function(id) {
    //      console.log(JSON.stringify($scope.tempCategories));
    //      for (var i=0; i < $scope.tempCategories.length; i++) {
    //           if ($scope.tempCategories[i].id === id) {
    // 			  console.log(JSON.stringify($scope.tempCategories[i].subs));
    //               var newItemNo = $scope.tempCategories[i].subs.length+1;
    //               $scope.tempCategories[i].subs.push({'id':'choice'+newItemNo});
    //           }
    //       }
    // };


    $scope.addNewCategory1 = function() {
        $scope.tempServiceData.push({
            ServiceName: '',
            ServiceImage: '',
            ServiceInfo: '',
            ClinicId: ''
        });
    }

    $scope.onSelectUploadImage1 = function(i) {
        //alert(JSON.stringify(i));
        alert(i.$$hashKey);
        angular.forEach($scope.tempServiceData, function(value, key) {
            value.ClinicId = clientId;
            //alert(value.$$hashKey == i.$$hashKey);
            if (value.$$hashKey == i.$$hashKey) {
                //                        alert(vm.file);
                if (vm.file) {
                    var datetimestamp = Date.now();
                    var ImageName = 'Service_Profile_' + $routeParams.id + '_' + datetimestamp + '.jpg';
                    value.ServiceImage = 'uploads/clientRelatedImages/' + ImageName;
                    //    alert(vm.file.name);

                    //$scope.formData.imageUrl = 'uploads/clientProfilePictures/' + fileName;
                    //alert(JSON.stringify($scope.formData));

                    vm.file = Upload.rename(vm.file, ImageName);
                    Upload.upload({
                        url: 'http://nxsearch.com/uploadClientImage', //webAPI exposed to upload the file
                        data: { file: vm.file } //pass file as data, should be user ng-model
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
                }
            }

        });
        //       alert(JSON.stringify($scope.tempServiceData));//

    }
    $scope.addServiceData = function() {
        //alert(JSON.stringify($scope.tempHomeData));
        clientId = $routeParams.id;
        if (clientId != undefined || clientId != null) {

            angular.forEach($scope.tempServiceData, function(value, key) {
                value.ClinicId = clientId;
                alert(value);
                $http.post('/api/service/clinicService', value)
                    .success(function(data) {
                        //$scope.formData = {}; // clear the form so our user is ready to enter another
                        console.log(data);
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
                $location.path("/aditionalProfile/"+$routeParams.id);

            });

        }

    };

    if (clientId != undefined || clientId != null) {

        $http.get('/api/dashbord/results/' + clientId)
            .success(function(data) {
                $scope.client = data;
          console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }




    //Gallary
    $scope.tempGallaryData = [{

        gallaryImage: '',
        ClinicId: ''
    }];



    $scope.addNewCategory2 = function() {
        $scope.tempGallaryData.push({
            gallaryImage: '',
            ClinicId: ''
        });
    };

    $scope.onSelectUploadImage = function(i) {
        //alert(JSON.stringify(i));
        alert(i.$$hashKey);
        angular.forEach($scope.tempGallaryData, function(value, key) {
            value.ClinicId = clientId;
            //alert(value.$$hashKey == i.$$hashKey);
            if (value.$$hashKey == i.$$hashKey) {
                //                        alert(vm.file);
                if (vm.file) {
                    var datetimestamp = Date.now();
                    var ImageName = $scope.formData.ClinicName + '-' + $scope.formData.Area + '-' + 'nxsearch' + '-' + $routeParams.id + datetimestamp+'.jpg';
                    value.gallaryImage = 'uploads/clientRelatedImages/' + ImageName;
                    //    alert(vm.file.name);

                    //$scope.formData.imageUrl = 'uploads/clientProfilePictures/' + fileName;
                    //alert(JSON.stringify($scope.formData));

                    vm.file = Upload.rename(vm.file, ImageName);
                    Upload.upload({
                        url: 'http://nxsearch.com/uploadClientImage', //webAPI exposed to upload the file
                        data: { file: vm.file } //pass file as data, should be user ng-model
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
                }
            }

        });
        //        alert(JSON.stringify($scope.tempGallaryData));//

    }


    $scope.addGallaryData = function() {
        //alert(JSON.stringify($scope.tempHomeData));
        clientId = $routeParams.id;
        if (clientId != undefined || clientId != null) {

            angular.forEach($scope.tempGallaryData, function(value, key) {
                value.ClinicId = clientId;
                alert(value);
                $http.post('/api/gallary/ClinicGallary', value)
                    .success(function(data) {
                        //$scope.formData = {}; // clear the form so our user is ready to enter another
                        console.log(data);
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
                $location.path("/aditionalProfile/"+$routeParams.id);

            });

        }

    };
    //feedback
    $scope.tempFeedbackData = [{

        userName: '',
        feedback: '',
        likes: '',
        dislikes: '',
        ClinicId: ''
    }];



    $scope.addNewCategory3 = function() {
        $scope.tempFeedbackData.push({
            userName: '',
            feedback: '',
            likes: '',
            dislikes: '',
            ClinicId: ''
        });
    };



    $scope.addGFeedbackData = function() {
        //alert(JSON.stringify($scope.tempHomeData));
        clientId = $routeParams.id;
        if (clientId != undefined || clientId != null) {

            angular.forEach($scope.tempFeedbackData, function(value, key) {
                value.ClinicId = clientId;
                alert(value);
                $http.post('/api/feedback/clinicfeedback', value)
                    .success(function(data) {
                        //$scope.formData = {}; // clear the form so our user is ready to enter another
                        console.log(data);
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
               $location.path("/aditionalProfile/"+$routeParams.id);

            });

        }


    };


    //contact
    $scope.tempContactData = [{

        clinicmobile: '',
        address1: '',
        address2: '',
        lat: '',
        long: '',
        ClinicId: ''
    }];



    $scope.addNewCategory4 = function() {
        $scope.tempContactData.push({
            clinicmobile: '',
            address1: '',
            address2: '',
            lat: '',
            long: '',
            ClinicId: ''
        });
    };

    $scope.addcontactData = function() {


        //alert(JSON.stringify($scope.tempHomeData));
        clientId = $routeParams.id;
        if (clientId != undefined || clientId != null) {

            angular.forEach($scope.tempContactData, function(value, key) {
                value.ClinicId = clientId;
                alert(value);
                $http.post('/api/contact/cliniccontact', value)
                    .success(function(data) {
                        //$scope.formData = {}; // clear the form so our user is ready to enter another
                        alert(JSON.stringify(data));
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
                $location.path("/homepage/"+$routeParams.id);

            });

        }
    };


    $scope.tabs = [{
            title: 'Home',
            url: 'one.tpl.html'
        }, {
            title: 'Services',
            url: 'two.tpl.html'
        }, 
        {
            title: 'Gallary',
            url: 'four.tpl.html'
        },
        {
            title: 'Location',
            url: 'five.tpl.html'
        }

    ];
    $scope.currentTab = 'one.tpl.html';


    function getData5() {
        //alert($routeParams.id);
        $http.get('/api/profile/clinicProfile/?ClinicId=' + $routeParams.id)
            .success(function(data) {
                $scope.HomeData = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
    getData5();



    $scope.onClickTab = function(tab) {
        $scope.currentTab = tab.url;
    }

    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }
    $scope.deleteRec5 = function(id) {
        $http.delete('/api/profile/clinicProfile/' + id)
            .success(function(data) {
                getData5();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    //Service
    function getData4() {
        $http.get('/api/service/clinicService/?ClinicId=' + $routeParams.id)
            .success(function(data) {
                $scope.ServiceData = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
    getData4();




    $scope.deleteRec4 = function(id) {
        $http.delete('/api/service/clinicService/' + id)
            .success(function(data) {
                getData4();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    //Feedback
    function getData3() {
        $http.get('/api/feedback/clinicfeedback/?ClinicId=' + $routeParams.id)
            .success(function(data) {
                $scope.FeedbackData = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
    getData3();


    // delete a feedback after checking it
    $scope.deleteRec3 = function(id) {
        $http.delete('/api/feedback/clinicfeedback/' + id)
            .success(function(data) {
                getData3();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    //Gallary
    $scope.myInterval = 3000;

    function getData2() {
        $http.get('/api/gallary/clinicGallary/?ClinicId=' + $routeParams.id)
            .success(function(data) {
                $scope.GallaryeData = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
    getData2();




    // delete a image after checking it
    $scope.deleteRec2 = function(id) {
        $http.delete('/api/gallary/clinicGallary/' + id)
            .success(function(data) {
                getData2();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    //Contact
    function getData1() {
        $http.get('/api/contact/cliniccontact/?ClinicId=' + $routeParams.id)
            .success(function(data) {
                $scope.ContacteData = data[data.length - 1];
                console.log(data);

            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
    getData1();



    // delete a contact after checking it
    $scope.deleteRec1 = function(id) {
        $http.delete('/api/contact/cliniccontact/' + id)
            .success(function(data) {
                getData1();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.editRecord = function(id) {
        $location.path('/editHomeServicesRecord/' + id);
    }

    $scope.editService = function(id) {
        $location.path('/editService/' + id);
    }

    $scope.editGallary = function(id) {
        $location.path('/editGallary/' + id);
    }

    $scope.editFeedback = function(id) {
        $location.path('/editFeedback/' + id);
    }

    $scope.editContact = function(id) {
        $location.path('/editContact/' + id);
    }



    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
            
            center: { lat: formData.lat, lng: formData.long },
            
            zoom: 6
        });
        
        var infoWindow = new google.maps.InfoWindow({ map: map });

    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
    }


function site(){
    //alert(JSON.stringify(url));
      $http.post('api/sitemap/sitemap', $rootScope.url)
   .success(function(data) {
                            //$scope.formData = {}; // clear the form so our user is ready to enter another
    //alert(data);

   });
}
site();
   
});