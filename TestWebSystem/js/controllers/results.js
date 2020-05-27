/*
 * IIFE to encapsulate code and avoid global variables
 */
(function(){

    /*
     * attaching results controller function to the turtleFacts module 
     */
    angular
        .module("turtleFacts")
        .controller("resultsCtrl", ResultsController);


    ResultsController.$inject = ['$scope','$rootScope','quizMetrics', 'DataService'];

    function ResultsController($scope, $rootScope,quizMetrics, DataService){

        $scope.quizMetrics = quizMetrics; // binding the object from factory to vm
        $scope.dataService = DataService;
        $scope.getAnswerClass = getAnswerClass; // named function defined below
        $scope.setActiveQuestion = setActiveQuestion; // named function defined below
        $scope.reset = reset; // named function defined below
        $scope.calculatePerc = calculatePerc; // named function defined below
        $scope.activeQuestion = 0;

        function calculatePerc(){
            return quizMetrics.numCorrect / DataService.quizQuestions.length * 100;
        }
        function setActiveQuestion(index){

            $scope.activeQuestion = index;
        }

        function getAnswerClass(index){

            if(index === quizMetrics.correctAnswers[$scope.activeQuestion]){
                return "bg-success";
            }else if(index === DataService.quizQuestions[$scope.activeQuestion].selected){
                return "bg-danger";
            }
        }

        function reset(){
            console.log(DataService.user)

            var res = quizMetrics.numCorrect / DataService.quizQuestions.length * 100;
            var test = DataService.user.results.filter(result => result.name==DataService.currentTest.name)[0];
            test.score = quizMetrics.numCorrect +"/"+ DataService.quizQuestions.length;
            test.percentage = res;
            console.log("RESULT OF TEST!!!")
            console.log(DataService.user)
            console.log(DataService.user)
            var users = JSON.parse(localStorage.getItem("users")).filter(user => user.login!=DataService.user.login);
            users.push(DataService.user);
            localStorage.setItem("users", JSON.stringify(users))

            quizMetrics.changeState("results", false);
            $rootScope.testActive = false;
            DataService.testActive = false;
            quizMetrics.numCorrect = 0;
            for(var i = 0; i < DataService.quizQuestions.length; i++){
                var data = DataService.quizQuestions[i]; //binding the current question to data to keep code clean
                data.selected = null;
                data.correct = null;
            }
        }

    }

})();
