angular.module('murmerApp', ['appRoutes', 'mainController', 'authService', 'userController', 'userService'])
	.config(function($httpProvider){
		$httpProvider.interceptors.push('AuthInterceptor');
	});