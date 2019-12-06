const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const timerContainer = document.getElementById('timer');
const startButton = document.getElementById('start');
var answerContainer = document.getElementsByClassName("answers");
var answerButtons = document.getElementsByClassName('button-answer');
var questionCounter = 0;
var userScore = 0;
var questionNumber = 0;
var userAnswer = "";
var count = 75;
var answerCheck = "";
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

function generateQuestion(interval) {
    var currentQuestion = myQuestions[questionCounter];
    const output = [];
    // we'll want to store the list of answer choices
    const answers = [];

    // and for each available answer...
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
            `<br><div class="question"> ${currentQuestion.question} </div>
    <div class="answers"> ${answers.join('')} </div>`
        );
        quizContainer.innerHTML = output.join('');
    }
    $('.answers').click(function(event) {
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
        userScore = count;
        console.log(count)
        clearInterval(interval)
        output.push(
            `<h1>All done!</h1>
                <p>Your score is ${userScore}</p>
            <form>
                
            <input type="text" id="username" value="Name"><br>
            <input type="submit" id="sub-btn" value="Submit">
            </form>`
        )
        quizContainer.innerHTML = output.join('');
        $('#sub-btn').click(function () {
            event.preventDefault();
            userTemp = document.getElementById('username').value;
            localStorage.setItem(userTemp, userScore);
            output.push(
                `<h1>High Score Board</h1>
                <div class="score-list"></div>`
            )
            scoreBoard.push(

            )
        })
    }

}



function buildQuiz() {
    startButton.style.visibility = 'hidden';
    count--;
    var interval = setInterval(function () {
        timerContainer.innerHTML = "Time: " + count;
        count--;
        if (count <= 0 ) {
            clearInterval(interval);
            alert("You're out of time!");
        }
    }, 1000);
    
  
    // for each question...
    console.log("building")
    generateQuestion(interval);
    
}

function checkAnswer(userAnswer){
    console.log(myQuestions[questionCounter].correctAnswer)
    if (String(userAnswer) === myQuestions[questionCounter].correctAnswer && questionCounter < 5) {
        console.log(myQuestions[questionCounter].correctAnswer)
        questionCounter++;
        questionNumber++;
        resultsContainer.innerHTML = 'Correct!';
        // userAnswer = "";
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

// display quiz right away


// on start, load quiz
startButton.addEventListener('click', buildQuiz);
// answerContainer.addEventListener('click', buton(event));
// function buton(event) {
//     var element = event.target
//     userAnswer = element.val;
//     checkAnswer();
// }
