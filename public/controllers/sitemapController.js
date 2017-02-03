app.controller('sitemapsController', function($scope, $http, $routeParams, $location) {
    $scope.formData = {};

    $scope.btnValue = "Save";
    //console.log($routeParams.id)

    function getData() {
        $http.get('/api/sitemap/sitemap')
            .success(function(data) {
                $scope.cities = data;
                console.log(JSON.stringify(data));
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
    getData();


    
   // $scope.addNewSubCategories = function(id) {
      //  console.log(JSON.stringify($scope.tempCategories));
        
    //};
   // $scope.addNewCategory = function() {
   //         var newCategoryNo = $scope.tempCategories.length + 1;
    //        $scope.tempCategories.push({ 'id': 'cat' + newCategoryNo, subs: [{ id: 'choice1' }, { id: 'choice2' }, { id: 'choice3' }] });
     //   }
        // $scope.showAddChoice = function(choice) {
        //   return choice.id === $scope.categories.subs[$scope.categories.subs.length-1].id;
        // };


    // when submitting the add form, send the text to the node API
    $scope.createEditRec = function() {
        //$scope.formData.areas = [];
        console.log(JSON.stringify($scope.formData));

        //angular.forEach($scope.tempCategories, function(value, key) {
           // console.log(JSON.stringify(value));
          //  if (value.id.length > 0) {
           //     var subCats = value.subs.map(function(el) {
             //       return el.name;
            //    });
           //     var subCats = subCats.filter(function(e) { return e === 0 || e });
                //			 alert(JSON.stringify(subCats));
            //    $scope.formData.areas.push({ Area: value.id, subArea: subCats })
                    //subs.push(value);
         //   }
      //  });

        // $scope.formData.category  = [];
        // var subs = [];
        // angular.forEach($scope.formData.subcats, function(value, key){
        //     console.log(JSON.stringify(value));
        //     if(value.length > 0)
        //         subs.push(value);        
        // });

        // $scope.formData.category.push({
        //                 name : $scope.formData.cats.name1,
        //                 subcategories : subs 
        // });
        // alert(JSON.stringify($scope.formData));
        if ($scope.formData._id) {
            //alert($scope.formData);
            $http.put('/api/sitemap/sitemap/' + $scope.formData._id, $scope.formData)
                .success(function(data) {
                    //$scope.cities = data;
                    $location.path('/packages');
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        } else {
            $http.post('/api/sitemap/sitemap', $scope.formData)
                .success(function(data) {
                    //$scope.formData = {}; // clear the form so our user is ready to enter another
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }
        getData();
        //$location.path("/categories");
    };
    $scope.clearForm = function() {
            $scope.formData = null;
        }
        // delete a city after checking it
    $scope.deletecity = function(id) {
        $http.delete('/api/sitemap/sitemap/' + id)
            .success(function(data) {
                getData();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };


    $scope.initUpdateSitemap = function() {
        var clientId = $routeParams.id;
        //alert(clientId);
        if (clientId != null) {
            $scope.btnValue = 'Update';
            $http.get('/api/sitemap/sitemap/' + clientId)
                .success(function(data) {
                    $scope.formData = data;
                    $scope.city = data;

                    //data.areas = Area - id, subArea - subs
                   // $scope.tempCategories = [];
                   // angular.forEach(data.areas, function(value, key) {
                        //console.log(JSON.stringify(value));
                       // if (value) {
                            // id = value.Area; 
                            // subs.push(value.subArea);        
                            //$scope.tempCategories.push({id : value.Area, subs : value.subArea});
                           // var subAreas = [];
                            //angular.forEach(value.subArea, function(value, key) {
                                //subAreas.push({ name: value });
                            //});
                           // $scope.tempCategories.push({ 'id': value.Area, subs: subAreas });
                       // }
                        console.log(JSON.stringify($scope.tempCategories));
                    //});

                 console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }
    }

});