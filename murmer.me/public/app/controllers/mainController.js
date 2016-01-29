angular.module('mainController', [])

.controller('mainCtrl', function ($rootScope, $location, Auth) {
	
	var vm = this;

	vm.loggedIn = Auth.isLoggedIn();

	$rootScope.$on('$routeChangeStart', function() {
		
		vm.loggedIn = Auth.isLoggedIn();

		if (vm.loggedIn && ($location.path('/login') || $location.path('/register')))
			$location.path('/');

		Auth.getUser().then(function (data) {
			vm.user = data.data;
		});

		vm.isActive =  function (viewLocation) { 
	        return viewLocation === $location.path();
	    };

	});

	vm.doLogin = function() {
		vm.processing = true;
		vm.error = "";
		Auth.login(vm.loginData.username, vm.loginData.password)
			.success(function (data) {
				vm.processing = false;
				Auth.getUser(data)
					.then(function () {
						vm.user = data.data;
					});

				if (data.success)
					$location.path('/');
				else {
					vm.error = data.message;
				}
			})
	}

	vm.doLogout = function () {
		Auth.logout();
		$location.path('/login');
	}


});