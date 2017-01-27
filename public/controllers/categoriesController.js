app.controller('categoriesController', function($scope, $http, $routeParams, $location) {
    $scope.formData = {};

    $scope.btnValue = "Save";
    //console.log($routeParams.id)
    //var clientId = $routeParams.id;
    function getData() {
        $http.get('/api/category/categories')
            .success(function(data) {
                $scope.categories = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
    getData();

    $scope.getRecById = function(id) {
        $http.delete('/api/category/categories/' + id)
            .success(function(data) {
                $scope.formData = data;
                alert(JSON.stringify(data));
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.tempCategories = [{
        id: 'cat1',
        categoryDescription: '',
        subCategoryDescription: '',
        subs: [{ id: 'choice1' }, { id: 'choice2' }, { id: 'choice3' }]
    }];
    $scope.addNewSubCategories = function(id) {

        //        alert(JSON.stringify($scope.tempCategories));
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
            $scope.tempCategories.push({ 'id': 'cat' + newCategoryNo, categoryDescription: '', subCategoryDescription: '', subs: [{ id: 'choice1' }, { id: 'choice2' }, { id: 'choice3' }] });
        }
        // $scope.showAddChoice = function(choice) {


    //   return choice.id === $scope.categories.subs[$scope.categories.subs.length-1].id;
    // };


    // when submitting the add form, send the text to the node API
    $scope.createEditRec = function() {
        $scope.formData.category = [];
        //        alert(JSON.stringify($scope.tempCategories));
        console.log(JSON.stringify($scope.subs1));

        angular.forEach($scope.tempCategories, function(value, key) {
            console.log(JSON.stringify(value));
            if (value.id.length > 0) {
                var subCats = value.subs.map(function(el) {
                    return el.name;
                });
                var subCats = subCats.filter(function(e) { return e === 0 || e });
                //                alert(JSON.stringify(subCats));
                $scope.formData.category.push({ name: value.id, categoryDescription: value.categoryDescription, subCategoryDescription: value.subCategoryDescription, subcategories: subCats })
                    //subs.push(value);
            }
        });

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
            console.log($scope.formData);
            $http.put('/api/category/categories/' + $scope.formData._id, $scope.formData)
                .success(function(data) {
                    //$scope.formData = {};
                    //$scope.cities = data;
                    $scope.btnValue = "Save";
                    //                   alert(JSON.stringify(data));
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        } else {
            $http.post('/api/category/categories', $scope.formData)
                .success(function(data) {
                    //$scope.formData = {}; // clear the form so our user is ready to enter another
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }
        //getData();
        $location.path("/categories");
    };
    $scope.clearForm = function() {
            $scope.formData = null;
        }
        // delete a city after checking it
    $scope.deleteRec = function(id) {
        $http.delete('/api/category/categories/' + id)
            .success(function(data) {
                getData();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };


    $scope.initUpdateCategory = function() {
        var clientId = $routeParams.id;
        //alert(clientId);
        if (clientId != null) {
            $scope.btnValue = 'Update';
            $http.get('/api/category/categories/' + clientId)
                .success(function(data) {
                    $scope.formData = data;
                    $scope.category = data;

                    //data.areas = Area - id, subArea - subs
                    $scope.tempCategories = [];
                    angular.forEach(data.category, function(value, key) {
                        //console.log(JSON.stringify(value));
                        if (value) {
                            // id = value.Area; 
                            // subs.push(value.subArea);        
                            //$scope.tempCategories.push({id : value.Area, subs : value.subArea});
                            var subcategories = [];
                            angular.forEach(value.subcategories, function(value, key) {
                                subcategories.push({ name: value });
                            });
                            $scope.tempCategories.push({ 'id': value.name, categoryDescription: value.categoryDescription, subCategoryDescription: value.subCategoryDescription, subs: subcategories });
                        }
                        console.log(JSON.stringify($scope.tempCategories));
                    });

                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }
    }


    console.log($routeParams.id)
    var clientId = $routeParams.id;
    if (clientId != undefined || clientId != null)
        $scope.addCategory = function() {

        }




});