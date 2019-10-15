var app = angular.module('App', ['ngRoute']);
var baseURL = 'https://pmanager9.herokuapp.com';

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        // route for the home page
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'mainController'
        })
        // route for the about page
        .when('/project/:projectId', {
            templateUrl: 'pages/project.html',
            controller: 'projectController'
        })
    $locationProvider.html5Mode(true)
});
app.controller('mainController', function ($scope, $http) {
    $scope.formData = {};
    $scope.newProject = {};
    $scope.isLoading = true;
    $scope.projects = [];
    getProjects();
    // when landing on the page, get all todos and show them
    $scope.getTodo = function () {
        $http.get(`${baseURL}/api/todos`)
            .success(function (data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function () {
        console.log($scope.newProject);
        // $http.post(`${baseURL}/api/todos`, $scope.formData)
        //     .success(function (data) {
        //         $scope.formData = {}; // clear the form so our user is ready to enter another
        //         $scope.todos = data;
        //         console.log(data);
        //     })
        //     .error(function (data) {
        //         console.log('Error: ' + data);
        //     });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function (id) {
        console.log(id);
        // $http.delete(`${baseURL}/api/todos/${id}`)
        //     .success(function (data) {
        //         $scope.todos = data;
        //         console.log(data);
        //     })
        //     .error(function (data) {
        //         console.log('Error: ' + data);
        //     });
    };

    function getProjects() {
        $http.get(`${baseURL}/api/projects`)
            .success(function (data) {
                $scope.projects = data;
                console.log(data);
                $http.get(`${baseURL}/api/todos`)
                    .success(function (data) {
                        $scope.projects.forEach(p => {
                            data.forEach(d => {
                                if (p.id == d.projectId) {
                                    if (p.tasks) {
                                        p.tasks.push(d);
                                    } else {
                                        p.tasks = [];
                                        p.tasks.push(d);
                                    }
                                }
                            });
                            $scope.isLoading = false;
                        });

                        console.log(data);
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }

    $scope.createReports = function () {
        console.log($scope.newProject);
        $http.post(`${baseURL}/api/projects/`, $scope.newProject)
            .success(function (data) {
                $scope.newProject = {}; // clear the form so our user is ready to enter another
                getProjects();
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

});

app.controller('projectController', function ($scope, $http, $routeParams) {
    $scope.formData = {};
    $scope.newProject = {};
    $scope.isLoading = true;
    $scope.projectId = $routeParams.projectId;
    var project = {};
    $scope.projects.forEach(p =>{
        if(p.id === $scope.projectId){
            project = p;
        }
    });
    $scope.projects = [];
    $scope.projects.push(project);
});
