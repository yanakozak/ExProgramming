/*
 * Immediately Invoked Function Expression (IIFE) to avoid creating global 
 * variables and keep code safe
 */
(function(){

    angular
        .module("turtleFacts")
        .controller("addTest", QuizController);

    QuizController.$inject = ['$scope','$rootScope','quizMetrics', 'DataService'];
    function QuizController($scope, $rootScope, quizMetrics, DataService){
       $scope.test = {
            name:$scope.testName,
            score : 0,
            percentage: 0,
            correctAnswers : [],
            quizQuestions : []
        }
       $scope.quizMetrics = quizMetrics; // Attaching the quizMetrics object to the view model
       $scope.dataService = DataService;
       $scope.next = next; // also a named function defined below
       $scope.finish = finish; // setActiveQuestion is a named function below


        function next(){
            if($scope.ansCorr.toLowerCase()=='a'){
                corAns = 0;
            }
            else if($scope.ansCorr.toLowerCase()=='b'){
                corAns = 1;
            }
            else if($scope.ansCorr.toLowerCase()=='c'){
                corAns = 2;
            }
            else if($scope.ansCorr.toLowerCase()=='d'){
                corAns = 3;
            }
            var obj = {
                type: "text",
                text:$scope.question,
                possibilities: [
                {
                    answer:$scope.ansA
                },
                {
                    answer:$scope.ansB
                },
                {
                    answer:$scope.ansC
                },
                {
                    answer:$scope.ansD
                }
            ],
                selected: null,
                correct: null
            }
           $scope.test.quizQuestions.push(obj)
           $scope.test.correctAnswers.push(corAns)
           $scope.test.name =$scope.testName;
            console.log(obj);
            console.log(corAns);
            console.log($scope.testName);
            console.log($scope.test);
           $scope.question = "";
           $scope.ansA = "";
           $scope.ansB = "";
           $scope.ansC = "";
           $scope.ansD = "";
           $scope.ansCorr = "";

        }
        function finish(){
            $scope.next();
            console.log("BEFORE")
            console.log(DataService.tests)
            console.log(DataService.users)

            DataService.tests.push($scope.test);
            DataService.users.filter(user => user.role=="user").forEach(function(user){
                console.log()
                user.results.push(angular.copy($scope.test));
            });
             localStorage.setItem("tests", JSON.stringify(DataService.tests))
             localStorage.setItem("users", JSON.stringify(DataService.users))
            console.log("AFTER")
            console.log(DataService.tests)
            console.log(DataService.users)

            $rootScope.addTestActive = false;
            $rootScope.showTestListActive = true;
        }



    }

})();
