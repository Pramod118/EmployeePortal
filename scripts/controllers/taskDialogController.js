var app = angular.module('softSol');

app.controller('taskDialogController', ['$scope', '$mdDialog', 'editTask', 'taskDetails', 'empServices',
 function($scope, $mdDialog, editTask, taskDetails, empServices){
    $scope.task = {
        taskname:'',
        duedate:'',
        finished: 'active',
        percentage:'00.0'
    }

    $scope.editTask = editTask;
    if(taskDetails){
        $scope.task = angular.copy(taskDetails);
    }
        $scope.closeDialog = function() {
          $mdDialog.hide();
        }

        
    $scope.createTask = function(){
        // $scope.task.id = 01;
        $scope.task.userid = 01;
        console.log($scope.task);
        empServices.lolpop($scope.task).then(
            function(result){
                $scope.initTasks();
                $mdDialog.hide();
            }
        )
    }

    $scope.saveTask = function(){
        console.log($scope.task);
        empServices.saveEditedTask($scope.task).then(
            function(result){
                $scope.initTasks();
                // console.log(result);
                $mdDialog.hide();
            }
        )
    }
}])