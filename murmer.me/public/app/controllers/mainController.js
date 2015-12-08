angular.module('mainController', [])

.controller('main', function ($rootScope, $location, Auth) {
	var vm = this;

	vm.loggedIn = Auth.isLogged();

	$rootScope.$on('$routeChangeStart', function() {
		vm.loggedIn = Auth.isLoggedIn();

		Auth.getUser().then(function (data) {
			vm.user = data.data;
		});
	});

	vm.data

})