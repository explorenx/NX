app.controller('dashResultsController', function($scope, $rootScope, $http, $routeParams, $location, authenticationSvc, savedMetaData, LS, $window, Upload, $linq) {
    $scope.formData = {};
    $scope.location = {};

    $scope.random = function() {
        return 0.5 - Math.random();
    };

 $scope.exportData = function () {
        var blob = new Blob([document.getElementById('exportable').innerHTML], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, "Report.xls");
    };


  window.onload = function() {
        document.getElementById("#area").onchange = function() {
            document.getElementsByName("categoryselect")[0].focus();
        }
    }

 $scope.changeStyle= function (){
    var x = document.getElementById("header");


    x.style.zIndex='1';

}
 $scope.changeStyle1= function (){
    var x = document.getElementById("header");


    x.style.zIndex='3';

}

    //read more start
 $scope.limitText = 150;
  $scope.lessText = "Show less";
  $scope.moreText = "Read more";
  //read more end
    var notSupportedBrowsers = [{ 'os': 'Any', 'browser': 'MSIE', 'version': 9 }, { 'os': 'Any', 'browser': 'Firefox', 'version': 1 }];
$window.onload = function(){
    if($location.path() == '/form')
    {

          $(document).ready(function () {
          // Hide the div
          $("#chatbox").hide();
          // Show the div after 5s
          $("#chatbox").delay(1).fadeOut(1);  
      }); 

       // document.getElementById('chatbox').style.display = "none";
    }
}

    console.log = function() {};
    var limitStep = 2;
    $scope.limit = limitStep;
   
               $scope.filterFn = function(item) {
          return item.isSponsoredClient !== "true"; 
        } 
    $scope.area11 = $routeParams.area;
    $scope.category11 = $routeParams.category;

    $scope.incrementLimit = function() {
        $scope.limit += limitStep;
    };
    $scope.decrementLimit = function() {
        $scope.limit -= limitStep;
    };
    $scope.currentPath = $location.path();
    console.log($location.path());
    //alert($location.path());
    console.log('LS.getCookieData');
    console.log(LS.getCookieData());
    if (LS.getCookieData()) {
        var udata = JSON.parse(LS.getCookieData());
        $rootScope.UserName = udata.userName;
        $rootScope.isAuthenticated = udata.isAuthenticated;
        $rootScope.ClinicName = udata.clinicName;
    }


    $scope.btnValue = "Save";


    var tags = $routeParams.tags;
    //console.log($routeParams.id)
    //var clientId = $routeParams.id;
    function getData() {
        // var area = $routeParams.Area.Area;
        // alert(area);
        if ($rootScope.Tags != null) {
            //alert(JSON.stringify($rootScope.Area.Area));
            tags = $rootScope.Tags.Tags;

            // alert(JSON.stringify(area));
            //var area = $routeParams.Area;
        }


        var city = $routeParams.city;
        var category = $routeParams.category;
        if ($rootScope.Area != null) {
            //alert(JSON.stringify($rootScope.Area.Area));
            area = $rootScope.Area.Area;
            //  alert(JSON.stringify(area));
            //var area = $routeParams.Area;
        }
        if ($rootScope.subCategory != null) {
            //alert(JSON.stringify($rootScope.Area.Area));
            subCategory = $rootScope.subCategory;
            // alert(JSON.stringify(subcategory));
            //var area = $routeParams.Area;
        }
        var area = $routeParams.area;
        var subcategory = $routeParams.subCategory;
        //  $routeParams.area = area;
        //alert( $routeParams.subCategory);

        //alert(category + '  ' + city);
        var url = '/api/dashbord/results/?';

        // if(area)
        //url = url + '&Area=' + area;
        //alert(url);
        var c = category;

        if (category && !area && city) {
            category = category.replace(/-/g, ' ');
            url = url + '&City=' + city + '&Categories=' + category
                // alert(url);
        }

        if (category && area) {
            category = category.replace(/-/g, ' ');
            area = area.replace(/-/g, ' ');
            url = url + '&Categories=' + category + '&Area=' + area;
            //alert(url);
        }

        if (category && city && area) {
            url = url + '&City=' + city;
            // alert(url);
        }
        //if (!category && city && area) {
       //     url = url + '&City=' + city + '&Area=' + area;
      //  }
//alert($routeParams.area);

        if (area != undefined) {
            var myurl = '/' + city + '/' + category.replace(/ /g, '-');
            $window.document.getElementById('categry').href = myurl;
           // $window.document.getElementById('keyword').innerHTML = $routeParams.category + ' in ' + $routeParams.area + ', ' + $routeParams.city;
            $scope.keyword = $routeParams.category + ' in ' + $routeParams.area + ', ' + $routeParams.city;
            //alert($scope.keyword)
            //  var cityurl = '/showResults';
            // document.getElementById('citylink').href=cityurl;
           //  $window.document.getElementsByClassName('listing_image')[0].alt = category + ' in ' + city;
            
            $window.document.getElementById('category').innerHTML = category;
            $window.document.getElementById('area').innerHTML = area;
            $window.document.getElementById('city').innerHTML = city;
            //  $window.document.title = category + ' in ' + area + ', ' + city + ' | NXsearch';
           // $window.document.getElementsByName('title')[0].content = category + ' in ' + area + ', ' + city + ' | NXsearch';
            //  $window.document.getElementsByName('description')[0].content = category + ' in ' + area + ', ' + city + ' | NXsearch';
            //  $window.document.getElementsByName('keywords')[0].content = category + ' in ' + area + ', ' + city + ' | NXsearch';

            $window.document.querySelector('[property="og:title"]').content = category + ' in ' + area + ', ' + city + ' | NXsearch';
            $window.document.querySelector('[property="og:description"]').content = category + ' in ' + area + ', ' + city + ' | NXsearch';
            $window.document.querySelector('[name="twitter:title"]').content = category + ' in ' + area + ', ' + city + ' | NXsearch';

            $window.document.querySelector('[name="twitter:description"]').content = category + ' in ' + area + ', ' + city + ' | NXsearch';
        }
       
$scope.area2 = $routeParams.area;
                            //alert($scope.area2);
        if (area == undefined) {
            $http.get('/api/category/categories')
            .success(function(data) {
                $scope.categories = data;
                //alert(JSON.stringify(data));
                //  alert($scope.data.mainCategoryName);
                $scope.sample = data;


                       var metaKeys = metaDesc = metaTitle = '';

                angular.forEach(data, function(value, key1) {

                    angular.forEach(value.category, function(cat, key2) {
                        //alert(JSON.stringify(cat.name.length));
                        $scope.catcount = cat.name.length;
                        
                        if (cat.name.replace(/-/g, ' ') == $routeParams.category.replace(/-/g, ' ')) {
                            $scope.maincat = cat.name;
                            $scope.city2 = $routeParams.city;
                            $scope.catname = cat.name;
                           //alert(JSON.stringify($scope.maincat));
                          
                            $scope.areaonlink = 'in ' + $routeParams.city.replace(/-/g, ' ');
                            // $scope.SubCategoriesLinks = [];
                            angular.forEach(cat.subcategories, function(value, key) {
                                $scope.SubCategoriesLinks.push(value.subCategoryName);
                                //alert(JSON.stringify(cat.name));
                                //alert($scope.SubCategoriesLinks);
                            });
                             $scope.SubCategoriesLinks = [];
                                                  
                                                  //alert(JSON.stringify(area.Area));
                                              $window.document.getElementsByName('description')[0].content = $routeParams.category.replace(/-/g, ' ') + " in "+ $routeParams.city + " , " + cat.categoryDescription + " in " + $routeParams.city.replace(/-/g, ' ') + '| Nx-search';
                                //alert(metaDesc);
                                $window.document.getElementsByName('keywords')[0].content = $routeParams.category.replace(/-/g, ' ') + " in " + $routeParams.city.replace(/-/g, ' ') + " | " + cat.categoryKeywords + '| Nx-search';
                               $window.document.getElementById('longdescription').innerHTML = cat.categoryDescriptionLong;
                                $window.document.querySelector('[property="og:description"]').content = $routeParams.category.replace(/-/g, ' ') + " in "+ $routeParams.city + " , " + cat.categoryDescription + " in " + $routeParams.city.replace(/-/g, ' ') + '| Nx-search';
                                    $window.document.querySelector('[name="twitter:description"]').content = $routeParams.category.replace(/-/g, ' ') + " in "+ $routeParams.city + " , " + cat.categoryDescription + " in " + $routeParams.city.replace(/-/g, ' ') + '| Nx-search';
                                if (typeof(cat.categoryTitle) !== 'undefined') {
                                    $window.document.title = $routeParams.category.replace(/-/g, ' ') + " in " + $routeParams.city + ', ' + cat.categoryTitle + " in " + $routeParams.city.replace(/-/g, ' ') + '| Nx-search';
                                    $window.document.getElementsByName('title')[0].content = $routeParams.category.replace(/-/g, ' ') + " in " + $routeParams.city + ', ' + cat.categoryTitle + " in " + $routeParams.city.replace(/-/g, ' ') + '| Nx-search';
                                }
                                if (typeof(cat.categoryTitle) == 'undefined') {
                                    $window.document.title = $routeParams.category.replace(/-/g, ' ') + " in " + $routeParams.city + ', NXsearch';
                                    $window.document.getElementsByName('title')[0].content = $routeParams.category.replace(/-/g, ' ') + " in " + $routeParams.city + ', NXsearch';
                                }

                                    //$window.document.getElementsByName('description')[0].content = metaDesc;
                                    //$window.document.getElementsByName('keywords')[0].content = metaKeys;
                                   // $window.document.getElementById('longdescription').innerHTML = longDesc;
                                   
                                   // $window.document.title = metaTitle;
                                   // $window.document.getElementsByName('title')[0].content = metaTitle;
                                          
                            //$scope.catname = cat.name;
                            //$window.document.getElementById('categoryname').innerHTML = catname;
                            //alert( $scope.SubCategories);
                            //alert($routeParams.area);
                            
                          

                        }
                    
                        angular.forEach(cat.subcategories, function(value, key) {
                            //alert(value.subCategoryName);
                            if (value.subCategoryName.replace(/-/g, ' ') == $routeParams.category.replace(/-/g, ' ')) {
                                //alert(JSON.stringify($routeParams.area));
                                
                                    $scope.maincat = cat.name;
                                     $scope.city2 = $routeParams.city;
                            
                           //alert(JSON.stringify($scope.maincat));
                          
                            $scope.areaonlink = 'in ' + $routeParams.city.replace(/-/g, ' ');
                             
                            angular.forEach(cat.subcategories, function(value, key) {
                                $scope.SubCategoriesLinks.push(value.subCategoryName);
                                //alert(JSON.stringify(cat.name));
                                //alert($scope.SubCategoriesLinks);
                            });
                             $scope.SubCategoriesLinks = [];
                                                  
                                                  //alert(JSON.stringify(area.Area));
                                              $window.document.getElementsByName('description')[0].content = $routeParams.category.replace(/-/g, ' ') + " in "+ $routeParams.city + " , " + value.subCategoryDescriptionShort + " in " + $routeParams.city.replace(/-/g, ' ') + '| Nx-search';
                                //alert(metaDesc);
                                $window.document.getElementsByName('keywords')[0].content = $routeParams.category.replace(/-/g, ' ') + " in " + $routeParams.city.replace(/-/g, ' ') + " | " + value.subCategoryKeywords + '| Nx-search';
                               $window.document.getElementById('longdescription').innerHTML = cat.categoryDescriptionLong;
                                $window.document.querySelector('[property="og:description"]').content = $routeParams.category.replace(/-/g, ' ') + " in "+ $routeParams.city + " , " + value.subCategoryDescriptionShort + " in " + $routeParams.city.replace(/-/g, ' ') + '| Nx-search';
                                    $window.document.querySelector('[name="twitter:description"]').content = $routeParams.category.replace(/-/g, ' ') + " in "+ $routeParams.city + " , " + value.subCategoryDescriptionShort + " in " + $routeParams.city.replace(/-/g, ' ') + '| Nx-search';
                                if (typeof(cat.categoryTitle) !== 'undefined') {
                                    $window.document.title = $routeParams.category.replace(/-/g, ' ') + " in " + $routeParams.city + ', ' + value.subCategoryTitle + " in " + $routeParams.city.replace(/-/g, ' ') + '| Nx-search';
                                    $window.document.getElementsByName('title')[0].content = $routeParams.category.replace(/-/g, ' ') + " in " + $routeParams.city + ', ' + value.subCategoryTitle + " in " + $routeParams.city.replace(/-/g, ' ') + '| Nx-search';
                                }
                                if (typeof(cat.categoryTitle) == 'undefined') {
                                    $window.document.title = $routeParams.category.replace(/-/g, ' ') + " in " + $routeParams.city + ', NXsearch';
                                    $window.document.getElementsByName('title')[0].content = $routeParams.category.replace(/-/g, ' ') + " in " + $routeParams.city + ', NXsearch';
                                }
                                    $window.document.getElementById('longdescription').innerHTML = longDesc;
                                    //$window.document.querySelector('[property="og:description"]').content = metaDesc;
                                   // $window.document.querySelector('[name="twitter:description"]').content = metaDesc;
                                   // $window.document.title = metaTitle;
                                    //$window.document.getElementsByName('title')[0].content = metaTitle;
                              
                                // $scope.catname1 = value.subCategoryName;
                                //$window.document.getElementById('longdescription1').innerHTML = longDesc1;
                            }
                            //alert(JSON.stringify(cat.name));
                        });

                    });
                });









            })
            //alert(category);
            $scope.keyword = category + ' in ' + city;
             $window.document.getElementById('category').innerHTML = category;
            //$window.document.getElementById('area').innerHTML = area;
            $window.document.getElementById('city').innerHTML = city;
             // $window.document.title = category + ' in '+ city + ' | NXsearch';
            //$window.document.getElementsByName('title')[0].content = category + ' in ' + city + ' | NXsearch';
              //$window.document.getElementsByName('description')[0].content = category + ' in ' + city + ' | NXsearch';
              //$window.document.getElementsByName('keywords')[0].content = category + ' in ' + city + ' | NXsearch';
            $window.document.querySelector('[property="og:title"]').content = category + ' in ' + city + ' | NXsearch';
            //$window.document.querySelector('[property="og:description"]').content = category + ' in ' + city + ' | NXsearch';
            $window.document.querySelector('[name="twitter:title"]').content = category + ' in ' + city + ' | NXsearch';
            //$window.document.querySelector('[name="twitter:description"]').content = category + ' in ' + city + ' | NXsearch';
        }

        if (area == 'undefined' && category == 'undefined') {
                    $window.document.title = 'Find Doctors in Pune, Dentist in Pune, Preschools in Pune, Diagnostic Labs in Pune, Spas &amp; Salons in Pune | NX-search';
                    $window.document.getElementsByName('title')[0].content = 'Find Doctors in Pune, Dentist in Pune, Preschools in Pune, Diagnostic Labs in Pune, Spas &amp; Salons in Pune | NX-search';
                    //$window.document.getElementsByName('description')[0].content = 'Find Doctors in Pune, Dentist in Pune, Preschools in Pune, Diagnostic Labs in Pune, Spas &amp; Salons in Pune | NX-search';
                    $window.document.getElementsByName('keywords')[0].content = 'Find Doctors in Pune, Dentist in Pune, Preschools in Pune, Diagnostic Labs in Pune, Spas &amp; Salons in Pune | NX-search';
                    $window.document.querySelector('[property="og:title"]').content = 'Find Doctors in Pune, Dentist in Pune, Preschools in Pune, Diagnostic Labs in Pune, Spas &amp; Salons in Pune | NX-search';
                    $window.document.querySelector('[property="og:description"]').content = 'Find Doctors in Pune, Dentist in Pune, Preschools in Pune, Diagnostic Labs in Pune, Spas &amp; Salons in Pune | NX-search';
                    $window.document.querySelector('[name="twitter:title"]').content = 'Find Doctors in Pune, Dentist in Pune, Preschools in Pune, Diagnostic Labs in Pune, Spas &amp; Salons in Pune | NX-search';
                    $window.document.querySelector('[name="twitter:description"]').content = 'Find Doctors in Pune, Dentist in Pune, Preschools in Pune, Diagnostic Labs in Pune, Spas &amp; Salons in Pune | NX-search';
        }

        if($location.path() == '/register'){
            $window.document.title = 'Register Free - NXsearch';
        }
        if($location.path() == '/aboutus'){
            $window.document.title = 'About Us - NXsearch';
        }

        if($location.path() == '/termsandconditions'){
            $window.document.title = 'Terms and Conditions - NXsearch';
        }
        if($location.path() == '/career'){
            $window.document.title = 'Career - NXsearch';
        }
        if($location.path() == '/privacypolicy'){
            $window.document.title = 'Privacy Policy';
        }
        if($location.path() == '/disclaimer'){
            $window.document.title = 'Disclaimer';
        }
        if($location.path() == '/enquiryDetails'){
            $window.document.title = 'Enquiry Details';
        }
        if($location.path() == '/clientlist'){
            $window.document.title = 'Client List';
        }
        if($location.path() == '/addClient'){
            $window.document.title = 'Add New Client';
        }
        if($location.path() == '/addClient/'+ $routeParams.id){
            $window.document.title = 'Update Client';
           
            if($routeParams.id){
               
                 $http.get('/api/dashbord/results/?_id=' + $routeParams.id)
                                    .success(function(data) {
                                        //alert(JSON.stringify(data));
                                         $scope.businessname = data;
                                         //alert($scope.businessname);
                                    }).error(function(err){
                                        alert('error');
                                    })
                 //alert($routeParams.id);
            }
        }
        if($location.path() == '/categories'){
            $window.document.title = 'Categories List';
        }
        if($location.path() == '/addCities'){
            $window.document.title = 'City List';
        }
        if($location.path() == '/export'){
            $window.document.title = 'Export Data';
        }


                // if(city == undefined){
                //     url.replace('Categories','SubCategories')
                // }

        $http.get(url)
            .success(function(data) {
                 //alert(JSON.stringify(data[0]));
                $scope.resultsofclient = data;
                $scope.results = shuffle(data, 'isPaidClient');
                $scope.totalpaid = $scope.results.length;
               // alert( $scope.totalpaid);
                if ($scope.resultsofclient.length > 0) {
                    var sponsoredClients = shuffle(data, 'isSponsoredClient'); // after getting the records here, display only two of them by position, e.g. - sponsoredClients[0] & sponsoredClients[1] as a sponsered client
                   // alert(sponsoredClients.length);
                    if (sponsoredClients.length > 0) {
                        $scope.FirstSponsoredClient = sponsoredClients[0];
                        $scope.SecondSponsoredClient = sponsoredClients[1];
                        
                    }
                }
                $scope.aaa = $scope.resultsofclient.length;
                 $scope.limit2= 10;
            
                // loadMore function
                $scope.loadMore = function() {
                $scope.limit2 = $scope.limit2+10;
                }
                //alert($scope.aaa);
                console.log(JSON.stringify(data));
                //alert(JSON.stringify(url));
                if (data.length == 0) {

                    var urlWithSubcategory;
                    if (area == undefined) {
                        urlWithSubcategory = '&SubCategories=' + category;
                    } else {
                        urlWithSubcategory = '&Area=' + area + '&SubCategories=' + category;
                    }
                    $http.get('/api/dashbord/results/?&City=' + city + urlWithSubcategory)
                        .success(function(resdata) {
                            $scope.results = shuffle(resdata, 'isPaidClient');
                           
                            $scope.totalpaid = $scope.results.length;
                            var sponsoredClients = shuffle(resdata, 'isSponsoredClient');
                            if (sponsoredClients.length > 0) {
                                $scope.FirstSponsoredClient = sponsoredClients[0];
                                $scope.SecondSponsoredClient = sponsoredClients[1];
                            }
                            $scope.allClients = resdata;
                            $scope.aaa = $scope.allClients.length;
                            //alert($scope.aaa);
                             $scope.limit2= 10;

                                // loadMore function
                                $scope.loadMore = function() {
                                $scope.limit2 = $scope.limit2+10;
                            }
                            
                            console.log(data);
                            if (resdata.length == 0) {
                                //alert('inside by clinc ');
                                $http.get('/api/dashbord/results/?&City=' + city)
                                    .success(function(resClinicsdata) {
                                        $scope.resultsclient = resClinicsdata;
                                        $scope.aaa = $scope.resultsclient.length;

                                        //alert($scope.aaa);
                                         $scope.limit2= 10;

                                            // loadMore function
                                            $scope.loadMore = function() {
                                            $scope.limit2 = $scope.limit2+10;
                                        }
                                     
                                        console.log(resClinicsdata);
                                        //if(resClinicsdata.length == 0){
                                        var tempresClinicsdata = resClinicsdata;
                                        resClinicsdata = [];
                                        resClinicsdata = shuffle(resClinicsdata, 'isPaidClient');
                                        $scope.totalpaid = $scope.resClinicsdata.length;
                                        //alert($scope.totalpaid);
                                        var sponsoredClients = shuffle(resClinicsdata, 'isSponsoredClient');
                                        if (sponsoredClients.length > 0) {
                                            $scope.FirstSponsoredClient = sponsoredClients[0];
                                            $scope.SecondSponsoredClient = sponsoredClients[1];
                                        }

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

    function shuffle(array, condition) {
        var arr = new Array();
        var arrNotProcessed = new Array();
        for (i = 0; i < array.length; i++) {
            if (array[i][condition] == true) {
                arr.push(array[i]);
                console.log(array[i]);
                console.log(arr.length);
            } else {
                arrNotProcessed.push(array[i]);
            }
        }
        var currentIndex = arr.length,
            temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = arr[currentIndex];
            arr[currentIndex] = arr[randomIndex];
            arr[randomIndex] = temporaryValue;
        }
        for (i = 0; i < arrNotProcessed.length; i++) {
            arr.push(arrNotProcessed[i]);
        }
        if (condition == 'isSponsoredClient') {
            var tempSponsoredClients = new Array();
            if (arr[0].isSponsoredClient == true)
                tempSponsoredClients.push(arr[0]);
            if (arr[1].isSponsoredClient == true)
                tempSponsoredClients.push(arr[1]);
            return tempSponsoredClients;
        } else {
            return arr;
        }
    }

    $scope.SubCatetories = {
        subs: []
    };
    $scope.subCategories = [];

    function getCategoriesData() {
        $http.get('/api/category/categories')
            .success(function(data) {
                $scope.categories = data;
                //  alert(JSON.stringify(data));
                //  alert($scope.data.mainCategoryName);
                $scope.sample = data;

                // alert(JSON.stringify($scope.subCategories1));
               // alert($routeParams.category);
                var metaKeys = metaDesc = metaTitle = '';

                angular.forEach(data, function(value, key1) {

                    angular.forEach(value.category, function(cat, key2) {
                        //alert(JSON.stringify(cat.name.length));
                        $scope.catcount = cat.name.length;
                        
                        if (cat.name.replace(/-/g, ' ') == $routeParams.category.replace(/-/g, ' ')) {
                            $scope.maincat = cat.name;
                           //alert(JSON.stringify($scope.maincat));
                            if ($routeParams.area != 'undefined') {
                                $http.get('/api/locations/area')
                                        .success(function(data) {

                                          $scope.areas = data;
                                          //alert(JSON.stringify(data));
                                          angular.forEach(data, function(value, key1) {

                                              angular.forEach(value.areas, function(area, key2) {
                                                  if(area.Area.replace(/-/, ' ') == $routeParams.area.replace(/-/g, ' ')) {
                                                  //alert(JSON.stringify(area.Area));
                                              metaDesc = $routeParams.category.replace(/-/g, ' ') + " in " + $routeParams.area.replace(/-/g, ' ') + ", " + $routeParams.city + " , " + cat.categoryDescription + " in " + $routeParams.area.replace(/-/g, ' ') + '| Nx-search';
                                //alert(metaDesc);
                                metaKeys = $routeParams.category.replace(/-/g, ' ') + " in " + $routeParams.area.replace(/-/g, ' ') + " | " + cat.categoryKeywords + '| Nx-search';
                               longDesc = cat.categoryDescriptionLong;
                                if (typeof(cat.categoryTitle) !== 'undefined') {
                                    metaTitle = $routeParams.category.replace(/-/g, ' ') + " in " + $routeParams.area.replace(/-/g, ' ') + ", " + $routeParams.city + ', ' + cat.categoryTitle + " in " + $routeParams.area.replace(/-/g, ' ') + '| Nx-search';
                                }
                                if (typeof(cat.categoryTitle) == 'undefined') {
                                    metaTitle = $routeParams.category.replace(/-/g, ' ') + " in " + $routeParams.area.replace(/-/g, ' ') + ", " + $routeParams.city + ', NXsearch';
                                }

                                    $window.document.getElementsByName('description')[0].content = metaDesc;
                                    $window.document.getElementsByName('keywords')[0].content = metaKeys;
                                    $window.document.getElementById('longdescription').innerHTML = longDesc;
                                    $window.document.querySelector('[property="og:description"]').content = metaDesc;
                                    $window.document.querySelector('[name="twitter:description"]').content = metaDesc;
                                    $window.document.title = metaTitle;
                                    $window.document.getElementsByName('title')[0].content = metaTitle;
                                           $scope.SubAreaLinks = [];       
                                     angular.forEach(area.subArea, function(value, key) {
                                        $scope.SubAreaLinks.push(value);
                               
                                  
                                           //alert(JSON.stringify($scope.SubAreaLinks));   //alert(JSON.stringify($scope.areas));
                                     if($scope.SubAreaLinks.length != 0){   
                                       
                                metaDesc = $routeParams.category.replace(/-/g, ' ') + " in " + $routeParams.area.replace(/-/g, ' ') + ", " + $scope.SubAreaLinks + ", " + $routeParams.city + " , " + cat.categoryDescription + " in " + $routeParams.area.replace(/-/g, ' ') + '| Nx-search';
                                //alert(metaDesc);
                                metaKeys = $routeParams.category.replace(/-/g, ' ') + " in " + $routeParams.area.replace(/-/g, ' ') + " | " + cat.categoryKeywords + '| Nx-search';
                               longDesc = cat.categoryDescriptionLong;
                                if (typeof(cat.categoryTitle) !== 'undefined') {
                                    metaTitle = $routeParams.category.replace(/-/g, ' ') + " in " + $routeParams.area.replace(/-/g, ' ') + ", " + $routeParams.city + ', ' + cat.categoryTitle + " in " + $routeParams.area.replace(/-/g, ' ') + '| Nx-search';
                                }
                                if (typeof(cat.categoryTitle) == 'undefined') {
                                    metaTitle = $routeParams.category.replace(/-/g, ' ') + " in " + $routeParams.area.replace(/-/g, ' ') + ", " + $routeParams.city + ', NXsearch';
                                }

                                    $window.document.getElementsByName('description')[0].content = metaDesc;
                                    $window.document.getElementsByName('keywords')[0].content = metaKeys;
                                    $window.document.getElementById('longdescription').innerHTML = longDesc;
                                    $window.document.querySelector('[property="og:description"]').content = metaDesc;
                                    $window.document.querySelector('[name="twitter:description"]').content = metaDesc;
                                    $window.document.title = metaTitle;
                                    $window.document.getElementsByName('title')[0].content = metaTitle;

                                     }

                                });
                                 }
                            }) 
                            }) 
                             })
                             }
                            if ($routeParams.area == 'undefined') {
                                // alert(123);
                                metaDesc = $routeParams.category.replace(/-/g, ' ') + " in " + $routeParams.city + " | " + cat.categoryDescription + '| Nx-search';
                                metaKeys = $routeParams.category.replace(/-/g, ' ') + " in " + $routeParams.city + " | " + cat.categoryKeywords + '| Nx-search';
                               longDesc = cat.categoryDescriptionLong;

                                if (typeof(cat.categoryTitle) !== 'undefined') {
                                    metaTitle = $routeParams.category.replace(/-/g, ' ') + $routeParams.city + ', ' + cat.categoryTitle;
                               }
                            }
                            //$scope.catname = cat.name;
                            //$window.document.getElementById('categoryname').innerHTML = catname;
                            //alert( $scope.SubCategories);
                            //alert($routeParams.area);
                            $scope.SubCategoriesLinks = [];
                            $scope.areaonlink = 'in ' + $routeParams.area.replace(/-/g, ' ');
                            // alert($scope.areaonlink);
                            angular.forEach(cat.subcategories, function(value, key) {
                                $scope.SubCategoriesLinks.push(value.subCategoryName);
                                //alert(JSON.stringify(cat.name));
                            });
                          

                        }
                    
                        angular.forEach(cat.subcategories, function(value, key) {
                            //alert(value.subCategoryName);
                            if (value.subCategoryName.replace(/-/g, ' ') == $routeParams.category.replace(/-/g, ' ')) {
                                //alert(JSON.stringify($routeParams.area));
                                if ($routeParams.area != undefined) {
                                    $scope.maincat = cat.name;

                                    $http.get('/api/locations/area')
                                        .success(function(data) {

                                          $scope.areas = data;
                                          //alert(JSON.stringify(data));
                                          angular.forEach(data, function(value, key1) {

                                              angular.forEach(value.areas, function(area, key2) {
                                                  if(area.Area.replace(/-/, ' ') == $routeParams.area.replace(/-/g, ' ')) {
                                                  //alert(JSON.stringify(area.Area));
                                              metaDesc = $routeParams.category.replace(/-/g, ' ') + " in " + $routeParams.area.replace(/-/g, ' ') + ", " + $routeParams.city + " , " + cat.categoryDescription + " in " + $routeParams.area.replace(/-/g, ' ') + '| Nx-search';
                                //alert(metaDesc);
                                metaKeys = $routeParams.category.replace(/-/g, ' ') + " in " + $routeParams.area.replace(/-/g, ' ') + " | " + cat.categoryKeywords + '| Nx-search';
                               longDesc = cat.categoryDescriptionLong;
                                if (typeof(cat.categoryTitle) !== 'undefined') {
                                    metaTitle = $routeParams.category.replace(/-/g, ' ') + " in " + $routeParams.area.replace(/-/g, ' ') + ", " + $routeParams.city + ', ' + cat.categoryTitle + " in " + $routeParams.area.replace(/-/g, ' ') + '| Nx-search';
                                }
                                if (typeof(cat.categoryTitle) == 'undefined') {
                                    metaTitle = $routeParams.category.replace(/-/g, ' ') + " in " + $routeParams.area.replace(/-/g, ' ') + ", " + $routeParams.city + ', NXsearch';
                                }

                                    $window.document.getElementsByName('description')[0].content = metaDesc;
                                    $window.document.getElementsByName('keywords')[0].content = metaKeys;
                                    $window.document.getElementById('longdescription').innerHTML = longDesc;
                                    $window.document.querySelector('[property="og:description"]').content = metaDesc;
                                    $window.document.querySelector('[name="twitter:description"]').content = metaDesc;
                                    $window.document.title = metaTitle;
                                    $window.document.getElementsByName('title')[0].content = metaTitle;
                                           $scope.SubAreaLinks = [];       
                                     angular.forEach(area.subArea, function(value, key) {
                                        $scope.SubAreaLinks.push(value);

                                   // alert(JSON.stringify($scope.maincat));
                                if($scope.SubAreaLinks.length != 0){   
                                       
                                metaDesc = $routeParams.category.replace(/-/g, ' ') + " in " + $routeParams.area.replace(/-/g, ' ') + ", " + $scope.SubAreaLinks + ", " + $routeParams.city + " , " + cat.categoryDescription + " in " + $routeParams.area.replace(/-/g, ' ') + '| Nx-search';
                                //alert(metaDesc);
                                metaKeys = $routeParams.category.replace(/-/g, ' ') + " in " + $routeParams.area.replace(/-/g, ' ') + " | " + cat.categoryKeywords + '| Nx-search';
                               longDesc = cat.categoryDescriptionLong;
                                if (typeof(cat.categoryTitle) !== 'undefined') {
                                    metaTitle = $routeParams.category.replace(/-/g, ' ') + " in " + $routeParams.area.replace(/-/g, ' ') + ", " + $routeParams.city + ', ' + cat.categoryTitle + " in " + $routeParams.area.replace(/-/g, ' ') + '| Nx-search';
                                }
                                if (typeof(cat.categoryTitle) == 'undefined') {
                                    metaTitle = $routeParams.category.replace(/-/g, ' ') + " in " + $routeParams.area.replace(/-/g, ' ') + ", " + $routeParams.city + ', NXsearch';
                                }

                                    $window.document.getElementsByName('description')[0].content = metaDesc;
                                    $window.document.getElementsByName('keywords')[0].content = metaKeys;
                                    $window.document.getElementById('longdescription').innerHTML = longDesc;
                                    $window.document.querySelector('[property="og:description"]').content = metaDesc;
                                    $window.document.querySelector('[name="twitter:description"]').content = metaDesc;
                                    $window.document.title = metaTitle;
                                    $window.document.getElementsByName('title')[0].content = metaTitle;

                                     }
                                      });
                                 }
                            }) 
                            }) 
                             })

                                } else {
                                    metaDesc = $routeParams.category.replace(/-/g, ' ') + " in " + $routeParams.city + "," + value.subCategoryDescriptionShort + '| Nxsearch';
                                    metaKeys = $routeParams.category.replace(/-/g, ' ') + " in " + $routeParams.city + " | " + value.subCategoryKeywords + '| Nxsearch';
                                    longDesc = value.subCategoryDescriptionLong;
                                    if (typeof(value.subCategoryTitle) !== 'undefined') {
                                        metaTitle = $routeParams.category.replace(/-/g, ' ') + " in " + $routeParams.city + "," + value.subCategoryTitle;
                                    }
                                }
                                $scope.SubCategoriesLinks = [];
                                $scope.areaonlink = 'in ' + $routeParams.area.replace(/-/g, ' ');
                                angular.forEach(cat.subcategories, function(value, key) {
                                    $scope.SubCategoriesLinks.push(value.subCategoryName);
                                    //alert(JSON.stringify($scope.sublinks));
                                });
                                // $scope.catname1 = value.subCategoryName;
                                //$window.document.getElementById('longdescription1').innerHTML = longDesc1;
                            }
                            //alert(JSON.stringify(cat.name));
                        });

                    });
                });
                 
               $scope.catname = $routeParams.category;
                $scope.city2 = $routeParams.city;
                $scope.area2 = $routeParams.area;
                // $scope.categoryname = catname;
                // alert( $scope.SubCategoriesLinks);
                     //alert( metaDesc);

                $window.document.getElementsByName('description')[0].content = metaDesc;
                $window.document.getElementsByName('keywords')[0].content = metaKeys;
               $window.document.getElementById('longdescription').innerHTML = longDesc;
                $window.document.querySelector('[property="og:description"]').content = metaDesc;
                $window.document.querySelector('[name="twitter:description"]').content = metaDesc;
                $window.document.title = metaTitle;
                $window.document.getElementsByName('title')[0].content = metaTitle;
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
    $scope.formData.isPaidClient = false;
    $scope.formData.isSponsoredClient = false;

    $scope.getCatsselectval = function() {
        //$scope.subCategories = $scope.selitemCats.subcategories;

        $scope.subCategories = [];

        angular.forEach($scope.selitemCats.subcategories, function(rec, key) {
            $scope.subCategories.push(rec.subCategoryName);
            //alert(JSON.stringify(value));
        });
        //$scope.checkAll = true;

        $scope.selectedvalues = 'subs: ' + $scope.selitemCats.subcategories;
        console.log($scope.selitemCats.name);
    }
    $scope.checkAll = function() {
        $scope.SubCatetories.subs = angular.copy($scope.subCategories);
    };
    //$scope.getCatsselectval = function() {
    // $scope.subCategories = $scope.selitemCats.subcategories;

    //  $scope.selectedvalues = 'subs: ' + $scope.selitemCats.subcategories;
    //  console.log($scope.selitemCats.name);
    // }


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

// This Code is For Profile Page

    //alert($routeParams._id);
    if ($routeParams.id) {
        //$scope.getRecById = function(id) {

        $http.get('/api/dashbord/results/' + $routeParams.id)
            .success(function(data) {
                $scope.formData = data;
                 //alert(JSON.stringify($scope.formData));

                var metaInfo = {
                    title: data.ClinicName,
                    description: data.ClinicName,
                    keywords: data.ClinicName
                };
                 //alert(JSON.stringify(data.Socical));
                savedMetaData.setData(metaInfo);
                $scope.services = data.SubCategories ;
                $scope.areaofcats = ' in ' + data.Area.replace(/-/g, ' ');
                //alert($scope.services);
                $scope.slength = $scope.services.length;
                //alert($scope.slength);
                // alert(JSON.stringify(data));
                for (var i = 0; i < $scope.slength; i++) {
                    $scope.serviceurl = '/' + data.City + '/' + data.Area + '/' + $scope.services[i];
                }
                // alert( $scope.serviceurl);

                $window.document.getElementById('demo1').innerHTML = data.ClinicName;
                $window.document.getElementById('city1').innerHTML = data.City;
                $window.document.getElementById('area1').innerHTML = data.Area;
                $window.document.getElementById('bbb').innerHTML = data.Categories;
               
                if(data.Socical !== 'undefined'){
                $window.document.title = data.ClinicName + ' in ' + data.Area + '-' + data.City +  ' ' + data.Socical.facebook + '| NXsearch';
                }
                $window.document.getElementsByName('title')[0].content = data.Socical.facebook + '| NXsearch';
               $window.document.getElementsByName('description')[0].content = data.Socical.twitter + ' | NXsearch';
                $window.document.getElementsByName('keywords')[0].content = data.Socical.google + ' ' + 'NXsearch';

                document.querySelector('[property="og:title"]').content = data.ClinicName + ' in ' + data.Area + ', ' + data.City + ' ' + '| NXsearch';
                document.querySelector('[property="og:description"]').content = data.Socical.twitter + ' | NXsearch';
                document.querySelector('[name="twitter:title"]').content = data.ClinicName + ' in ' + data.Area + ', ' + data.City + ' ' + '| NXsearch';
                document.querySelector('[name="twitter:description"]').content = data.Socical.google + ' | NXsearch';
                document.querySelector('[name="twitter:image"]').content = 'www.nxsearch.com/' + data.imageUrl;

            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        //};
    }
//End Of Profile Page Code
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
// Profile Image upload Code

        if (vm.file) {
            alert(vm.file.name);
            var fileName = $scope.formData.ClinicName + '-' + $scope.formData.Area + '-' + $scope.formData.City + '-' + $routeParams.id + '-nxsearch.jpg';
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
//Profile image code End

//Banner image code
 if (vm.file1) {
            alert(vm.file1.name);
            var fileName = $scope.formData.ClinicName + '-' + $scope.formData.Area + '-' + $scope.formData.City + '-' + $routeParams.id + 'banner-nxsearch.jpg';
            $scope.formData.Socical.Youtube = 'uploads/clientProfilePictures/' + fileName;
            vm.file1.name = fileName;
            //       alert('new file name -' + vm.file.name);//
            //        alert(JSON.stringify($scope.formData));//

            vm.file1 = Upload.rename(vm.file1, fileName);
            Upload.upload({
                url: 'http://nxsearch.com/uploadProfileImage', //webAPI exposed to upload the file
                data: { file: vm.file1 } //pass file as data, should be user ng-model
            }).then(function(resp) { //upload function returns a promise
                if (resp.data.error_code === 0) { //validate success
                    $window.alert('Success ' + resp.config.data.file1.name + 'uploaded. Response: ');
                } else {
                    $window.alert('an error occured');
                }
            }, function(resp) { //catch error
                console.log('Error status: ' + resp.status);
                $window.alert('Error status: ' + resp.status);
            }, function(evt) {
                console.log(evt);
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file1.name);
                vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
            });
        }

//Banner image code End


        if ($scope.formData._id) {
           
            //alert(JSON.stringify($scope.formData));
            $http.put('/api/dashbord/results/' + $scope.formData._id, $scope.formData)
                .success(function(data) {
                    //$scope.formData = {}; // clear the form so our user is ready to enter another
                    $scope.formData._id.ClinicName=clinicname;
                    

                    $scope.successMsg="Client Added Succesfully";
                    console.log(data);
                    var geocoder = new google.maps.Geocoder();
                            var source = $scope.formData.address1 + ' ' + $scope.formData.address2;

                            geocoder.geocode({ 'address': source }, function(results, status) {
                                if (status == google.maps.GeocoderStatus.OK) {
                                    $scope.formData.lat = results[0].geometry.location.lat();
                                    $scope.formData.long = results[0].geometry.location.lng();

                                    var recordToInsert = {
                                        ClinicId: data._id,
                                        lat: $scope.formData.lat,
                                        long: $scope.formData.long
                                    };
                                    $http.post('/api/contact/cliniccontact', recordToInsert)
                                        .success(function(data) {
                                            //$scope.formData = {}; // clear the form so our user is ready to enter another
                                            alert(JSON.stringify(data));
                                        })
                                        .error(function(data) {
                                            console.log('Error: ' + data);
                                        });

                                    console.log("Latitude: " + value.lat + "\nLongitude: " + value.long);
                                } else {
                                    alert("Request failed.")
                                }
                            });
                   $location.path("/clientlist");
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        } else {

            $http.post('/api/account/signup', registerUser)
                .success(function(data) {
                    //$scope.formData = {}; // clear the form so our user is ready to enter another
                     $scope.successMsg="Client Added Succesfully";
                    console.log(data);

                    $scope.formData.userId = data.userId;
                    $http.post('/api/dashbord/results', $scope.formData)
                        .success(function(data) {
                            //$scope.formData = {}; // clear the form so our user is ready to enter another
                            console.log(data);

                            var geocoder = new google.maps.Geocoder();
                            var source = $scope.formData.address1 + ' ' + $scope.formData.address2;

                            geocoder.geocode({ 'address': source }, function(results, status) {
                                if (status == google.maps.GeocoderStatus.OK) {
                                    $scope.formData.lat = results[0].geometry.location.lat();
                                    $scope.formData.long = results[0].geometry.location.lng();

                                    var recordToInsert = {
                                        ClinicId: data._id,
                                        lat: $scope.formData.lat,
                                        long: $scope.formData.long
                                    };
                                    $http.post('/api/contact/cliniccontact', recordToInsert)
                                        .success(function(data) {
                                            //$scope.formData = {}; // clear the form so our user is ready to enter another
                                            alert(JSON.stringify(data));
                                        })
                                        .error(function(data) {
                                            console.log('Error: ' + data);
                                        });

                                    console.log("Latitude: " + value.lat + "\nLongitude: " + value.long);
                                } else {
                                    alert("Request failed.")
                                }
                            });
                             $location.path("/clientlist");
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
                        document.getElementById("serviceTab").className=" active";

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
                $location.path("/aditionalProfile/" + $routeParams.id);

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
    $scope.myInterval = 3000;

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
                    var ImageName = $scope.formData.ClinicName + '-' + $scope.formData.Area + '-' + 'nxsearch' + '-' + $routeParams.id + datetimestamp + '.jpg';
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
                $location.path("/homepage/" + $routeParams.id);

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
                $location.path("/aditionalProfile/" + $routeParams.id);

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

                var geocoder = new google.maps.Geocoder();
                var source = value.address1 + ' ' + value.address2;

                geocoder.geocode({ 'address': source }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        value.lat = results[0].geometry.location.lat();
                        value.long = results[0].geometry.location.lng();

                        $http.post('/api/contact/cliniccontact', value)
                            .success(function(data) {
                                //$scope.formData = {}; // clear the form so our user is ready to enter another
                                alert(JSON.stringify(data));
                            })
                            .error(function(data) {
                                console.log('Error: ' + data);
                            });

                             $http.put('/api/contact/cliniccontact'+ $scope.formData._id, value)
                            .success(function(data) {
                                //$scope.formData = {}; // clear the form so our user is ready to enter another
                                alert(JSON.stringify(data));
                            })
                            .error(function(data) {
                                console.log('Error: ' + data);
                            });

                        console.log("Latitude: " + value.lat + "\nLongitude: " + value.long);
                    } else {
                        alert("Request failed.")
                    }
                });


                //alert(JSON.stringify(value));

                $location.path("/homepage/" + $routeParams.id);

            });
        }
    };


    $scope.tabs = [{
            title: 'Home',
            url: 'one.tpl.html',
            activtab: 'Home'
        }, {
            title: 'Services',
            url: 'two.tpl.html',
            activtab: 'Services'
        },
        {
            title: 'Gallary',
            url: 'four.tpl.html',
            activtab: 'Gallary'
        },
        {
            title: 'Location',
            url: 'five.tpl.html',
            activtab: 'Location'
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
        var myEl = angular.element(document.querySelector('#div1'));
        myEl.addClass('active');
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
    $scope.sendmsg = function(){
        //Authentication Key  

    //    $http({
    //        method: 'POST',
    //      url: 'https://control.msg91.com/api/sendhttp.php?authkey=138679A23pr5hn5889ca25&mobiles=9527154472&message=test & new&mobile&sender=NXSEAR&route=4',
    //data: {
    //  countryCode: "91",
    //  mobileNumber: item.usermobile,
    //  oneTimePassword: item.OTP
    // }
    //}).         success(function(status) {
    //your code when success
    //      console.log(status);
    //    if (status != indefined && status.status == 'success') {
    //show popup message that OTP has sent to your mobile number
    //  }
    // });
    }
     $http.get('/api/enquiry/addenquiry')
            .success(function(data) {
                $scope.enquiries = data;
                $scope.total = data.length;
               // alert($scope.total);
                console.log(data);
            }) .error(function(data) {
                console.log('Error: ' + data);
            });
           
            
    $scope.loading = false;
    $scope.sendOTP = function(item) {

        if (item.usermobile != undefined && item.usermobile.length == 10) {
            $http.defaults.headers.post['Content-Type'] = 'application/json';
            $http.defaults.headers.post['application-Key'] = 'gJzjVN9NAWY4Tryprooyu3SMTilT8HpfrND8URQ0NDwOO9aDlUlSeR4i7W5o1zjZo0GMhA6np5JNaka4jVYip0aPf6Ke76a5bCuiCIDYOy4LVin-Ju1BCi_mmI7-cPvqn2rv0Mg_qas0UP5M0bNe7w==';
            $http({
                method: 'POST',
                url: 'https://sendotp.msg91.com/api/generateOTP',
                data: {
                    countryCode: "91",
                    mobileNumber: item.usermobile
                }
            }).
            success(function(status) {
                $scope.otpmsg = "OTP Sent successfully, Check Mobile Inbox.";
                $window.document.getElementById('send_otp').value = "Resend OTP";
                //your code when success
                console.log(status);
                if (status != indefined && status.status == 'success') {
                    //show popup message that OTP has sent to your mobile number
                }
            });
        }
    }

    $scope.send = function(item) {
        $scope.loading = true;

        //validate OTP post Request
        $http.defaults.headers.post['Content-Type'] = 'application/json';
        $http.defaults.headers.post['application-Key'] = 'gJzjVN9NAWY4Tryprooyu3SMTilT8HpfrND8URQ0NDwOO9aDlUlSeR4i7W5o1zjZo0GMhA6np5JNaka4jVYip0aPf6Ke76a5bCuiCIDYOy4LVin-Ju1BCi_mmI7-cPvqn2rv0Mg_qas0UP5M0bNe7w==';
        $http({
            method: 'POST',
            url: 'https://sendotp.msg91.com/api/verifyOTP',
            data: {
                countryCode: "91",
                mobileNumber: item.usermobile,
                oneTimePassword: item.OTP
            }
        }).
        success(function(status) {
            //your code when success
             console.log(status); 
            $scope.item = {
                username : item.username,
                ClinicName : item.ClinicName,
                Area : item.Area,
                usermobile : item.usermobile,
                useremail : item.useremail,
                clinicId : item._id,
                category : $routeParams.category.replace(/-/g, ' '),
                clientMobile : item.extensionNo
            }
                    
                  $http.post('/api/enquiry/addenquiry', $scope.item)
                    .success(function(data) {
                        //$scope.formData = {}; // clear the form so our user is ready to enter another
                        console.log(data);
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });

                     $http.post('/sendMsg', $scope.item)
                    .success(function(data) {
                        //$scope.formData = {}; // clear the form so our user is ready to enter another
                        console.log(data);
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
        

                    // SMS to User
                     $http.post('/sendMsgtoUser', $scope.item)
                    .success(function(data) {
                        //$scope.formData = {}; // clear the form so our user is ready to enter another
                        console.log(data);
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });

            if (status != undefined && status.status == 'success') {
                $scope.loading = false;
                $scope.serverMessage = 'Email sent successfully';

                $http.post('/sendmail', {
                    from: 'NXsearch <enquiry@nxsearch.com>',
                    to: 'agogweb1@gmail.com,bizzbazar1@gmail.com,enquiry.nxsearch@gmail.com',
                    subject: 'NXsearch Enquiry for ' + item.ClinicName,
                    //text: item.username + ","+ item.usermobile + ","+item.useremail + ","+item.date + ","+item.time + ","+item.ClinicName,
                    html: "Enquiry for :" + "<b>" + item.ClinicName + "</b> " + "<br>" + "Area :" + "<b>" + item.Area + " </b>" + "<br>" + "Name : " + "<b>" + item.username + " </b>" + "<br>" + "Mobile No :" + "<b>" + item.usermobile + "</b>" + "<br>" // html body
                        +
                        "Email Id :" + "<b>" + item.useremail + "</b>"
                })
                .then(function successCallback(response) {
                     $scope.serverMessage = 'Enquiry sent successfully... You will get contacted soon...!';
    // this callback will be called asynchronously
    // when the response is available
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
            }



        }).
        error(function(status) {
            //your code when fails
        });

    }

    $scope.sendOTP1 = function(client) {

        if (client.usermobile != undefined && client.usermobile.length == 10) {
            $http.defaults.headers.post['Content-Type'] = 'application/json';
            $http.defaults.headers.post['application-Key'] = 'gJzjVN9NAWY4Tryprooyu3SMTilT8HpfrND8URQ0NDwOO9aDlUlSeR4i7W5o1zjZo0GMhA6np5JNaka4jVYip0aPf6Ke76a5bCuiCIDYOy4LVin-Ju1BCi_mmI7-cPvqn2rv0Mg_qas0UP5M0bNe7w==';
            $http({
                method: 'POST',
                url: 'https://sendotp.msg91.com/api/generateOTP',
                data: {
                    countryCode: "91",
                    mobileNumber: client.usermobile
                }
            }).
            success(function(status) {
                $scope.otpmsg = "OTP Sent successfully, Check Mobile Inbox.";
                //your code when success
                console.log(status);
                if (status != indefined && status.status == 'success') {
                    //show popup message that OTP has sent to your mobile number
                }
            });
        }
    }


    $scope.send1 = function(client) {
        $scope.loading = true;

        //validate OTP post Request
        $http.defaults.headers.post['Content-Type'] = 'application/json';
        $http.defaults.headers.post['application-Key'] = 'gJzjVN9NAWY4Tryprooyu3SMTilT8HpfrND8URQ0NDwOO9aDlUlSeR4i7W5o1zjZo0GMhA6np5JNaka4jVYip0aPf6Ke76a5bCuiCIDYOy4LVin-Ju1BCi_mmI7-cPvqn2rv0Mg_qas0UP5M0bNe7w==';
        $http({
            method: 'POST',
            url: 'https://sendotp.msg91.com/api/verifyOTP',
            data: {
                countryCode: "91",
                mobileNumber: client.usermobile,
                oneTimePassword: client.OTP
            }
        }).
        success(function(status) {
            //your code when success
            console.log(status);
             $scope.item = {
                username : client.username,
                ClinicName : client.ClinicName,
                Area : client.Area,
                usermobile : client.usermobile,
                useremail : client.useremail,
                clinicId : client._id,
                category : $routeParams.category.replace(/-/g, ' '),
                clientMobile : client.extensionNo
            }
                    
                  $http.post('/api/enquiry/addenquiry', $scope.item)
                    .success(function(data) {
                        //$scope.formData = {}; // clear the form so our user is ready to enter another
                        console.log(data);
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
                     $http.post('/sendMsg', $scope.item)
                    .success(function(data) {
                        //$scope.formData = {}; // clear the form so our user is ready to enter another
                        console.log(data);
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });

                    //SMS to User
                      $http.post('/sendMsgtoUser', $scope.item)
                    .success(function(data) {
                        //$scope.formData = {}; // clear the form so our user is ready to enter another
                        console.log(data);
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });

            if (status != undefined && status.status == 'success') {
                $scope.loading = false;
                $scope.serverMessage = 'Email sent successfully';

                $http.post('/sendmail12', {
                    from: 'NXsearch <enquiry@nxsearch.com>',
                    to: 'agogweb1@gmail.com,bizzbazar1@gmail.com,enquiry.nxsearch@gmail.com',
                    subject: 'NXsearch Enquiry for ' + client.ClinicName,
                    //text: item.username + ","+ item.usermobile + ","+item.useremail + ","+item.date + ","+item.time + ","+item.ClinicName,
                    html: "Enquiry for :" + "<b>" + client.ClinicName + "</b> " + "<br>" + "Area :" + "<b>" + client.Area + " </b>" + "<br>" + "Name : " + "<b>" + client.username + " </b>" + "<br>" + "Mobile No :" + "<b>" + client.usermobile + "</b>" + "<br>" // html body
                        +
                        "Email Id :" + "<b>" + client.useremail + "</b>"
                }) .then(function successCallback(response) {
                     $scope.serverMessage = 'Enquiry sent successfully... You will get contacted soon...!';
    // this callback will be called asynchronously
    // when the response is available
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
            }
        }).
        error(function(status) {
            //your code when fails
        });

    }

    $scope.sendOTPsponsor = function(FirstSponsoredClient) {

        if (FirstSponsoredClient.usermobile != undefined && FirstSponsoredClient.usermobile.length == 10) {
            $http.defaults.headers.post['Content-Type'] = 'application/json';
            $http.defaults.headers.post['application-Key'] = 'gJzjVN9NAWY4Tryprooyu3SMTilT8HpfrND8URQ0NDwOO9aDlUlSeR4i7W5o1zjZo0GMhA6np5JNaka4jVYip0aPf6Ke76a5bCuiCIDYOy4LVin-Ju1BCi_mmI7-cPvqn2rv0Mg_qas0UP5M0bNe7w==';
            $http({
                method: 'POST',
                url: 'https://sendotp.msg91.com/api/generateOTP',
                data: {
                    countryCode: "91",
                    mobileNumber: FirstSponsoredClient.usermobile
                }
            }).
            success(function(status) {
                //your code when success
                console.log(status);
                if (status != undefined && status.status == 'success') {
                    //show popup message that OTP has sent to your mobile number
                    
                }
            });
        }
    }


    $scope.sendsponsor = function(FirstSponsoredClient) {
        $scope.loading = true;

        //validate OTP post Request
        $http.defaults.headers.post['Content-Type'] = 'application/json';
        $http.defaults.headers.post['application-Key'] = 'gJzjVN9NAWY4Tryprooyu3SMTilT8HpfrND8URQ0NDwOO9aDlUlSeR4i7W5o1zjZo0GMhA6np5JNaka4jVYip0aPf6Ke76a5bCuiCIDYOy4LVin-Ju1BCi_mmI7-cPvqn2rv0Mg_qas0UP5M0bNe7w==';
        $http({
            method: 'POST',
            url: 'https://sendotp.msg91.com/api/verifyOTP',
            data: {
                countryCode: "91",
                mobileNumber: FirstSponsoredClient.usermobile,
                oneTimePassword: FirstSponsoredClient.OTP
            }
        }).
        success(function(status) {
            //your code when success
            console.log(status);
             $scope.item = {
                username : FirstSponsoredClient.username,
                ClinicName : FirstSponsoredClient.ClinicName,
                Area : FirstSponsoredClient.Area,
                usermobile : FirstSponsoredClient.usermobile,
                useremail : FirstSponsoredClient.useremail,
                clinicId : FirstSponsoredClient._id,
                category : $routeParams.category.replace(/-/g, ' '),
                clientMobile : FirstSponsoredClient.extensionNo
            }
                    
                  $http.post('/api/enquiry/addenquiry', $scope.item)
                    .success(function(data) {
                        //$scope.formData = {}; // clear the form so our user is ready to enter another
                        console.log(data);
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
                     $http.post('/sendMsg', $scope.item)
                    .success(function(data) {
                        //$scope.formData = {}; // clear the form so our user is ready to enter another
                        console.log(data);
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });

                    //SMS to User
                      $http.post('/sendMsgtoUser', $scope.item)
                    .success(function(data) {
                        //$scope.formData = {}; // clear the form so our user is ready to enter another
                        console.log(data);
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });

            if (status != undefined && status.status == 'success') {
                $scope.loading = false;
                $scope.serverMessage = 'Email sent successfully';

                $http.post('/sendmail12', {
                    from: 'NXsearch <enquiry@nxsearch.com>',
                    to: 'agogweb1@gmail.com,bizzbazar1@gmail.com,enquiry.nxsearch@gmail.com',
                    subject: 'NXsearch Enquiry for ' + FirstSponsoredClient.ClinicName,
                    //text: item.username + ","+ item.usermobile + ","+item.useremail + ","+item.date + ","+item.time + ","+item.ClinicName,
                    html: "Enquiry for :" + "<b>" + FirstSponsoredClient.ClinicName + "</b> " + "<br>" + "Area :" + "<b>" + FirstSponsoredClient.Area + " </b>" + "<br>" + "Name : " + "<b>" + FirstSponsoredClient.username + " </b>" + "<br>" + "Mobile No :" + "<b>" + FirstSponsoredClient.usermobile + "</b>" + "<br>" // html body
                        +
                        "Email Id :" + "<b>" + FirstSponsoredClient.useremail + "</b>"
                }) .then(function successCallback(response) {
                     $scope.serverMessage = 'Enquiry sent successfully... You will get contacted soon...!';
    // this callback will be called asynchronously
    // when the response is available
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
            }
        }).
        error(function(status) {
            //your code when fails
        });

    }

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
    $scope.fpath = $location.absUrl();
    $window.document.getElementById('shareBtn').onclick = function() {
        //alert($scope.fpath);
        FB.ui({
            method: 'share',
            display: 'popup',
            href: $scope.fpath,

        }, function(response) {})
    }
//Popup Form Code
$scope.baseurl = $location.path()
 /* $scope.sendPopup = function(popupForm){  
      $scope.item = {
        popupName : popupForm.name,
        popupPhone : popupForm.phone,
        popupMsg : popupForm.message,
        formPath : $scope.baseurl
      }
 $http.post('/api/formenquiry/popupForm', $scope.item)
                    .success(function(data) {
                        $scope.popupForm = {}; // clear the form so our user is ready to enter another
                        console.log(data);
                               $http.post('/sendmail12', {
                    from: 'NXsearch PopUp Form <enquiry@nxsearch.com>',
                    to: 'agogweb1@gmail.com,bizzbazar1@gmail.com,enquiry.nxsearch@gmail.com',
                    subject: 'NXsearch Enquiry ',
                    //text: item.username + ","+ item.usermobile + ","+item.useremail + ","+item.date + ","+item.time + ","+item.ClinicName,
                    html: "Enquiry from :" + "<b>" + popupForm.name + "</b> " + "<br>" + "Mobile :" + "<b>" + popupForm.phone + " </b>" + "<br>" + "Message : " + "<b>" + popupForm.message + " </b>" + "<br>"
                          + "Url :"+"<b>"+ $scope.baseurl + "</b>"+"<br>"
                }) .then(function successCallback(response) {
                     $scope.serverMessage = 'Enquiry sent successfully... You will get contacted soon...!';
    // this callback will be called asynchronously
    // when the response is available
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
  }*/

    $http.get('/api/formenquiry/popupForm')
            .success(function(data) {
                $scope.popupEnquiry = data;
                $scope.totalpopupEnquiry = data.length;
               // alert($scope.total);
                console.log(data);
            }) .error(function(data) {
                console.log('Error: ' + data);
            });

  //Popup FOrm Code End

  // Contact Us Mail Configuration
//$scope.showModal = true;
    $scope.contactSend = function(contact){  
 

 $http.post('/sendmail12', {
                    from: 'NXsearch Contact Form <enquiry@nxsearch.com>',
                    to: 'agogweb1@gmail.com,bizzbazar1@gmail.com,enquiry.nxsearch@gmail.com',
                    subject: 'NXsearch Enquiry ',
                    //text: item.username + ","+ item.usermobile + ","+item.useremail + ","+item.date + ","+item.time + ","+item.ClinicName,
                    html: "Enquiry from :" + "<b>" + contact.fname + "</b> " + "<br>" + "Last Name :" + "<b>" + contact.lname + "</b> " + "<br>" + "Email :" + "<b>" + contact.email + "</b> " + "<br>" + "Mobile :" + "<b>" + contact.phone + " </b>" + "<br>" + "Message : " + "<b>" + contact.message + " </b>" + "<br>"
                         
                }) .then(function successCallback(response) {
                     $scope.serverMessage = 'Enquiry sent successfully... You will get contacted soon...!';
    // this callback will be called asynchronously
    // when the response is available
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

                   
                   
  }


  $scope.registerform = function(formData){
      $http.post('/sendmail12', {
                    from: 'NXsearch Contact Form <enquiry@nxsearch.com>',
                    to: 'agogweb1@gmail.com,bizzbazar1@gmail.com,nxsearch1@gmail.com,enquiry.nxsearch@gmail.com',
                    subject: 'NXsearch Registration Request ',
                    //text: item.username + ","+ item.usermobile + ","+item.useremail + ","+item.date + ","+item.time + ","+item.ClinicName,
                    html: "Registration from Business :" + "<b>" + formData.clientName + "</b> " + "<br>" + "Owner Name :" + "<b>" + formData.Name + "</b> " + "<br>" + "Email :" + "<b>" + formData.email + "</b> " + "<br>" + "Mobile :" + "<b>" + formData.phone + " </b>" + "<br>"
                    + "Address :" + "<b>" + formData.address + "</b> " + "<br>" + "Business Name :" + "<b>" + formData.business + "</b> " + "<br>" + "Qualification :" + "<b>" + formData.qualification + "</b> " + "<br>" + "Specialization :" + "<b>" + formData.specialization + " </b>" + "<br>" +  "Experience :" + "<b>" + formData.Experience + "</b> " + "<br>" + "<br>" + "Massage :" + "<b>" + "<b>" + formData.Massage + " </b>" + "<br>"
                         
                }) .then(function successCallback(response) {
                     alert('Thank You For Registering... You will get contacted soon...!');
                     $location.path("/");
    // this callback will be called asynchronously
    // when the response is available
  }, function errorCallback(response) {
      //alert('error');
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  }); 
  }

$scope.MailSub= function(newsletter){
   // alert('1223');
             $http.post('/sendmail12', {
                    from: 'NXsearch Contact Form <enquiry@nxsearch.com>',
                    to: 'agogweb1@gmail.com,bizzbazar1@gmail.com,enquiry.nxsearch@gmail.com',
                    subject: 'NXsearch News letter Subscription Request',
                    //text: item.username + ","+ item.usermobile + ","+item.useremail + ","+item.date + ","+item.time + ","+item.ClinicName,
                    html: "Subscription Request From :" + "<b>" + newsletter.subscribe + "</b> " 
                         
                }) .then(function successCallback(response) {
                     $scope.serverMessage = 'Subscription successfull...Thank you...!';
    // this callback will be called asynchronously
    // when the response is available
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
};
  //Contact Us Mail Configuration End
});


//app.controller('MailController', function ($scope,$http) {
//$scope.loading = false;
//$scope.send = function (mail){
//  $scope.loading = true;
//  $http.post('/sendmail', {
//    from: 'NXsearch <enquiry@nxsearch.com>',
//   to: 'agogweb1@gmail.com',
//   subject: 'Message from AngularCode',
//   text: mail.username
//  }).then(res=>{
//      $scope.loading = false;
//     $scope.serverMessage = 'Email sent successfully';
//  });
//  }
//})