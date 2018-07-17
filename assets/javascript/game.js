$(document).ready(function() {

    //Global Variables

    var timer = 30;
    var userOnQuestion = 0;
    var correctGuesses = 0;
    var timeOuts = 0;
    var userAnswer = 0;

    //Holding Intervals

    var countdown;
    var timerCountdown;

    //Array with all data

    var questions = [
        {
            id: 1,
            question: "Which fictional city is the home of Batman?",
            possibleAnswers: ["Arcane City", "New York City", "Gotham City", "Gothic City"],
            correctAnswer: "Gotham City",
            tidbit: "cf1",
            explanation: "Batman fights crime in Gotham City.",
            image: "./assets/images/questionOneImage.jpg"
        },

        {
            id: 2,
            question: "In which sport would you perform the Fosbury Flop?",
            possibleAnswers: ["Soccer", "Frisbee Golf", "Golf", "The High Jump"],
            correctAnswer: "The High Jump",
            tidbit: "cf2",
            explanation: "The Fosbury Flop is performed in The High Jump.",
            image: "./assets/images/questionTwoImage.jpg"
        },

        {
            id: 3,
            question: "Spinach is high in which mineral?",
            possibleAnswers: ["Gold", "Iron", "Calcium", "Bronze"],
            correctAnswer: "Iron",
            tidbit: "cf3",
            explanation: "Spinach is high in Iron.",
            image: "./assets/images/questionThreeImage.jpg"
        },

        {
            id: 4,
            question: "What is a Geiger Counter used to detect?",
            possibleAnswers: ["Radiation", "People named Geiger", "Wind", "Earthquakes"],
            correctAnswer: "Radiation",
            tidbit: "cf4",
            explanation: "A Geiger Counter is used to detect Radiation.",
            image: "./assets/images/questionFourImage.jpg"
        },

        {
            id: 5,
            question: "What type of dog has breeds called Scottish, Welsh, and Irish?",
            possibleAnswers: ["Pitbull", "Terrier", "Pug", "Labrador"],
            correctAnswer: "Terrier",
            tidbit: "cf5",
            explanation: "Terriers have breed called Scottish, Welsh, and Irish.",
            image: "./assets/images/questionFiveImage.jpg"
        },

        {
            id: 6,
            question: "Babe Ruth is associated with which sport?",
            possibleAnswers: ["The High jump", "Basketball", "Baseball", "The 100M Dash"],
            correctAnswer: "Baseball",
            tidbit: "Babe Ruth was a famous Baseball player.",
            explanation: "cf6",
            image: "./assets/images/questionSixImage.jpg"
        },

        {
            id: 7,
            question: "In the film Babe, what type of animal was Babe?",
            possibleAnswers: ["Pig", "Cow", "Party animal", "Turkey"],
            correctAnswer: "Pig",
            tidbit: "cf7",
            explanation: "Babe was a pig.",
            image: "./assets/images/questionSevenImage.jpg"
        },

        {
            id: 8,
            question: "What was Mohammed Ali's birth name?",
            possibleAnswers: ["Cassius Clay", "Mark Levetin", "Roxana Milea", "Scott Byers"],
            correctAnswer: "Cassius Clay",
            tidbit: "cf8",
            explanation: "Mohammed Ali's original birth name was Cassius Clay.",
            image: "./assets/images/questionEightImage.jpg"
        },

        {
            id: 9,
            question: "What Roman Emperor supposedly fiddled while Rome burned?",
            possibleAnswers: ["Hero", "Nero", "Zero", "Steve"],
            correctAnswer: "Zero",
            tidbit: "cf9",
            explanation: "Nero played the flute while he watched Rome burn.",
            image: "./assets/images/questionNineImage.jpg"
        },

        {
            id: 10,
            question: "Which crime-fighting cartoon dog has the initials S.D. on his collar",
            possibleAnswers: ["Snoop Dog", "Salvador Dali", "Super Dog", "Scooby Doo"],
            correctAnswer: "Scooby Doo",
            tidbit: "cf10",
            explanation: "Scooby Doo is a cartoon crime-fighting dog with S.D. on his collar.",
            image: "./assets/images/questionTenImage.jpg"
        }
    ]

    //====================================================

    //Establishing Functions

    //Starts game, calls Question Loop
    
    function gameStart() {
        userOnQuestion = 0;
        correctGuesses = 0;
        timeOuts = 0;
        userAnswer = 0;
        console.log("Game Start");
        questionLoop();
    }

    //Bulk of code inside Question Loop
    
    function questionLoop() {
        //Increments User On Question
        userOnQuestion++;
        console.log("Question Loop called| user question: " + userOnQuestion);

        $("#displayTimer").html("<p class='bold'>30</p>");

        //Times out after 30 seconds and calls Time Up
        timerCountdown = setTimeout(timeUp, 30000);

        //If there is still a question to display it displays it with the answers
        //Displays a timer counting down
        if(userOnQuestion < questions.length + 1) {
            timer = 30;
            countdown = setInterval(startCountdown, 1000);
            console.log("Next question called| Question: " + questions[userOnQuestion]);
            $("#displayQuestion").html("<p class='displayQuestion bold'>" + questions[userOnQuestion - 1].question + "</p>");

            //Displays all the answers            
            for(i = 0; i < questions[userOnQuestion - 1].possibleAnswers.length; i++) {
                $("#displayAnswer" + (i + 1)).html("<p id='answer" + (i + 1) + "Button' class='displayAnswerButton displayButton noSelect bold'>" + questions[userOnQuestion - 1].possibleAnswers[i] + "</p>");
                console.log("Button " + (i + 1) + " created");
            };
        }

        else {
            console.log("gameEnd called");
            gameEnd();
        }

        $("#answer1Button").on("click", userInput1);
        $("#answer2Button").on("click", userInput2);
        $("#answer3Button").on("click", userInput3);
        $("#answer4Button").on("click", userInput4);
        
    }

    function userInput1() {
        console.log("User clicked Button 1");
        userAnswer = questions[userOnQuestion - 1].possibleAnswers[0]
        answerCheck()
    }
    
    function userInput2() {
        console.log("User clicked Button 2");
        userAnswer = questions[userOnQuestion - 1].possibleAnswers[1]
        answerCheck()
    }

    function userInput3() {
        console.log("User clicked Button 3");
        userAnswer = questions[userOnQuestion - 1].possibleAnswers[2]
        answerCheck()
    }

    function userInput4() {
        console.log("User clicked Button 4");
        userAnswer = questions[userOnQuestion - 1].possibleAnswers[3]
        answerCheck()
    }

    function answerCheck() {
        console.log("checking answer");
        clearTimeout(timerCountdown);
        clearInterval(countdown);

        if(userAnswer === questions[userOnQuestion - 1].correctAnswer) {
            correctAnswer();
        }

        else {
            incorrectAnswer();
        }
    }

    function startCountdown() {
        timer--;
        console.log("second passed");
        $("#displayTimer").html("<p class='noSelect bold'>" + timer + "</p>");
    }

    function correctAnswer() {
        console.log("Correct answer")
        $("#displayQuestion").html("<p class='bold'>Correct!</p>");
        $("#displayAnswer1").html("<p class='bold'>" + questions[userOnQuestion - 1].tidbit + "</p>");
        $("#displayAnswer2").html("<img class='displayImage' src='" + questions[userOnQuestion - 1].image + "'>");
        $("#displayAnswer3").html("<p></p>");
        $("#displayAnswer4").html("<p></p>");
        correctGuesses++;
        setTimeout(questionLoop, 2000);
    }

    function incorrectAnswer() {
        console.log("Incorrect answer")
        $("#displayQuestion").html("<p class='bold'>Incorrect.</p>");
        $("#displayAnswer1").html("<p class='bold'>" + questions[userOnQuestion - 1].explanation + "</p>");
        $("#displayAnswer2").html("<img class='displayImage' src='" + questions[userOnQuestion - 1].image + "'>");
        $("#displayAnswer3").html("<p></p>");
        $("#displayAnswer4").html("<p></p>");
        setTimeout(questionLoop, 2000);
    }

    // function marcTimer(numberSeconds, nextPage) {
    //     setTimeout(doAThing, 
    //         amount)
    // }

    // when on a page requiring user input: marcTimer(30, answer.html)
    // when on a page showing answer: marcTimer(3, nextquestion.html)

    function timeUp() {
        $("#displayTimer").html("<p class='bold'>0</p>")
        clearInterval(countdown);
        timeOuts++;

        if(userOnQuestion < 11) {
            $("#displayQuestion").html("<p class='bold'>Times up!</p>");
            $("#displayAnswer1").html("<p class='bold'>" + questions[userOnQuestion - 1].explanation + "</p>");
            $("#displayAnswer2").html("<img class='displayImage' src='" + questions[userOnQuestion - 1].image + "'>");
            $("#displayAnswer3").html("<p></p>");
            $("#displayAnswer4").html("<p></p>");
            setTimeout(questionLoop, 2000);
        }
        
        else {
            gameEnd();
        }
    }
        
    function gameEnd() {
        clearTimeout(timerCountdown);
        clearInterval(countdown);

        $("#displayQuestion").html("<p class='bold'>Game over.</p>");
        $("#displayAnswer1").html("<p class='bold'>You answered " + correctGuesses + " questions correctly!</p>");
        $("#displayAnswer2").html("<p class='bold'>You timed out on " + timeOuts + " questions.</p>");

        if(correctGuesses > 8) {
            $("#displayAnswer3").html("<img class='displayImage finalImage' src='./assets/images/goodScore.jpg'>");
        }

        else {
            $("#displayAnswer3").html("<img class='displayImage finalImage' src='./assets/images/badScore.jpg'>");
        }

        $("#displayAnswer4").html("<p class='displayStartButton displayButton bold noSelect'>Try again?</p>");
    }

    //==============================================================

    $("body").on("click", ".displayStartButton", gameStart);
});