var app = angular.module('softSol');

app.controller('teamDialogController', ['$scope', '$mdDialog', 'editTeam', 'teamDetails', 'empServices',
 function($scope, $mdDialog, editTeam, teamDetails, empServices){

    var userDetails = JSON.parse(localStorage.getItem('userDetails'))[0];
    $scope.members = [];
    $scope.team = {
        title:'',
        description:'',
        members:''
    }

    $scope.addMember = function(member){
        $scope.members.push(member);
        $scope.addmember = '';
    }

    $scope.createTeam = function(){
        $scope.team.members = $scope.members.toString();
        $scope.team.owner = userDetails.name;
        console.log($scope.team);
        empServices.createNewTeam($scope.team).then(
            function(result){
                $scope.getMyTeams($scope.getTeam);
                $mdDialog.hide();
            }
        )
    }
 }
])