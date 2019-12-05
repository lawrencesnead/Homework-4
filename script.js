const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const timerContainer = document.getElementById('timer');
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



  function buildQuiz(){
    var count = 75;
    var interval = setInterval(function(){
        timerContainer.innerHTML="Time: "+count;
        count--;
        if (count === 0){
            clearInterval(interval);
            alert("You're out of time!");
        }
    }, 1000);
    
    
    // we'll need a place to store the HTML output
    const output = [];
  
    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {
  
        // we'll want to store the list of answer choices
        const answers = [];
  
        // and for each available answer...
        for(letter in currentQuestion.answers){
  
          // ...add an HTML button
          answers.push(
            `<label>
              <button name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
              </button>
            </label>`
          );
        }
  
        // add this question and its answers to the output
        output.push(
          `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join('')} </div>`
        );
      }
    );
  
    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
}

function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');
  
    // keep track of user's answers
    var numCorrect = 0;
  
    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {
  
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = 'input[name=question'+questionNumber+']:checked';
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
      // if answer is correct
      if(userAnswer===currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;
  
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });
  
    // show number of correct answers out of total
    resultsContainer.innerHTML = numCorrect + ' out of ' + myQuestions.length;
  }

// display quiz right away


// on start, load quiz
submitButton.addEventListener('click', buildQuiz());