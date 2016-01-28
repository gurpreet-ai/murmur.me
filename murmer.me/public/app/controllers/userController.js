angular.module('userController', ['userService'])

.controller('userCtrl', function(user) {
    var vm = this;
    user.all()
        .success(function(data){
            vm.users = data;
        });
})


.controller('createUserController', function(user, $location, $window) {
    var vm = this;
    vm.signUpUser = function() {
        vm.message = '';
        user.create(vm.userData)
            .then(function(response) {
                
                console.log(response);

                vm.userData = {};
                vm.message = response.data.message;
                $window.localStorage.setItem('token', response.data.token);
                $location.path('/');
            });
    };
});