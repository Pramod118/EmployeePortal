var app = angular.module('softSol');
app.controller('authController', ['$scope','$state','empServices', function($scope, $state, empServices){
    $scope.user = {
        email:'',
        password:''
    };
    $scope.submitLogin = function(){
        console.log($scope.user);
        var userDetails = {};
         userDetails.email = $scope.user.email;
         userDetails.password = SHA256($scope.user.password);
         userDetails.name = $scope.user.email.substring(0, $scope.user.email.lastIndexOf("@"));

        empServices.login(userDetails).then(
            function(result){
                console.log(result);
                if(result.status == 200 || result.status == 201){
                    localStorage.removeItem('userDetails');
                    localStorage.setItem('userDetails', JSON.stringify(result.data));
                    $scope.message = '';
                    $state.go('home', {id:'tasks'});
                }else{
                    $scope.message = result.data[0].message;
                }
            }
        )
    }

}])
