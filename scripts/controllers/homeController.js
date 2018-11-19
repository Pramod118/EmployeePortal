var app = angular.module('softSol');
app.controller('homeController', ['$scope','$state','$stateParams','empServices','$mdDialog',  
function($scope, $state, $stateParams, empServices, $mdDialog){
    $scope.name = 'Home Controller';
    $scope.team = "myteams";
    
    $scope.selectedIndex = 1;
    $scope.onTabSelected = function(title){
        console.log(title);
       
        $state.go('.', { id: title })
    }

    if($stateParams.id == 'team'){
        $scope.selectedIndex = 1;
    }else if($stateParams.id == 'manage'){
        $scope.selectedIndex = 2;
    }else {
        $scope.selectedIndex = 0;
    }
    $scope.initTasks = function(){
        empServices.getTaskList('all').then(
            function(result){
                $scope.tasks = result.data;
            }
        )
    }
    $scope.initTasks();

    $scope.getTeam = {
        type:'',
        user:''
    };
    $scope.getMyTeams = function(team){
        
        var ud = JSON.parse(localStorage.getItem('userDetails'));
        console.log(ud);
        $scope.getTeam.type = team;
        $scope.getTeam.user = ud[0].name;
        console.log($scope.getTeam);
            empServices.getMyTeams($scope.getTeam).then(
                function(result){
                    console.log(result);
                    $scope.teams = result.data;
                }
            )
       
        
    }
    $scope.logout = function(){
        localStorage.removeItem('userDetails');
        $state.go('auth');
    }
    
    
    $scope.customFullscreen = false;
    $scope.showTask = function(ev, value, task) {
        $mdDialog.show({
          controller: 'taskDialogController',
          templateUrl: 'directives/taskDialog.tmp.html',
          scope: $scope,
          preserveScope: true,
          parent: angular.element(document.body),
          clickOutsideToClose:true,
          locals: {
            editTask: value,
            taskDetails: task
          },
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then(function(answer) {
        }, function() {
        });
      };

      $scope.showMembers = function(ev, value, task) {
        $mdDialog.show({
        //   controller: 'taskDialogController',
          templateUrl: 'directives/teamDialog.tmp.html',
          scope: $scope,
          preserveScope: true,
          parent: angular.element(document.body),
          clickOutsideToClose:true,
          locals: {
            editTask: value,
            taskDetails: task
          },
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then(function(answer) {
        }, function() {
        });
      };

      $scope.createTeam = function(ev, value, team){
        $mdDialog.show({
              controller: 'teamDialogController',
              templateUrl: 'directives/createTeamDialog.tmp.html',
              scope: $scope,
              preserveScope: true,
              parent: angular.element(document.body),
              clickOutsideToClose:true,
              locals: {
                editTeam: value,
                teamDetails: team
              },
              fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
            }, function() {
            });
      }


    $scope.deleteTeam = function(event, team){
        event.preventDefault();
        event.stopPropagation();
        var confirm = $mdDialog.confirm()
          .title('Delete Team')
          .textContent('Are you sure want to delete team?')
          .ok('OK')
          .cancel('Cancel');

    $mdDialog.show(confirm).then(function() {
        empServices.deleteTeam(team).then(
            function(result){
                $scope.getMyTeams($scope.getTeam);
                $mdDialog.hide();
            }
        )
    }, function() {
        $mdDialog.hide();
    });
        
    }

}])

app.directive("taskPage", function(){
    return {
        // restrict: 'EA',
        // controller: 'homeController',
        templateUrl:'directives/taskPage.html'
    }
})
app.directive("teamPage", function(){
    return {
        restrict: 'EA',
        templateUrl:'directives/teamPage.html'
    }
})
app.directive("managePage", function(){
    return {
        restrict: 'EA',
        templateUrl:'directives/managePage.html'
    }
})
