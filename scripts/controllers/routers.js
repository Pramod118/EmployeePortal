var app = angular.module("softSol",['ui.router', 'ngCookies', 'ngMaterial', 'ngMessages']);
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

    $stateProvider
    .state({
        name: 'home',
        url:'/home/:id',
        cache: false,
        controller: 'homeController',
        params: { 
            id: { 
              dynamic: true 
            }
          },
        resolve:{ 
            login: checkLogin
        },
        templateUrl:'views/home.html'
    })
    .state({
        name:'auth',
        url:'/auth',
        controller:'authController',
        templateUrl:'views/auth.html'
    });
    $urlRouterProvider.otherwise('/home/tasks');
    

    function checkLogin($state){
        if(!localStorage.getItem('userDetails')){
            $state.go('auth');
        }
    }
}])