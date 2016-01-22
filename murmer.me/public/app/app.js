angular.module('murmerApp', ['appRoutes', 'mainController', 'authService'])
	.config(function($httpProvider){
		$httpProvider.interceptors.push('AuthInterceptor');
	});