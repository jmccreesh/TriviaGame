/*You'll create a trivia form with multiple choice or true/false options (your choice).

* The player will have a limited amount of time to finish the quiz. 

  * The game ends when the time runs out. The page will reveal the number of questions that players answer correctly and incorrectly.

* Don't let the player pick more than one answer per question.

* Don't forget to include a countdown timer.*/
// Define variables
$(document).ready(function(){
    var count = 0;
    var time = 31;
    var isSelected = false;
    var ticker;
    var correct = 0;
    var incorrect = 0;
    var unanswered = 0;

// Questions and Answer Arrays
    var question = [
        "Question # 1. Who invented HTML?",
        "Question # 2. What does HTML stand for?", 
        "Question # 3. Markup tags tell the Web browser?", 
        "Question # 4. What tag do you often use to link between pages?", 
        "Question # 5. In HTML everything between an opening and closing tag is known as a/an?",
        "Question # 6. Which of the Three Stooges was originally from Philadelphia?", 
        "Question # 7. When using tags in HTML code, they always appear how?", 
        "Question # 8. What is the difference between HTML and CSS?",
        "Question # 9. Which tag contains ALL of the website's visible content?",
        "Question # 10. Which heading tag displays the largest text?"
    ];
// Answer Array   
    var answer = [
        "C. Tim Berners-Lee", 
        "B. Hyper Text Markup Language", 
        "D. How to display the page", 
        "B. a", 
        "A. Element", 
        "B. Larry", 
        "C. Inside of angled brackets", 
        "A. HTML deals with the function of the site and CSS the form", 
        "B. body", 
        "C. h2"];
// A. choices    
        var firstChoice = [
        "A. Steve Jobs", 
        "A. Hyper Text Makeup Language", 
        "A. How to organize the page", 
        "A. anchor", 
        "A. Element", 
        "A. Moe", 
        "A. Inside of curly braces", 
        "A. HTML deals with the function of the site and CSS the form",
        "A. head",
        "A. h5"];
// B. choices    
        var secondChoice = [
        "B. Bill Gates", 
        "B. Hyper Text Markup Language", 
        "B. Who made the page", 
        "B. a", 
        "B. Attribute", 
        "B. Larry", 
        "B. Inside of parentheses", 
        "B. CSS is a markup language unlike HTML",
        "B. body",
        "B. h4"];
// C. choices        
    var thirdChoice = [
        "C. Tim Berners-Lee", 
        "C. Hyper Text Mainframe Language", 
        "C. How to display messge box on page", 
        "C. link", 
        "C. entence", 
        "C. Shemp", 
        "C. Inside of angled brackets", 
        "C. CSS deals with the function of the site and HTML the form",
        "C. title",
        "C. h2"];
// D. choices
    var fourthChoice = [
        "D. Mark Zukerberg", 
        "D. How To Make Lasagna", 
        "D. How to display the page", 
        "D. hyperlink", 
        "D. Topic", 
        "D. Curley", 
        "D. Inside of square brackets", 
        "D. There is no difference",
        "D. start",
        "D. h6"];

// To Show the Question & Choice holders
    function showHolders() {
        $("#question-holder").show();
        $("#choice-holder-1").show();
        $("#choice-holder-2").show();
        $("#choice-holder-3").show();
        $("#choice-holder-4").show();
    }
// To Hide the Question & Choice holders
    function hideHolders() {
        $("#question-holder").hide();
        $("#choice-holder-1").hide();
        $("#choice-holder-2").hide();
        $("#choice-holder-3").hide();
        $("#choice-holder-4").hide();
    }
// To hide the results
    function hideResults() {
        $("#correct-holder").hide();
        $("#incorrect-holder").hide();
        $("#unanswered-holder").hide();
        $("#restart-holder").hide();
    }
// To display the questions
    function displayQuestion () {
        hideResults();
        $("#answer-holder").hide();
        $("#image-holder").hide();
        $("#time-holder").show();
        showHolders();
        $("#question-holder").html(question[count]);
        $("#question-holder").fadeToggle(1000).fadeToggle(1000);
        $("#question-holder").css("color","red");
        $("#choice-holder-1").html(firstChoice[count]);
        $("#choice-holder-2").html(secondChoice[count]);
        $("#choice-holder-3").html(thirdChoice[count]);
        $("#choice-holder-4").html(fourthChoice[count]);
    
    // Hover over choices
        $("#choice-holder-1").hover(function() {
            $(this).css("color", "gray");
        },
        function(){
            $(this).css("color", "black");
        });
        $("#choice-holder-2").hover(function() {
            $(this).css("color", "gray");
        },
        function(){
            $(this).css("color", "black");
        });
        $("#choice-holder-3").hover(function() {
            $(this).css("color", "gray");
        },
        function(){
            $(this).css("color", "black");
        });
        $("#choice-holder-4").hover(function() {
            $(this).css("color", "gray");
        },
        function(){
            $(this).css("color", "black");
        });
    }
    $("#choice-holder-1").on("click", checkAnswer) 
    $("#choice-holder-2").on("click", checkAnswer)
    $("#choice-holder-3").on("click", checkAnswer)
    $("#choice-holder-4").on("click", checkAnswer)

// How the answer will be checked to see if it is correct
    function checkAnswer() {

        hideHolders();

        if($(this).text() === answer[count]) {
            stopTime();
            isSelected = true;
            $("#answer-holder").show();
            $("#answer-holder").html("You are Correct!! The answer is: " + answer[count]);
            displayImage();
            correct++;
            count++;
        }
        else {
            stopTime();
            isSelected = true;
            $("#answer-holder").show();
            $("#answer-holder").html("Nice Try! The answer is: " + answer[count]);
            displayImage();
            incorrect++;
            count++;
        } 

        checkGameEnd();  
    }

// See if the game is finished
    function checkGameEnd() {
        if(count === question.length) {
            $("#time-holder").hide();
            showResults();
            count = 0;
            $(".start").show();
            $(".start").on("click", function() {
                resetResults();
                startGame();
            });
        }
    }

    function resetTime() {
        time = 31;
    }
// Show time
    function displayTime() {
        time--;
        $("#time-holder").html("Time remaining: " + time);
        
            if(time <= 0) {
                hideHolders();
                stopTime();
                $("#answer-holder").show();
                $("#answer-holder").html("Time is up! The answer is: " + answer[count]);
                displayImage();
                unanswered++;
                count++;
                checkGameEnd();
            }
    }

    function startTime() {
        clearInterval(ticker);
        ticker = setInterval(displayTime, 1000);
    }
    function stopTime() {
        clearInterval(ticker);
        resetTime();
        if(count < question.length - 1) {
            setTimeout(startTime, 2000);
            setTimeout(displayQuestion, 3000);
        }
    }

    resetTime();

// Show images describing answers
    function displayImage() {
        if(count === 0) {
            $("#image-holder").show();
            $("#image-holder").html('<img src="assets/images/timBerners.jpeg">');
        }
        else if(count === 1) {
            $("#image-holder").show();
            $("#image-holder").html('<img src="assets/images/HTML.jpeg">');
        }
        else if(count === 2) {
            $("#image-holder").show();
            $("#image-holder").html('<img src="assets/images/tag.gif">');
        }
        else if(count === 3) {
            $("#image-holder").show();
            $("#image-holder").html('<img src="assets/images/a_tag.png">');
        }
        else if(count === 4) {
            $("#image-holder").show();
            $("#image-holder").html('<img src="assets/images/tags.png">');
        }
        else if(count === 5) {
            $("#image-holder").show();
            $("#image-holder").html('<img src="assets/images/larry.jpeg">');
        }
        else if(count === 6) {
            $("#image-holder").show();
            $("#image-holder").html('<img src="assets/images/angled_brackets.png">');
        }
        else if(count === 7) {
            $("#image-holder").show();
            $("#image-holder").html('<img src="assets/images/html_css.jpg">');
        }
        else if(count === 8) {
            $("#image-holder").show();
            $("#image-holder").html('<img src="assets/images/bodytag.png">');
        }
        else if(count === 9) {
            $("#image-holder").show();
            $("#image-holder").html('<img src="assets/images/h_tags.jpg">');
        }
    }

 // Show Results Function   
    function showResults() {
        $("#correct-holder").show();
        $("#correct-holder").html("Correct: " + correct);
        $("#incorrect-holder").show();
        $("#incorrect-holder").html("Incorrect: " + incorrect);
        $("#unanswered-holder").show();
        $("#unanswered-holder").html("Unanswered: " + unanswered);
        $("#restart-holder").show();
        $("#restart-holder").html("Click Start the Game above to play again!");
    }

// Reset Results Function 
    function resetResults() {
        correct = 0;
        incorrect = 0;
        unanswered = 0;
    }

// Start Game Function
    function startGame() {
        $(".start").hide();
        startTime();
        displayQuestion();
    }

// Start Game On Click
  $(".start").on("click", function() {
    startGame();
  });
});