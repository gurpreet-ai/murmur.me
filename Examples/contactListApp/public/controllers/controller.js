var myApp = angular.module('myApp', []);

var controllers = {};

controllers.AppController = function($scope, $http) {
    // console.log("Hello World from controller");

    // ---------------------------------------------------
    // Data from the Server using get
    // ---------------------------------------------------

    var refresh = function () {
        $http.get('/contactList').success(function (response) {
        	console.log("I got the data I requested");
        	$scope.contactList = response;
            $scope.contact = "";
        });
    };

    refresh();

    $scope.addContact = function () {
    	console.log($scope.contact);
    	// post request
    	$http.post('/contactList', $scope.contact).success(function(response) {
            console.log(response);
            refresh();
        });
    };

    $scope.remove = function (id) {
        console.log(id);
        $http.delete('/contactList/' + id).success(function(response) {
            console.log(response);
            refresh();
        });
    };

    $scope.edit = function(id) {
        console.log(id);
        $http.get('/contactList/' + id).success(function(response) {
            $scope.contact = response;
        });
    };

    $scope.update = function () {
        console.log($scope.contact._id);
        var id = $scope.contact._id;
        $http.put('/contactList/' + id, $scope.contact).success(function(response) {
            refresh();
        });
    };

    $scope.deselect = function(id) {
        $scope.contact = "";
    };


    // ---------------------------------------------------
    // Data from the Controller to index.html
    // ---------------------------------------------------

    // person1 = {
    //     name: 'Tim',
    //     email: 'tim@gmail.com',
    //     number:'(571) 426-1433'
    // };

    // person2 = {
    //     name:'Liam',
    //     email:'neason@taken2.com',
    //     number: '(777) 777-7777'
    // };

    // person3 = {
    //     name: 'Jessie',
    //     email:'jessie@vma.com',
    //     number: '(684) 426-1232'
    // };

    // var contactList = [person1, person2, person3];

    // $scope.contactList = contactList;

};

myApp.controller(controllers);