$(document).ready(function() {

    var timer = 30;
    var userQuestion = 0;
    var gameOver = true;
    var correctGuesses = 0;

    var countdown;
    var timerCountdown;

    var images = [
        "./assets/images/1",
        "./assets/images/2",
        "./assets/images/3",
        "./assets/images/4",
        "./assets/images/5",
        "./assets/images/6",
        "./assets/images/7",
        "./assets/images/8",
        "./assets/images/9",
        "./assets/images/10",
    ]

    var correct = [
        "cf1",
        "cf2",
        "cf3",
        "cf4",
        "cf5",
        "cf6",
        "cf7",
        "cf9",
        "cf8",
        "cf10",
    ]

    var incorrect = [
        "if1",
        "if2",
        "if3",
        "if4",
        "if5",
        "if6",
        "if7",
        "if9",
        "if8",
        "if10",
    ]

    var questions = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
    ]

    var answersOne = [
        "a1x",
        "a2x",
        "a3x",
        "a4o",
        "a5x",
        "a6x",
        "a7o",
        "a8o",
        "a9x",
        "a10x",
    ]

    var answersTwo = [
        "b1x",
        "b2x",
        "b3o",
        "b4x",
        "b5o",
        "b6x",
        "b7x",
        "b8x",
        "b9o",
        "b10x",
    ]

    var answersThree = [
        "c1o",
        "c2x",
        "c3x",
        "c4x",
        "c5x",
        "c6o",
        "c7x",
        "c8x",
        "c9x",
        "c10x",
    ]

    var answersFour = [
        "d1x",
        "d2o",
        "d3x",
        "d4x",
        "d5x",
        "d6x",
        "d7x",
        "d8x",
        "d9x",
        "d10o",
    ]

    //==============================================================

    
    function gameStart() {
        console.log("Game Start");
        gameOver = false;
        questionLoop();
    }

    
    function questionLoop() {
        console.log("Question Loop called| user question: " + userQuestion)

        $("#displayTimer").html("<p class='bold'>30</p>")

        timerCountdown = setTimeout(timeUp, 30000);

        if(userQuestion < 10) {
            timer = 30;
            countdown = setInterval(decrement, 1000);
            console.log("Next question called| Question: " +questions[userQuestion]);
            $("#displayQuestion").html("<p class='displayQuestion bold'>" + questions[userQuestion] + "</p>");
            $("#displayAnswerOne").html("<p id='answerOneButton' class='displayAnswerButton displayButton noSelect bold'>" + answersOne[userQuestion] + "</p>");
            $("#displayAnswerTwo").html("<p id='answerTwoButton' class='displayAnswerButton displayButton noSelect bold'>" + answersTwo[userQuestion] + "</p>");
            $("#displayAnswerThree").html("<p id='answerThreeButton' class='displayAnswerButton displayButton noSelect bold'>" + answersThree[userQuestion] + "</p>");
            $("#displayAnswerFour").html("<p id='answerFourButton' class='displayAnswerButton displayButton noSelect bold'>" + answersFour[userQuestion] + "<p>");
        }

        else {
            gameEnd();
        }

        $("#answerOneButton").on("click", answerCheckOne);
        $("#answerTwoButton").on("click", answerCheckTwo);
        $("#answerThreeButton").on("click", answerCheckThree);
        $("#answerFourButton").on("click", answerCheckFour);
        
    }

    function decrement() {
        timer--;
        console.log("second passed");
        $("#displayTimer").html("<p class='noSelect bold'>" + timer + "</p>");
    }

    function correctAnswer() {
        $("#displayQuestion").html("<p class'bold'>Correct!</p>");
        $("#displayAnswerOne").html("<p class'bold'>" + correct[userQuestion] + "</p>");
        $("#displayAnswerTwo").html("<img src='" + images[userQuestion] + "'>");
        $("#displayAnswerThree").html("<p></p>");
        $("#displayAnswerFour").html("<p></p>");
        userQuestion++;
        correctGuesses++;
        setTimeout(questionLoop, 2000);
    }

    function incorrectAnswer() {
        $("#displayQuestion").html("<p class'bold'>Incorrect.</p>");
        $("#displayAnswerOne").html("<p class'bold'>" + incorrect[userQuestion] + "</p>");
        $("#displayAnswerTwo").html("<img src='" + images[userQuestion] + "'>");
        $("#displayAnswerThree").html("<p></p>");
        $("#displayAnswerFour").html("<p></p>");
        userQuestion++;
        setTimeout(questionLoop, 2000);
    }

    function timeUp() {
        clearInterval(countdown);

        if(userQuestion < 10) {
            $("#displayQuestion").html("<p class'bold'>Times up!</p>");
            $("#displayAnswerOne").html("<p class'bold'>" + incorrect[userQuestion] + "</p>");
            $("#displayAnswerTwo").html("<img src='" + images[userQuestion] + "'>");
            $("#displayAnswerThree").html("<p></p>");
            $("#displayAnswerFour").html("<p></p>");
            userQuestion++;
            setTimeout(questionLoop, 2000);
        }
        
        else {
            gameEnd();
        }
    }

    function answerCheckOne() {
        clearTimeout(timerCountdown);
        clearInterval(countdown);
        
        if(userQuestion < 5) {
            if(userQuestion === 0) {
                incorrectAnswer();
            }

            else if(userQuestion === 1) {
                incorrectAnswer();
            }

            else if(userQuestion === 2) {
                incorrectAnswer();
            }
            
            else if(userQuestion === 3) {
                correctAnswer();
            }
            
            else {
                incorrectAnswer();
            }
        }

        else {
            if(userQuestion === 5) {
                incorrectAnswer();
            }

            else if(userQuestion === 6) {
                correctAnswer();
            }

            else if(userQuestion === 7) {
                correctAnswer();
            }
            
            else if(userQuestion === 8) {
                incorrectAnswer();
            }
            
            else {
                incorrectAnswer();
            }
        }
    }
        
    function answerCheckTwo() {
        clearTimeout(timerCountdown);
        clearInterval(countdown);

        if(userQuestion < 5) {
            if(userQuestion === 0) {
                incorrectAnswer();
            }

            else if(userQuestion === 1) {
                incorrectAnswer();
            }

            else if(userQuestion === 2) {
                correctAnswer();
            }
            
            else if(userQuestion === 3) {
                incorrectAnswer();
            }
            
            else {
                correctAnswer();
            }
        }

        else {
            if(userQuestion === 5) {
                incorrectAnswer();
            }

            else if(userQuestion === 6) {
                incorrectAnswer();
            }

            else if(userQuestion === 7) {
                incorrectAnswer();
            }
            
            else if(userQuestion === 8) {
                correctAnswer();
            }
            
            else {
                incorrectAnswer();
            }
        }
    }
        
    function answerCheckThree() {
        clearTimeout(timerCountdown);
        clearInterval(countdown);

        if(userQuestion < 5) {
            if(userQuestion === 0) {
                correctAnswer();
            }

            else if(userQuestion === 1) {
                incorrectAnswer();
            }

            else if(userQuestion === 2) {
                incorrectAnswer();
            }
            
            else if(userQuestion === 3) {
                incorrectAnswer();
            }
            
            else {
                incorrectAnswer();
            }
        }
        

        else {
            if(userQuestion === 5) {
                correctAnswer();
            }

            else if(userQuestion === 6) {
                incorrectAnswer();
            }

            else if(userQuestion === 7) {
                incorrectAnswer();
            }
            
            else if(userQuestion === 8) {
                incorrectAnswer();
            }
            
            else {
                incorrectAnswer();
            }
        }
    }
        
    function answerCheckFour() {
        clearTimeout(timerCountdown);
        clearInterval(countdown);

        if(userQuestion < 5) {
            if(userQuestion === 0) {
                incorrectAnswer();
            }

            else if(userQuestion === 1) {
                correctAnswer();
            }

            else if(userQuestion === 2) {
                incorrectAnswer();
            }
            
            else if(userQuestion === 3) {
                incorrectAnswer();
            }
            
            else {
                incorrectAnswer();
            }
        }

        else {
            if(userQuestion === 5) {
                incorrectAnswer();
            }

            else if(userQuestion === 6) {
                incorrectAnswer();
            }

            else if(userQuestion === 7) {
                incorrectAnswer();
            }
            
            else if(userQuestion === 8) {
                incorrectAnswer();
            }
            
            else {
                correctAnswer();
            }
        }
    }

    function gameEnd() {
        $("#displayQuestion").html("<p class'bold'>Game over.</p>");
        $("#displayAnswerOne").html("<p class'bold'>You answered " + correctGuesses + " questions correctly!</p>");
        
        if(correctGuesses < 8) {
            $("#displayAnswerTwo").html("<img src='./assets/images/good'>");
        }

        else {
            $("#displayAnswerTwo").html("<img src='./assets/images/bad'>");
        }

        $("#displayAnswerThree").html("<p></p>");
        $("#displayAnswerFour").html("<p></p>");
    }

    //==============================================================

    $("#gameStartButton").on("click", gameStart);
});