var app = angular.module('softSol');
app.factory("empServices", ['$http', function($http){

    var empServices = {};
    var config = {
        headers:{"Content-Type":"application/json"}
    }
    empServices.login = function(data){
        return $http.get('http://localhost:3000/employee?email='+data.email, config).then(
            function (resp){
                // console.log(resp);
                if(resp.data.length < 1){
                    return empServices.signup(data);
                }else{
                    if(data.password == resp.data[0].password){
                    return resp;
                    }else{
                        var error = {}
                        return error = {
                            data:[
                                {
                                    message:"Invalid Credentials"
                                }
                            ]
                        }
                    }
                }
            },
            function(err){
                console.log(err);
            }
        )


    }
    empServices.signup = function(data){
        return $http.post('http://localhost:3000/employee', data, config).then(
            function (resp){
                // console.log(resp);
                return resp;
            }
        )
    }
    empServices.getTaskList = function(data) {
        return $http.get('http://localhost:3000/taskList').then(
            function(resp){
                console.log(resp);
                return resp;
            }
        )
    }
    empServices.lolpop = function(data){
        return $http.post('http://localhost:3000/taskList', data, config).then(
            function(resp){
                console.log(resp);
                return resp;
            }
        )
    }
    empServices.saveEditedTask = function(data){
        return $http.put('http://localhost:3000/taskList/'+data.id, data, config).then(
            function(resp){
                // console.log(resp);
                return resp;
            }
        )
    }
    empServices.getMyTeams = function(team){
        return $http.get('http://localhost:3000/myteams?owner='+team.user).then(
            function(resp){
                console.log(resp);
                return resp;
            }
        )
    }
    empServices.createNewTeam = function(data){
        return $http.post('http://localhost:3000/myteams', data, config).then(
            function(resp){
                console.log(resp);
                return resp;
            }
        )
    }
    empServices.deleteTeam = function(team){
        return $http.delete('http://localhost:3000/myteams/'+team.id).then(
            function(resp){
                return resp;
            }
        )
    }

    return empServices;
    
}])