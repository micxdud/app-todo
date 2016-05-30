var todo = angular.module('todo', ['ui.bootstrap']);

todo.controller('mainController', ['$scope', '$http', function ($scope, $http) {
        
    $scope.logged = false;
    
    $scope.formData = {};
    var email = "";
    
    $scope.completition = 'all';
    $scope.owner = 'all';
    
    $scope.myTasks = 0;
    $scope.myTasksDone = 0;
    $scope.myTasksUndone = 0;
    $scope.allTasks = 0;
    $scope.doneTasks = 0;
    $scope.undoneTasks = 0;
    
    // when landing on the page, get all todos and show them
    $http.get('/api/todos')
        .success(function(data) {
            $scope.todos = data;
        });
        
    
        
        
    $scope.filterTasks = function(completition,owner,email){
        $http.get('/api/todos/filter/' + completition + '/' + owner + '/' + email)
            .success(function(data) {
                $scope.todos = data;
            });
    };

    $scope.login = function() {
        email = $scope.formData.email;
        $scope.logged = true;
        $scope.allTasks = $scope.todos.length;
        
        for(var i=0;i<$scope.todos.length;i++){
            if($scope.formData.email == $scope.todos[i]['email']){
                $scope.myTasks++;
            }
            
            if($scope.todos[i]['isCompleted'] == true){
                if ($scope.formData.email == $scope.todos[i]['email']){
                    $scope.myTasksDone++;
                }
                $scope.doneTasks++;
            }else{
                if ($scope.formData.email == $scope.todos[i]['email']){
                    $scope.myTasksUndone++;
                }
                $scope.undoneTasks++;
            }
        }
    };

    // when submitting the add form, send the text to the API
    $scope.createTodo = function(completition,owner,email) {
        $http.post('/api/todos/' + completition + '/' + owner + '/' + email, $scope.formData)
            .success(function(data) {
                $scope.formData.text = ""; // clear the form so user is ready to enter another
                $scope.todos = data;
                
                 $http.get('/api/todos')
                    .success(function(data) {
                        $scope.myTasks = 0;
                        $scope.myTasksDone = 0;
                        $scope.myTasksUndone = 0;
                        $scope.allTasks = data.length;
                        $scope.doneTasks = 0;
                        $scope.undoneTasks = 0;
                        
                        for(var i=0;i<data.length;i++){
                            if($scope.formData.email == data[i]['email']){
                                $scope.myTasks++;
                            }
                            
                            if(data[i]['isCompleted'] == true){
                                if ($scope.formData.email == $scope.todos[i]['email']){
                                    $scope.myTasksDone++;
                                }
                                $scope.doneTasks++;
                            }else{
                                if ($scope.formData.email == $scope.todos[i]['email']){
                                    $scope.myTasksUndone++;
                                }
                                $scope.undoneTasks++;
                            }
                        }
                    });
                
            });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id,completition,owner,email) {
        $http.delete('/api/todos/' + id + '/' + completition + '/' + owner + '/' + email)
            .success(function(data) {
                $scope.todos = data;
                
                $http.get('/api/todos')
                    .success(function(data) {
                        $scope.myTasks = 0;
                        $scope.myTasksDone = 0;
                        $scope.myTasksUndone = 0;
                        $scope.allTasks = data.length;
                        $scope.doneTasks = 0;
                        $scope.undoneTasks = 0;
                        
                        for(var i=0;i<data.length;i++){
                            if($scope.formData.email == data[i]['email']){
                                $scope.myTasks++;
                            }
                            
                            if(data[i]['isCompleted'] == true){
                                if ($scope.formData.email == $scope.todos[i]['email']){
                                    $scope.myTasksDone++;
                                }
                                $scope.doneTasks++;
                            }else{
                                if ($scope.formData.email == $scope.todos[i]['email']){
                                    $scope.myTasksUndone++;
                                }
                                $scope.undoneTasks++;
                            }
                        }
                    });
            });
    };
    
    // check todo as complete or incomplete
    $scope.completeTodo = function(id,completition,owner,email) {
        $http.post('/api/todos/complete/' + id + '/' + completition + '/' + owner + '/' + email)
            .success(function(data) {
                $scope.todos = data;
                
               $http.get('/api/todos')
                    .success(function(data) {
                        $scope.myTasks = 0;
                        $scope.myTasksDone = 0;
                        $scope.myTasksUndone = 0;
                        $scope.allTasks = data.length;
                        $scope.doneTasks = 0;
                        $scope.undoneTasks = 0;
                        
                        for(var i=0;i<data.length;i++){
                            if($scope.formData.email == data[i]['email']){
                                $scope.myTasks++;
                            }
                            
                            if(data[i]['isCompleted'] == true){
                                if ($scope.formData.email == $scope.todos[i]['email']){
                                    $scope.myTasksDone++;
                                }
                                $scope.doneTasks++;
                            }else{
                                if ($scope.formData.email == $scope.todos[i]['email']){
                                    $scope.myTasksUndone++;
                                }
                                $scope.undoneTasks++;
                            }
                        }
                    });
            });
    };

    
}]);
