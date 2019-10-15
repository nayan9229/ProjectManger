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
app.controller('mainController', function ($scope, $http, $location) {
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
                $http.get(`${baseURL}/api/todos`)
                    .success(function (data) {
                        $scope.projects.forEach(p => {
                            let count = 0;
                            data.forEach(d => {
                                // if (count < 5) {
                                    if (p.id == d.projectId) {
                                        if (p.tasks) {
                                            p.tasks.push(d);
                                        } else {
                                            p.tasks = [];
                                            p.tasks.push(d);
                                        }
                                    }
                                // }
                                count++;
                            });
                            $scope.isLoading = false;
                        });
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
        if(!$scope.newProject.avatar){
            $scope.newProject.avatar = 'https://url'
        }
        $http.post(`${baseURL}/api/projects/`, $scope.newProject)
            .success(function (data) {
                $scope.newProject = {}; // clear the form so our user is ready to enter another
                getProjects();
                console.log(data);
                $location.path("/");
            })
            .error(function (data) {
                console.log('Error: ' + data);
                $location.path("/");
            });
    };

});

app.controller('projectController', function ($scope, $http, $routeParams, $location) {
    $scope.formData = {};
    $scope.newTask = {};
    $scope.isLoading = true;
    $scope.projectId = $routeParams.projectId;
    $scope.project = {};
    getProjects();

    function getProjects() {
        $http.get(`${baseURL}/api/projects`)
            .success(function (data) {
                $scope.projects = data;
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
                        getProjectById();
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                        getProjectById();
                    });
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }

    function getProjectById() {
        $scope.projects.forEach(p => {
            if (p.id == $scope.projectId) {
                $scope.project = p;
            }
        });
    }

    $scope.createTask = function () {
        $scope.newTask.completed = false;
        $scope.newTask.projectId = $scope.projectId;
        $scope.newTask.taskId = 0;
        $http.post(`${baseURL}/api/todos/`, $scope.newTask)
            .success(function (data) {
                $scope.newProject = {}; // clear the form so our user is ready to enter another
                getProjects();
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }
    $scope.todoSelected = function (task, tcomp) {
        console.log('[TASK]', task);
        console.log('[TASK]', tcomp);
    }

    $scope.createReports = function () {
        console.log($scope.newProject);
        if(!$scope.newProject.avatar){
            $scope.newProject.avatar = 'https://url'
        }
        $http.post(`${baseURL}/api/projects/`, $scope.newProject)
            .success(function (data) {
                $scope.newProject = {}; // clear the form so our user is ready to enter another
                getProjects();
                $location.path("/");
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
                $location.path("/");
            });
    };

});
