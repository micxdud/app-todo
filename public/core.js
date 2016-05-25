var todo = angular.module('todo', ['ui.bootstrap']);

todo.controller('mainController', ['$scope', '$http', function ($scope, $http) {
        
    $scope.logged = false;
    
    $scope.formData = {};
    var email = "";
    
    $scope.completition = 'all'
    
    // when landing on the page, get all todos and show them
    $http.get('/api/todos')
        .success(function(data) {
            $scope.todos = data;
        });
        
        
    $scope.filterTasks = function(value){
        $http.get('/api/todos/completition/' + value)
            .success(function(data) {
                $scope.todos = data;
            });
    };

    $scope.login = function() {
        email = $scope.formData.email;
        $scope.logged = true;
    };

    // when submitting the add form, send the text to the API
    $scope.createTodo = function() {
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData.text = ""; // clear the form so user is ready to enter another
                $scope.todos = data;
            });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id,completition) {
        $http.delete('/api/todos/' + id + '/' + completition)
            .success(function(data) {
                $scope.todos = data;
            });
    };
    
    // check todo as complete or incomplete
    $scope.completeTodo = function(id) {
        $http.post('/api/todos/complete/' + id)
            .success(function(data) {
                $scope.todos = data;
            });
    };

    
}]);
