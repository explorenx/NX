app.controller('updateHomeServicesGalleryAllController', function ($scope, $http, $routeParams, $location, Upload,  $window) {
$scope.formData = {};
var vm = this;
	var recordId = $routeParams.id;


    ////For Updating Home Data single record.
    $scope.initHomeUpdate = function(){    /// Use it for Loading default data to be updated & to show on respective screen .... Use this same 
        if(recordId)
        {
            $http.get('/api/profile/clinicProfile/' + recordId)
            .success(function (data) {
                $scope.formData = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
        }
    }
    $scope.EditRec = function(){  /// simple update Call to the database

        if(vm.file){
                var datetimestamp = Date.now();
                var ImageName = 'Home_Profile_' + $routeParams.id + '_' +  datetimestamp + '.jpg';
                   $scope.formData.Image = 'uploads/clientRelatedImages/' + ImageName;
                //    alert(vm.file.name);
                
                //$scope.formData.imageUrl = 'uploads/clientProfilePictures/' + fileName;
                //alert(JSON.stringify($scope.formData));

                    vm.file = Upload.rename(vm.file, ImageName);
                    Upload.upload({
                        url: 'http://nxsearch.com/uploadClientImage', //webAPI exposed to upload the file
                        data:{file:vm.file } //pass file as data, should be user ng-model
                    }).then(function (resp) { //upload function returns a promise
                        if(resp.data.error_code === 0){ //validate success
                            $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                        } else {
                            $window.alert('an error occured');
                        }
                    }, function (resp) { //catch error
                        console.log('Error status: ' + resp.status);
                        $window.alert('Error status: ' + resp.status);
                    }, function (evt) { 
                        console.log(evt);
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                        vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
                    });
            }

        $http.put('/api/profile/clinicProfile/' + $scope.formData._id, $scope.formData)
            .success(function(data) {
                //$scope.formData = {};
                //$scope.cities = data;
                history.go(-1)
            })
    }
    ////For Updating Service Data single record Ends here.

    $scope.initServiceUpdate = function(){    /// Use it for Loading default data to be updated & to show on respective screen .... Use this same 
        if(recordId)
        {
            $http.get('/api/service/clinicService/' + recordId)
            .success(function (data) {
                $scope.formData = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
        }
    }
    $scope.EditService = function(){  /// simple update Call to the database

        if(vm.file){
                var datetimestamp = Date.now();
                var ImageName = 'Home_Service_' + $routeParams.id + '_' +  datetimestamp + '.jpg';
                   $scope.formData.ServiceImage = 'uploads/clientRelatedImages/' + ImageName;
                //    alert(vm.file.name);
                
                //$scope.formData.imageUrl = 'uploads/clientProfilePictures/' + fileName;
                //alert(JSON.stringify($scope.formData));

                    vm.file = Upload.rename(vm.file, ImageName);
                    Upload.upload({
                        url: 'http://nxsearch.com/uploadClientImage', //webAPI exposed to upload the file
                        data:{file:vm.file } //pass file as data, should be user ng-model
                    }).then(function (resp) { //upload function returns a promise
                        if(resp.data.error_code === 0){ //validate success
                            $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                        } else {
                            $window.alert('an error occured');
                        }
                    }, function (resp) { //catch error
                        console.log('Error status: ' + resp.status);
                        $window.alert('Error status: ' + resp.status);
                    }, function (evt) { 
                        console.log(evt);
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                        vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
                    });
            }

        $http.put('/api/service/clinicService/' + $scope.formData._id, $scope.formData)
            .success(function(data) {
                //$scope.formData = {};
                //$scope.cities = data;
                history.go(-1)
            })
    }

    ////Gallary Update Code

     $scope.initGallaryUpdate = function(){    /// Use it for Loading default data to be updated & to show on respective screen .... Use this same 
        if(recordId)
        {
            $http.get('/api/gallary/clinicGallary/' + recordId)
            .success(function (data) {
                $scope.formData = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
        }
    }
    $scope.EditGallary = function(){  /// simple update Call to the database

        if(vm.file){
                var datetimestamp = Date.now();
                var ImageName = 'Home_Gallary_' + $routeParams.id + '_' +  datetimestamp + '.jpg';
                   $scope.formData.gallaryImage = 'uploads/clientRelatedImages/' + ImageName;
                //   alert(vm.file.name);
                
                //$scope.formData.imageUrl = 'uploads/clientProfilePictures/' + fileName;
                //alert(JSON.stringify($scope.formData));

                    vm.file = Upload.rename(vm.file, ImageName);
                    Upload.upload({
                        url: 'http://localhost:80/uploadClientImage', //webAPI exposed to upload the file
                        data:{file:vm.file } //pass file as data, should be user ng-model
                    }).then(function (resp) { //upload function returns a promise
                        if(resp.data.error_code === 0){ //validate success
                            $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                        } else {
                            $window.alert('an error occured');
                        }
                    }, function (resp) { //catch error
                        console.log('Error status: ' + resp.status);
                        $window.alert('Error status: ' + resp.status);
                    }, function (evt) { 
                        console.log(evt);
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                        vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
                    });
            }

        $http.put('/api/gallary/clinicGallary/' + $scope.formData._id, $scope.formData)
            .success(function(data) {
                //$scope.formData = {};
                //$scope.cities = data;
               history.go(-1)
            })
    }

////Feedback Update Code

 $scope.initFeedbackUpdate = function(){    /// Use it for Loading default data to be updated & to show on respective screen .... Use this same 
        if(recordId)
        {
            $http.get('/api/feedback/clinicfeedback/' + recordId)
            .success(function (data) {
                $scope.formData = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
        }
    }
    $scope.EditFeedback = function(){  /// simple update Call to the database

        $http.put('/api/feedback/clinicfeedback/' + $scope.formData._id, $scope.formData)
            .success(function(data) {
                //$scope.formData = {};
                //$scope.cities = data;
               history.go(-1)
            })
    }

    ////Contact Update Code

    $scope.initContactUpdate = function(){    /// Use it for Loading default data to be updated & to show on respective screen .... Use this same 
        if(recordId)
        {
            $http.get('/api/contact/cliniccontact/' + recordId)
            .success(function (data) {
                $scope.formData = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
        }
    }
    $scope.EditContact = function(){  /// simple update Call to the database

         var geocoder = new google.maps.Geocoder();
                var source = formData.address1 + ' ' + formData.address2;

                geocoder.geocode({ 'address': source }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            formData.lat = results[0].geometry.location.lat();
                            formData.long = results[0].geometry.location.lng();
           alert( $scope.formData.lat);
                        alert( $scope.formData.long); 
                        }
                        });
//alert(JSON.stringify($scope.formData));
if($scope.formData._id){
        $http.put('/api/contact/cliniccontact/' + $scope.formData._id, $scope.formData)
            .success(function(data) {
                //$scope.formData = {};
                
                //$scope.cities = data;
               history.go(-1)
            })
    }

     else{
        $http.post('/api/contact/cliniccontact/' + $scope.formData)
                .success(function(data) {
                    //$scope.formData = {};
                    //$scope.cities = data;
                    alert(JSON.stringify($scope.formData));
                history.go(-1)
                });

        }
    }


});
