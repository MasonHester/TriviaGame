$(document).ready(function () {

    //Global Variables

    var timer = 30;
    var userOnQuestion = 0;
    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var timeOuts = 0;
    var totalTime = 0;

    var displayNextCountdown;
    var timeUpCountdown;

    //Array with all data

    var triviaArray = [
        //Example of format
        // {
        //     id: "Question Number",
        //     question: "Question",
        //     possibleAnswers: ["Answer A", "Answer B", "Answer C", "Answer D", "Answer E", "..."], (Can be any length)
        //     correctAnswer: "Answer B",
        //     tidbit: "Fact about correct answer",
        //     explanation: "State the correct answer in sentance format",
        //     image: "Link to image -eg. ./assets/images/nameOfImage.type"
        // },

        {
            id: 1,
            question: "Which fictional city is the home of Batman?",
            possibleAnswers: ["Arcane City", "New York City", "Gotham City", "Gothic City"],
            correctAnswer: "Gotham City",
            tidbit: "Batman’s secret identity was derived from two historical figures Robert the Bruce, a Scottish national hero, and Mad Anthony Wayne, a hero of the American Revolution",
            explanation: "Batman fights crime in Gotham City",
            image: "./assets/images/questionOneImage.jpg"
        },

        {
            id: 2,
            question: "In which sport would you perform the Fosbury Flop?",
            possibleAnswers: ["Soccer", "Frisbee Golf", "Golf", "The High Jump"],
            correctAnswer: "The High Jump",
            tidbit: "The Fosbury Flop was popularized and perfected by American athlete Dick Fosbury",
            explanation: "The Fosbury Flop is performed in The High Jump",
            image: "./assets/images/questionTwoImage.jpg"
        },

        {
            id: 3,
            question: "Spinach is high in which mineral?",
            possibleAnswers: ["Gold", "Iron", "Calcium", "Bronze"],
            correctAnswer: "Iron",
            tidbit: "Just half a cup of raw spinach counts as 1 of the 5 servings of fruits and vegetables you should eat a day",
            explanation: "Spinach is high in Iron",
            image: "./assets/images/questionThreeImage.jpg"
        },

        {
            id: 4,
            question: "What is a Geiger Counter used to detect?",
            possibleAnswers: ["Radiation", "People named Geiger", "Wind", "Earthquakes"],
            correctAnswer: "Radiation",
            tidbit: "The Geiger Counter detects ionizing radiation such as alpha particles, beta particles and gamma rays using the ionization effect produced in a Geiger–Müller tube; which gives its name to the instrument",
            explanation: "A Geiger Counter is used to detect Radiation",
            image: "./assets/images/questionFourImage.jpg"
        },

        {
            id: 5,
            question: "What type of dog has breeds called Scottish, Welsh, and Irish?",
            possibleAnswers: ["Pitbull", "Terrier", "Pug", "Labrador"],
            correctAnswer: "Terrier",
            tidbit: "Most terrier breeds were developed in Great Britain and Ireland",
            explanation: "Terriers have breed called Scottish, Welsh, and Irish",
            image: "./assets/images/questionFiveImage.jpg"
        },

        {
            id: 6,
            question: "Babe Ruth is associated with which sport?",
            possibleAnswers: ["The High jump", "Basketball", "Baseball", "The 100M Dash"],
            correctAnswer: "Baseball",
            tidbit: "With regular playing time, he broke the MLB single-season home run record in 1919",
            explanation: "Babe Ruth was a famous Baseball player",
            image: "./assets/images/questionSixImage.jpg"
        },

        {
            id: 7,
            question: "In the film Babe, what type of animal was Babe?",
            possibleAnswers: ["Pig", "Cow", "Party animal", "Turkey"],
            correctAnswer: "Pig",
            tidbit: "Babe's Voice Actress was Christine Cavanaugh",
            explanation: "Babe was a pig",
            image: "./assets/images/questionSevenImage.jpg"
        },

        {
            id: 8,
            question: "What was Muhammad Ali's birth name?",
            possibleAnswers: ["Cassius Clay", "Mark Levetin", "Roxana Milea", "Scott Byers"],
            correctAnswer: "Cassius Clay",
            tidbit: "Muhammad Ali was married four times and has nine children",
            explanation: "Mohammed Ali's original birth name was Cassius Clay",
            image: "./assets/images/questionEightImage.jpg"
        },

        {
            id: 9,
            question: "What Roman Emperor supposedly fiddled while Rome burned?",
            possibleAnswers: ["Hero", "Nero", "Zero", "Steve"],
            correctAnswer: "Nero",
            tidbit: "Nero was Tutored by the great Stoic philosopher Seneca",
            explanation: "Nero played the flute while he watched Rome burn",
            image: "./assets/images/questionNineImage.jpg"
        },

        {
            id: 10,
            question: "Which crime-fighting cartoon dog has the initials S.D. on his collar",
            possibleAnswers: ["Snoop Dog", "Salvador Dali", "Super Dog", "Scooby Doo"],
            correctAnswer: "Scooby Doo",
            tidbit: "Scooby-Doo was loosely based on Abbott And Costello",
            explanation: "Scooby Doo is a cartoon crime-fighting dog with S.D. on his collar",
            image: "./assets/images/questionTenImage.jpg"
        }
    ]

    //====================================================

    //Provides the index that coorelates with the userOnQuestion Variable
    var userOnIndex = userOnQuestion - 1;

    //d shorthand for display

    //Main Col
    var $dContentCol = $(".displayContentCol");

    //Start and Try Again buttons
    var $dStartButtonCol = $(".displayStartButtonCol");

    var $dStartButton = $("<p>");

    //Timer
    var $dTimerCol = $(".displayTimerCol");

    var $dTimer = $("<p class='displayTimer bold noSelect'>");

    //Feedback
    var $dFeedbackCol = $(".displayFeedbackCol");

    var $dFeedback = $("<p class='displayFeedback bold'>")

    //Question
    var $dPrimeTextCol = $(".displayPrimeTextCol");

    var $dPrimeText = $("<p class='displayPrimeText bold'>");

    //Answer
    var $dAnswerCol = $(".displayAnswerCol");

    //Image
    var $dImageCol = $(".displayImageCol");

    var $dImage = $("<img>");

    //Stats
    var $dCorrectAnswers = $("<p>");

    var $dIncorrectAnswers = $("<p>");

    var $dTimeOuts = $("<p>");

    var $dTotalTime = $("<p>");

    //====================================================

    //Functions

    //updates the userOnIndex var, used for giving the proper index for the related question
    function updateIndex(questionNumber) {
        userOnIndex = questionNumber - 1;
    }

    //Starts the game
    function StartGame() {
        console.log("|Game Start|");
        resetStats();
        displayTrivia();
    }

    function resetStats() {
        userOnQuestion = 0;
        correctAnswers = 0;
        incorrectAnswers = 0;
        timeOuts = 0;
        totalTime = 0;
        console.log("---Stats reset---");
    }

    function displayTrivia() {
        clearTimeout(displayNextCountdown);
        userOnQuestion++;
        updateIndex(userOnQuestion);
        console.log("User on question: " + userOnQuestion);
        displayEmpty();
        displayTimer();
        displayQuestion();
        displayAnswers();
        timeUpCountdown = setTimeout(timeUp, 30 * 1000);
    }

    function displayEmpty() {
        $dStartButtonCol.empty();
        $dTimerCol.empty();
        $dFeedbackCol.empty();
        $dPrimeTextCol.empty();
        $dAnswerCol.empty();
        $dImageCol.empty();
    }

    function displayTimer() {
        console.log("Timer Displayed");
        $dTimer.text(30);
        timer = 30;
        timerCountdown = setInterval(startCountdown, 1000);
        $dTimerCol.append($dTimer);
    }

    function startCountdown() {
        timer--;
        $dTimer.text(timer);
    }

    function displayQuestion(index) {
        $dPrimeText.text(triviaArray[userOnIndex].question);
        console.log(triviaArray[userOnIndex].question);
        $dPrimeTextCol.append($dPrimeText);
    }

    function displayAnswers() {
        for (i = 0; i < triviaArray[userOnIndex].possibleAnswers.length; i++) {
            var answerButton = $("<p class='displayAnswerButton displayButton noSelect bold'>");
            answerButton.addClass("answerButton").attr("data-name", triviaArray[userOnIndex].possibleAnswers[i]).text(triviaArray[userOnIndex].possibleAnswers[i]);
            $dAnswerCol.append(answerButton);
        }
    }

    function timeUp() {
        totalTime += 30;
        clearInterval(timerCountdown);
        displayEmpty();
        $dPrimeText.text("You ran out of time!").addClass("timeUp")
        $dPrimeTextCol.append($dPrimeText);
        displayNext();
        timeOuts++;
    }

    function answerCheck() {
        console.log("timer: " + timer);           
        if(timer < 30) {
            totalTime += (30 - timer);
        }

        else {
            totalTime++;
        }

        console.log("total time: " + totalTime);

        clearInterval(timerCountdown);
        clearTimeout(timeUpCountdown);
        var userAnswer = $(this).attr("data-name");

        displayEmpty();

        if (userAnswer === triviaArray[userOnQuestion - 1].correctAnswer) {
            displayFeedback("Correct");
            displayPostText("tidbit");
            correctAnswers++;
        }

        else {
            displayFeedback("Incorrect");
            displayPostText("explanation");
            incorrectAnswers++;
        }

        displayImage();
        displayNext();
    }

    function displayFeedback(feedback) {
        $dFeedback.text(feedback);
        $dFeedbackCol.append($dFeedback);
    }

    function displayPostText(postText) {
        if (postText === "tidbit") {
            $dPrimeText.text(triviaArray[userOnQuestion - 1].tidbit);
            $dPrimeTextCol.append($dPrimeText);
        }

        else {
            $dPrimeText.text(triviaArray[userOnQuestion - 1].explanation);
            $dPrimeTextCol.append($dPrimeText);
        }
    }

    function displayImage() {
        $dImage.attr("src", triviaArray[userOnIndex].image).addClass("displayImage noSelect");
        $dImageCol.append($dImage);
    }

    function displayNext() {
        if (userOnQuestion < triviaArray.length) {
            displayNextCountdown = setTimeout(displayTrivia, 3 * 1000)
        }

        else {
            displayNextCountdown = setTimeout(endGame, 3 * 1000);
        }
    }

    function endGame() {
        displayEmpty();

        console.log("avail time: " + triviaArray.length * 30);
        console.log("time taken: " + (parseInt(triviaArray.length) * 30) - totalTime);
        $dCorrectAnswers.text("You got " + correctAnswers + " questions right");
        $dIncorrectAnswers.text("You got " + incorrectAnswers + " questions wrong");
        $dTimeOuts.text("You timed out on " + timeOuts + " questions");
        $dTotalTime.text("You took " + totalTime + " seconds to complete the trivia")
        $dPrimeTextCol.append($dCorrectAnswers).append($dIncorrectAnswers).append($dTimeOuts).append($dTotalTime).addClass("displayPrimeText bold");

        if(correctAnswers > (triviaArray.length * 7) / 10) {
            $dPrimeText.text("Amazing!");
            $dPrimeText.append($dPrimeText);
            $dImage.attr("src", "./assets/images/goodScore.jpg");
            $dImageCol.append($dImage);
        }

        else {
            $dPrimeText.text("Nice Try");
            $dPrimeText.append($dPrimeText);
            $dImage.attr("src", "./assets/images/badScore.jpg");
            $dImageCol.append($dImage);
        }

        $dStartButton.text("Try Again").addClass("displayButton displayStartButton noSelect bold");
        $dStartButtonCol.append($dStartButton);
    }

    //====================================================

    $dContentCol.on("click", ".displayStartButton", StartGame);

    $dContentCol.on("click", ".answerButton", answerCheck)
});