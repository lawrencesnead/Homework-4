const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const timerContainer = document.getElementById('timer');
const startButton = document.getElementById('start');
const scoreBoardLink = document.getElementById('highscores');
var answerContainer = document.getElementsByClassName("answers");
var answerButtons = document.getElementsByClassName('button-answer');
var questionCounter = 0;
var userScore = 0;
var questionNumber = 0;
var userAnswer = "";
var count;
var answerCheck = "";
var interval;
var scoreboard = [];
const myQuestions = [
    {
      question: "Who is responsible for lithium batteries and the modern age?",
      answers: {
        a: "John Goodenough",
        b: "Bill Gates",
        c: "Steve Jobs"
      },
      correctAnswer: "a"
    },
    {
      question: "Who makes the best cell phones?",
      answers: {
        a: "Apple",
        b: "Samsung",
        c: "Trick question; they're both garbage devices used to invade your privacy"
      },
      correctAnswer: "c"
    },
    {
      question: "Which administration began the separtion of families at the border policy?",
      answers: {
        a: "Obama",
        b: "Trump",
        c: "Bush"
      },
      correctAnswer: "a"
    },
    {
      question: "Which game system is the best?",
      answers: {
        a: "Xbox",
        b: "Playstation",
        c: "Trick question; PC is the best"
      },
      correctAnswer: "c"
    },
    {
      question: "Where is Jeffery Epstein?",
      answers: {
        a: "Antarctica",
        b: "Exploring the moats of hell",
        c: "Witness Protection",
        d: "Didn't commit suicide"
      },
      correctAnswer: "d"
    }
];

function generateScoreBoard() {
    quizContainer.innerHTML = "<h1>High Scores</h1>";
    var scoreboardTemp = JSON.parse(localStorage.getItem("scoreboard"));
    var playAgainBtn = [];
// play again and reset scoreboard button
    playAgainBtn.push(`<br>
    <label>
    <button id="play-again">Play Again?
    </button>
    <button id="reset-score">Reset Scoreboard?
    </button>
    </label>`)
    var ol = document.createElement("ol")
    // Render a new li for each score but only if there is data to put into the list
    if (scoreboardTemp !== null) {
        for (var i = 0; i < scoreboardTemp.length; i++) {
        
            console.log(scoreboardTemp)
            var li = document.createElement("li");
            li.textContent = scoreboardTemp[i].username + " - " + scoreboardTemp[i].score;
            li.setAttribute("data-index", i);

            ol.appendChild(li);
        }
    }

    quizContainer.appendChild(ol);
    quizContainer.innerHTML += playAgainBtn.join('');
    // Reset Button code
    $('#reset-score').click(function () {
        localStorage.clear();
        scoreboard = [];
        quizContainer.innerHTML = '<h1>High Scores</h1><br>'+playAgainBtn.join();
        $('#play-again').click(buildQuiz);
    });
    $('#play-again').click(buildQuiz);
    
}

function generateQuestion() {
    var currentQuestion = myQuestions[questionCounter];
    const output = [];
    // store the list of answer choices
    const answers = [];

    // for each available answer...
    if (questionCounter < 5) {
        for (letter in currentQuestion.answers) {

            // ...add an HTML button
            answers.push(
                `<br>
        <label>
        <button name="question${questionNumber}" value="${letter}" class="button-answer">
        ${letter} :
        ${currentQuestion.answers[letter]}
        </button>
        </label>`
            );
        }

        // add this question and its answers to the output
        output.push(
            `<br><div class="question"> ${currentQuestion.question} </div><br>
    <div class="answers"> ${answers.join('')} </div>`
        );
        quizContainer.innerHTML = output.join('');
    }
    $('.button-answer').click(function(event) {
        userAnswer = event.target.value;
        
        console.log(userAnswer)
        if (questionCounter < 5) {
            checkAnswer(userAnswer);
        }
        else {
            userScore = count;
            console.log(count)
            clearInterval(interval)
            output.push(
                `<h1>All done!</h1>`
            )
            quizContainer.innerHTML = output.join('');
        }
    });
    if (questionCounter > 4) {
        console.log(userAnswer);
        if (count < 0)
            count = 0;
        userScore = count;
        console.log(count)
        clearInterval(interval)
        timerContainer.innerHTML = "Time: " + count;
        output.push(
            `<h1>All done!</h1><br>
            <p>Your score is ${userScore}</p><br>
            <form>
             Enter Intials:   
            <input type="text" id="username"><br><br>
            <input type="submit" id="sub-btn" value="Submit">
            </form>`
        )
        quizContainer.innerHTML = output.join('');
        $('#sub-btn').click(function () {
            var userTemp = document.getElementById('username').value;
            event.preventDefault();
            if (userTemp === "") {
                alert("Must enter something for intials.")
                return
            }
            if (localStorage.length != 0)
                scoreboard = JSON.parse(localStorage.getItem("scoreboard"));
            userTemp = document.getElementById('username').value;
            var tempUserObj = {};
            tempUserObj = { username: userTemp, score: userScore }
            scoreboard.push(tempUserObj);
            console.log(scoreboard);
            
            scoreboard.sort(function (a, b) {
                return parseInt(a.score) - parseInt(b.score)
            });
        
    
            localStorage.setItem("scoreboard", JSON.stringify(scoreboard.reverse()));
            generateScoreBoard();
            
            

            
        })
    }

}

// function to begin building the quiz. basically a constructor. 
// Resets questionCounter and questionNumber to 0 so that when the user clicks play again,
// the quiz starts over. This also starts my interval timer.

function buildQuiz() {
    questionCounter = 0;
    questionNumber = 0;
    count = 75;
    startButton.style.visibility = 'hidden';
    interval = setInterval(function () {
        count--;
        timerContainer.innerHTML = "Time: " + count;
        if (count <= 0 ) {
            clearInterval(interval);
            alert("You're out of time!");
            generateScoreBoard();
        }
    }, 1000);
    console.log("building")
    generateQuestion();
    
}
// this function checks if the users answer to the question is right. 
// It also increments the question counter so that the correct question is displayed
function checkAnswer(userAnswer){
    console.log(myQuestions[questionCounter].correctAnswer)
    if (String(userAnswer) === myQuestions[questionCounter].correctAnswer && questionCounter < 5) {
        console.log(myQuestions[questionCounter].correctAnswer)
        questionCounter++;
        questionNumber++;
        resultsContainer.innerHTML = 'Correct!';
        userAnswer = "";
        generateQuestion();
        setTimeout(function () {
            resultsContainer.innerHTML = '';
        }, 1000)
    }
    else if (questionCounter < 5) {
        count -= 15;
        questionCounter++;
        questionNumber++;
        resultsContainer.innerHTML = 'Incorrect!';
        userAnswer = "";
        generateQuestion();
        setTimeout(function () {
            resultsContainer.innerHTML = '';
        }, 1000)
    } 
}


// on click listener
startButton.addEventListener('click', buildQuiz);
$('.link-highscore').click(function () {
    startButton.style.visibility = 'hidden';
    clearInterval(interval);
    generateScoreBoard();
});


