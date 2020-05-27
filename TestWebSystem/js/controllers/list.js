/*
 * IIFE to avoid polution of the global namespace.
 */
(function(){

    angular
        .module("turtleFacts")
        .controller("listCtrl", ListController);

    ListController.$inject = ['$scope','$rootScope','quizMetrics', 'DataService'];

    function ListController($scope, $rootScope,quizMetrics, DataService){
        if(!localStorage.getItem("tests")){
            addDefaultTests();
        }
        if(!localStorage.getItem("users")){
            addDefaultUsers();
        }

        $scope.users = JSON.parse(localStorage.getItem("users"));
        $scope.tests = JSON.parse(localStorage.getItem("tests"));
        $scope.$rootScope = JSON.parse(localStorage.getItem("tests"));
        $scope.user = $scope.users.filter(user => user.login=="admin"&&user.password=="admin")[0];
        $scope.user = $scope.users[0];
        $scope.isLogin = false;
        console.log("users")
        console.log($scope.users)
        console.log("tests")
        console.log($scope.tests)
        console.log("user")
        console.log($scope.user)
        DataService.user = $scope.user;
        DataService.users = $scope.users;
        DataService.tests = $scope.tests;
        $rootScope.users = $scope.users.filter(user => user.role=="user")
        $scope.usersOnly = angular.copy($scope.users.filter(user => user.role=="user"));





        $scope.quizMetrics = quizMetrics;
        $scope.activateQuiz = activateQuiz; // reference to named function below
        $scope.addTest = addTest; // reference to named function below
        $scope.search = ""; // will hold the search query when user uses search bar in view
        $scope.showResults = showResults;
        $scope.showTestList = showTestList;

        function activateQuiz(test){
            DataService.currentTest = test;
            DataService.quizQuestions = test.quizQuestions;
            DataService.correctAnswers = test.correctAnswers;
            quizMetrics.changeState("quiz", true);
            $rootScope.testActive = true;
            DataService.testActive =$rootScope.testActive
        }
        function addTest(){
            $rootScope.addTestActive = true;
            $rootScope.showTestListActive = false;
            $rootScope.showResultsActive = false;
        }

        function showResults(){
            $rootScope.showResultsActive = true;
            $rootScope.showTestListActive = false;
        }
        function showTestList(){
            $scope.tests = DataService.tests;
            $rootScope.showTestListActive = true;
            $rootScope.showResultsActive = false;
        }

        $rootScope.logout = function () {

            window.location.reload()
        }
        $rootScope.logination = function () {
            var users = JSON.parse(localStorage.getItem("users"));
            var user = users.filter(user => user.login==$rootScope.login&&user.password==$rootScope.password)[0];
            if(user!=undefined){
                $scope.user = user;
                $scope.isLogin = true;
                if($scope.user.role=="user"){
                    if($scope.user.results.length==0){
                        $scope.user.results = angular.copy(DataService.tests)
                    }
                }
                DataService.user = $scope.user;
            }
            else{
                alert("Аккаунт з даним іменем/паролем не знайдено!")
            }
            if($scope.user.role!="admin" && $scope.user.results.length < $scope.tests.length){
                $scope.user.results = angular.copy( $scope.tests)
            }
            if($scope.user.role=="admin"){
                $rootScope.showResultsActive = true;
                $rootScope.showTestListActive = false;
            }
        }
        function addDefaultUsers(){
            var tests = JSON.parse(localStorage.getItem("tests"));
            var users = [];
            var user1 = {
                login: "user",
                password: "user",
                name: "Яна",
                lastname: "Козак",
                role: "user",
                results : angular.copy(tests)
            }
            var user2 = {
                login: "user1",
                password: "user1",
                name: "Олег",
                lastname: "Ляшко",
                role: "user",
                results : angular.copy(tests)
            }
            var user3 = {
                login: "user2",
                password: "user2",
                name: "Петро",
                lastname: "Порошенко",
                role: "user",
                results : angular.copy(tests)
            }
            var admin = {
                login: "admin",
                password: "admin",
                name: "admin",
                lastname: "admin",
                role: "admin",
            }
            users.push(user1)
            users.push(user2)
            users.push(user3)
            users.push(admin)
            localStorage.setItem("users", JSON.stringify(users))
        }
        function addDefaultTests(){
            var tests = [];
            var test1 = {
                name: "Загальні положення",
                score : 0,
                percentage: 0,
                correctAnswers : [1, 2, 3, 0, 2, 0, 3],
                quizQuestions : [
                    {
                        type: "text",
                        text: "Недостатньою видимістю вважається:",
                        possibilities: [
                            {
                                answer: "Видимість дороги в напрямку руху менше 300 м у сутінках, в умовах туману, дощу, снігопаду і т. п."
                            },
                            {
                                answer: "Видимість дороги в напрямку руху менше 300 метрів, обмежена поворотом дороги."
                            },
                            {
                                answer: "Небезпечний поворот, небезпечний підйом, небезпечний спуск."
                            },
                            {
                                answer: "Обмежена оглядовість менше 300 м."
                            }
                        ],
                        selected: null,
                        correct: null
                    },
                    {
                        type: "text",
                        text: "Трамвайна колія – елемент дороги, призначений для руху рейкових транспортних засобів, який обмежується по ширині:",
                        possibilities: [
                            {
                                answer: "Спеціально виділеним вимощенням трамвайної лінії."
                            },
                            {
                                answer: "Дорожньою розміткою."
                            },
                            {
                                answer: "Відповіді, зазначені в пунктах 1 і 2."
                            },
                            {
                                answer: "Відповіді, зазначені в пунктах 1 і 3."
                            }
                        ],
                        selected: null,
                        correct: null
                    },

                    {
                        type: "text",
                        text: "Проїзною частиною вважається:'",
                        possibilities: [
                            {
                                answer: "Елемент дороги, призначений для руху нерейкових транспортних засобів."
                            },
                            {
                                answer: "Елемент дороги, призначений для руху рейкових і нерейкових транспортних засобів."
                            },
                            {
                                answer: "Дворові території, а також частини населених пунктів, позначені дорожнім знаком 5.31."
                            },
                            {
                                answer: "Дворові території, а також частини населених пунктів, позначені дорожнім знаком 5.63.1."
                            }
                        ],
                        selected: null,
                        correct: null
                    },
                    {
                        type: "text",
                        text: "Що означає вимога дати дорогу?",
                        possibilities: [
                            {
                                answer: "Вимога до учасника дорожнього руху не продовжувати або не відновлювати рух, не здійснювати будь-яких маневрів "
                            },
                            {
                                answer: "Вимога обов'язкової зупинки перед дорожнім знаком «Дати дорогу»."
                            },
                            {
                                answer: "Вимога обов'язкової зупинки, щоб дати дорогу всім учасникам дорожнього руху."
                            },
                            {
                                answer: "Максимальна відстань вправо від напрямку руху, на якому можна розпізнати транспортні засоби, що наближаються до перехрестя по головній дорозі."
                            }
                        ],
                        selected: null,
                        correct: null
                    },
                    {
                        type: "text",
                        text: "Перехрестям вважається:",
                        possibilities: [
                            {
                                answer: "Перехрещення, прилягання або розгалуження доріг на одному рівні, яке не є виїздом з прилеглих територій."
                            },
                            {
                                answer: "Місце перетину дороги над іншою дорогою (залізницею) на різних рівнях за допомогою шляхопроводу."
                            },
                            {
                                answer: "Місце прилягання до дороги виїзду з прилеглої території."
                            },
                            {
                                answer: "Відповіді, зазначені в пунктах 2, 3."
                            }
                        ],
                        selected: null,
                        correct: null
                    },
                    {
                        type: "text",
                        text: "Для чого призначений тротуар?",
                        possibilities: [
                            {
                                answer: "Для руху велосипедистів з 14-річного віку."
                            },
                            {
                                answer: "Для руху пішоходів."
                            },
                            {
                                answer: "Для стоянки транспортних засобів за умови, що для руху пішоходів залишається не менше як 1 метр."
                            },
                            {
                                answer: "Усі перелічені вище варіанти."
                            }
                        ],
                        selected: null,
                        correct: null
                    },
                    {
                        type: "text",
                        text: "Що з переліченого нижче відповідає терміну «проїзна частина дороги»?",
                        possibilities: [
                            {
                                answer: "Виділений конструктивно або за допомогою ліній горизонтальної дорожньої розмітки елемент дороги, призначений для руху велосипедів, позначений дорожнім знаком «Велосипедна доріжка»."
                            },
                            {
                                answer: "Елемент дороги, призначений для руху транспортних засобів і в випадках, передбачених Правилами дорожнього руху, - для руху пішоходів."
                            },
                            {
                                answer: "Смуга землі, на якій розміщується дорога і все її спорудження."
                            },
                            {
                                answer: "Частина дороги, призначена для руху тільки механічних транспортних засобів."
                            }
                        ],
                        selected: null,
                        correct: null
                    }
                ]
            }
            var test2 = {
                name: "Обов'язки і права пішоходів",
                score : 0,
                percentage: 0,
                correctAnswers : [1, 2, 3, 0, 2, 0, 3],
                quizQuestions : [
                    {
                        type: "text",
                        text: "Під час користування транспортним засобом пасажир автобуса має право на:",
                        possibilities: [
                            {
                                answer: "Отримання своєчасної і точної інформації про умови і порядок руху."
                            },
                            {
                                answer: "Відшкодування заподіяної шкоди."
                            },
                            {
                                answer: "езпечне перевезення себе і багажу"
                            },
                            {
                                answer: "Відповіді 1, 2 і 3."
                            }
                        ],
                        selected: null,
                        correct: null
                    },
                    {
                        type: "text",
                        text: "Трамвайна колія – елемент дороги, призначений для руху рейкових транспортних засобів, який обмежується по ширині:",
                        possibilities: [
                            {
                                answer: "Спеціально виділеним вимощенням трамвайної лінії."
                            },
                            {
                                answer: "Дорожньою розміткою."
                            },
                            {
                                answer: "Відповіді, зазначені в пунктах 1 і 2."
                            },
                            {
                                answer: "Відповіді, зазначені в пунктах 1 і 3."
                            }
                        ],
                        selected: null,
                        correct: null
                    },

                    {
                        type: "text",
                        text: "Проїзною частиною вважається:'",
                        possibilities: [
                            {
                                answer: "Елемент дороги, призначений для руху нерейкових транспортних засобів."
                            },
                            {
                                answer: "Елемент дороги, призначений для руху рейкових і нерейкових транспортних засобів."
                            },
                            {
                                answer: "Дворові території, а також частини населених пунктів, позначені дорожнім знаком 5.31."
                            },
                            {
                                answer: "Дворові території, а також частини населених пунктів, позначені дорожнім знаком 5.63.1."
                            }
                        ],
                        selected: null,
                        correct: null
                    },
                    {
                        type: "text",
                        text: "Що означає вимога дати дорогу?",
                        possibilities: [
                            {
                                answer: "Вимога до учасника дорожнього руху не продовжувати або не відновлювати рух, не здійснювати будь-яких маневрів "
                            },
                            {
                                answer: "Вимога обов'язкової зупинки перед дорожнім знаком «Дати дорогу»."
                            },
                            {
                                answer: "Вимога обов'язкової зупинки, щоб дати дорогу всім учасникам дорожнього руху."
                            },
                            {
                                answer: "Максимальна відстань вправо від напрямку руху, на якому можна розпізнати транспортні засоби, що наближаються до перехрестя по головній дорозі."
                            }
                        ],
                        selected: null,
                        correct: null
                    },
                    {
                        type: "text",
                        text: "Перехрестям вважається:",
                        possibilities: [
                            {
                                answer: "Перехрещення, прилягання або розгалуження доріг на одному рівні, яке не є виїздом з прилеглих територій."
                            },
                            {
                                answer: "Місце перетину дороги над іншою дорогою (залізницею) на різних рівнях за допомогою шляхопроводу."
                            },
                            {
                                answer: "Місце прилягання до дороги виїзду з прилеглої території."
                            },
                            {
                                answer: "Відповіді, зазначені в пунктах 2, 3."
                            }
                        ],
                        selected: null,
                        correct: null
                    },
                    {
                        type: "text",
                        text: "Для чого призначений тротуар?",
                        possibilities: [
                            {
                                answer: "Для руху велосипедистів з 14-річного віку."
                            },
                            {
                                answer: "Для руху пішоходів."
                            },
                            {
                                answer: "Для стоянки транспортних засобів за умови, що для руху пішоходів залишається не менше як 1 метр."
                            },
                            {
                                answer: "Усі перелічені вище варіанти."
                            }
                        ],
                        selected: null,
                        correct: null
                    },
                    {
                        type: "text",
                        text: "Що з переліченого нижче відповідає терміну «проїзна частина дороги»?",
                        possibilities: [
                            {
                                answer: "Виділений конструктивно або за допомогою ліній горизонтальної дорожньої розмітки елемент дороги, призначений для руху велосипедів, позначений дорожнім знаком «Велосипедна доріжка»."
                            },
                            {
                                answer: "Елемент дороги, призначений для руху транспортних засобів і в випадках, передбачених Правилами дорожнього руху, - для руху пішоходів."
                            },
                            {
                                answer: "Смуга землі, на якій розміщується дорога і все її спорудження."
                            },
                            {
                                answer: "Частина дороги, призначена для руху тільки механічних транспортних засобів."
                            }
                        ],
                        selected: null,
                        correct: null
                    }
                ]
            }
            var test3 = {
                name: "Обов'язки і права пасажирів",
                score : 0,
                percentage: 0,
                correctAnswers : [1, 2, 3, 0, 2, 0, 3],
                quizQuestions : [
                    {
                        type: "text",
                        text: "Яких умов повинні дотримуватися пасажири при посадці (висадці) з крайньої смуги проїзної частини?",
                        possibilities: [
                            {
                                answer: "Виділити себе або мати на зовнішньому одязі світловідбиваючі елементи."
                            },
                            {
                                answer: "Переконатися, що це буде безпечно та не створить перешкод іншим учасникам руху."
                            },
                            {
                                answer: "Небезпечний поворот, небезпечний підйом, небезпечний спуск."
                            },
                            {
                                answer: "Відповіді 1 і 2."
                            }
                        ],
                        selected: null,
                        correct: null
                    },
                    {
                        type: "text",
                        text: "Трамвайна колія – елемент дороги, призначений для руху рейкових транспортних засобів, який обмежується по ширині:",
                        possibilities: [
                            {
                                answer: "Спеціально виділеним вимощенням трамвайної лінії."
                            },
                            {
                                answer: "Дорожньою розміткою."
                            },
                            {
                                answer: "Відповіді, зазначені в пунктах 1 і 2."
                            },
                            {
                                answer: "Відповіді, зазначені в пунктах 1 і 3."
                            }
                        ],
                        selected: null,
                        correct: null
                    },

                    {
                        type: "text",
                        text: "Проїзною частиною вважається:'",
                        possibilities: [
                            {
                                answer: "Елемент дороги, призначений для руху нерейкових транспортних засобів."
                            },
                            {
                                answer: "Елемент дороги, призначений для руху рейкових і нерейкових транспортних засобів."
                            },
                            {
                                answer: "Дворові території, а також частини населених пунктів, позначені дорожнім знаком 5.31."
                            },
                            {
                                answer: "Дворові території, а також частини населених пунктів, позначені дорожнім знаком 5.63.1."
                            }
                        ],
                        selected: null,
                        correct: null
                    },
                    {
                        type: "text",
                        text: "Що означає вимога дати дорогу?",
                        possibilities: [
                            {
                                answer: "Вимога до учасника дорожнього руху не продовжувати або не відновлювати рух, не здійснювати будь-яких маневрів "
                            },
                            {
                                answer: "Вимога обов'язкової зупинки перед дорожнім знаком «Дати дорогу»."
                            },
                            {
                                answer: "Вимога обов'язкової зупинки, щоб дати дорогу всім учасникам дорожнього руху."
                            },
                            {
                                answer: "Максимальна відстань вправо від напрямку руху, на якому можна розпізнати транспортні засоби, що наближаються до перехрестя по головній дорозі."
                            }
                        ],
                        selected: null,
                        correct: null
                    },
                    {
                        type: "text",
                        text: "Перехрестям вважається:",
                        possibilities: [
                            {
                                answer: "Перехрещення, прилягання або розгалуження доріг на одному рівні, яке не є виїздом з прилеглих територій."
                            },
                            {
                                answer: "Місце перетину дороги над іншою дорогою (залізницею) на різних рівнях за допомогою шляхопроводу."
                            },
                            {
                                answer: "Місце прилягання до дороги виїзду з прилеглої території."
                            },
                            {
                                answer: "Відповіді, зазначені в пунктах 2, 3."
                            }
                        ],
                        selected: null,
                        correct: null
                    },
                    {
                        type: "text",
                        text: "Для чого призначений тротуар?",
                        possibilities: [
                            {
                                answer: "Для руху велосипедистів з 14-річного віку."
                            },
                            {
                                answer: "Для руху пішоходів."
                            },
                            {
                                answer: "Для стоянки транспортних засобів за умови, що для руху пішоходів залишається не менше як 1 метр."
                            },
                            {
                                answer: "Усі перелічені вище варіанти."
                            }
                        ],
                        selected: null,
                        correct: null
                    },
                    {
                        type: "text",
                        text: "Що з переліченого нижче відповідає терміну «проїзна частина дороги»?",
                        possibilities: [
                            {
                                answer: "Виділений конструктивно або за допомогою ліній горизонтальної дорожньої розмітки елемент дороги, призначений для руху велосипедів, позначений дорожнім знаком «Велосипедна доріжка»."
                            },
                            {
                                answer: "Елемент дороги, призначений для руху транспортних засобів і в випадках, передбачених Правилами дорожнього руху, - для руху пішоходів."
                            },
                            {
                                answer: "Смуга землі, на якій розміщується дорога і все її спорудження."
                            },
                            {
                                answer: "Частина дороги, призначена для руху тільки механічних транспортних засобів."
                            }
                        ],
                        selected: null,
                        correct: null
                    }
                ]
            }
            var test4 = {
                name: "Швидкість руху",
                score : 0,
                percentage: 0,
                correctAnswers : [1, 2, 3, 0, 2, 0, 3],
                quizQuestions : [
                    {
                        type: "text",
                        text: "З якою максимальною швидкістю дозволено рух водієві зі стажем менш ніж два роки?",
                        possibilities: [
                            {
                                answer: "60 км/год."
                            },
                            {
                                answer: "70 км/год."
                            },
                            {
                                answer: "80 км/год."
                            },
                            {
                                answer: "90 км/год."
                            }
                        ],
                        selected: null,
                        correct: null
                    },
                    {
                        type: "text",
                        text: "Трамвайна колія – елемент дороги, призначений для руху рейкових транспортних засобів, який обмежується по ширині:",
                        possibilities: [
                            {
                                answer: "Спеціально виділеним вимощенням трамвайної лінії."
                            },
                            {
                                answer: "Дорожньою розміткою."
                            },
                            {
                                answer: "Відповіді, зазначені в пунктах 1 і 2."
                            },
                            {
                                answer: "Відповіді, зазначені в пунктах 1 і 3."
                            }
                        ],
                        selected: null,
                        correct: null
                    },

                    {
                        type: "text",
                        text: "Проїзною частиною вважається:'",
                        possibilities: [
                            {
                                answer: "Елемент дороги, призначений для руху нерейкових транспортних засобів."
                            },
                            {
                                answer: "Елемент дороги, призначений для руху рейкових і нерейкових транспортних засобів."
                            },
                            {
                                answer: "Дворові території, а також частини населених пунктів, позначені дорожнім знаком 5.31."
                            },
                            {
                                answer: "Дворові території, а також частини населених пунктів, позначені дорожнім знаком 5.63.1."
                            }
                        ],
                        selected: null,
                        correct: null
                    },
                    {
                        type: "text",
                        text: "Що означає вимога дати дорогу?",
                        possibilities: [
                            {
                                answer: "Вимога до учасника дорожнього руху не продовжувати або не відновлювати рух, не здійснювати будь-яких маневрів "
                            },
                            {
                                answer: "Вимога обов'язкової зупинки перед дорожнім знаком «Дати дорогу»."
                            },
                            {
                                answer: "Вимога обов'язкової зупинки, щоб дати дорогу всім учасникам дорожнього руху."
                            },
                            {
                                answer: "Максимальна відстань вправо від напрямку руху, на якому можна розпізнати транспортні засоби, що наближаються до перехрестя по головній дорозі."
                            }
                        ],
                        selected: null,
                        correct: null
                    },
                    {
                        type: "text",
                        text: "Перехрестям вважається:",
                        possibilities: [
                            {
                                answer: "Перехрещення, прилягання або розгалуження доріг на одному рівні, яке не є виїздом з прилеглих територій."
                            },
                            {
                                answer: "Місце перетину дороги над іншою дорогою (залізницею) на різних рівнях за допомогою шляхопроводу."
                            },
                            {
                                answer: "Місце прилягання до дороги виїзду з прилеглої території."
                            },
                            {
                                answer: "Відповіді, зазначені в пунктах 2, 3."
                            }
                        ],
                        selected: null,
                        correct: null
                    },
                    {
                        type: "text",
                        text: "Для чого призначений тротуар?",
                        possibilities: [
                            {
                                answer: "Для руху велосипедистів з 14-річного віку."
                            },
                            {
                                answer: "Для руху пішоходів."
                            },
                            {
                                answer: "Для стоянки транспортних засобів за умови, що для руху пішоходів залишається не менше як 1 метр."
                            },
                            {
                                answer: "Усі перелічені вище варіанти."
                            }
                        ],
                        selected: null,
                        correct: null
                    },
                    {
                        type: "text",
                        text: "Що з переліченого нижче відповідає терміну «проїзна частина дороги»?",
                        possibilities: [
                            {
                                answer: "Виділений конструктивно або за допомогою ліній горизонтальної дорожньої розмітки елемент дороги, призначений для руху велосипедів, позначений дорожнім знаком «Велосипедна доріжка»."
                            },
                            {
                                answer: "Елемент дороги, призначений для руху транспортних засобів і в випадках, передбачених Правилами дорожнього руху, - для руху пішоходів."
                            },
                            {
                                answer: "Смуга землі, на якій розміщується дорога і все її спорудження."
                            },
                            {
                                answer: "Частина дороги, призначена для руху тільки механічних транспортних засобів."
                            }
                        ],
                        selected: null,
                        correct: null
                    }
                ]
            }
            tests.push(test1);
            tests.push(test2);
            tests.push(test3);
            tests.push(test4);
            localStorage.setItem("tests", JSON.stringify(tests))
        }
    }
    // var tests = DataService.tests;


    // users.push(user1)
    // localStorage.setItem("users", JSON.stringify(users))
    // console.log(tests)
    // $rootScope.users =  users.filter(user => user.role=="user")
    // $rootScope.users.selectedUser = users[0];
    // console.log($rootScope.users.selectedUser.results)
})();
// var users = [];
// var user1 = {
//     login: "user",
//     password: "user",
//     name: "Яна",
//     lastname: "Козак",
//     role: "user",
//     results : []
// }
// var user2 = {
//     login: "user2",
//     password: "user2",
//     name: "Студент2",
//     lastname: "Прізвище2",
//     role: "user",
//     results : $scope.tests
// }
// var user3 = {
//     login: "user3",
//     password: "user3",
//     name: "Студент3",
//     lastname: "Прізвище3",
//     role: "user",
//     results : $scope.tests
// }
// var user4 = {
//     login: "user4",
//     password: "user4",
//     name: "Студент4",
//     lastname: "Прізвище4",
//     role: "user",
//     results : $scope.tests
// }
// var admin = {
//     login: "admin",
//     password: "admin",
//     name: "admin",
//     lastname: "admin",
//     role: "admin",
// }
// users.push(user1)
// users.push(user2)
// users.push(user3)
// users.push(user4)
// users.push(admin)
// console.log(users);
// localStorage.setItem("users", JSON.stringify(users))

