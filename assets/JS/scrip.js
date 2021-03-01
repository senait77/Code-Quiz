var timeEl = document.getElementById("countdown");
var time = 20;
var questionContainerEl = document.getElementById("question-container");
var questionEl = document.getElementById("question");
var answerButtonEl = document.getElementById("answer-buttons");
var startButtonEl = document.getElementById("start-btn");
var nextButtonEl = document.getElementById("next-btn");
var curQuestion = 0;
var timer;
var timeEl = document.getElementById("time");
var score = 5;



// start button 
startButtonEl.addEventListener('click', start);



function start() {
    timer = setInterval(countDown, 1000);
    startButtonEl.classList.add("hide");
    questionContainerEl.classList.remove("hide");

    showQuestion();

}



function countDown() {

    time--;
    timeEl.innerText = `time: ${time}`

    console.log(time);
    if (time <= 0) {
        clearInterval(timer);
       endQuiz();
    }

}

function submitAnswer() {
    let answer = this.dataset.correct;

    if (answer == "false") {
        time--;
        score--;

        document.getElementById("response").innerText = "Wrong!";

        setTimeout(() => {
            curQuestion++
            showQuestion()
            }, 1000)

    }
    if (answer == "true") {
        
        document.getElementById("response").innerText = "Correct!";
        score++

        setTimeout(() => {
            curQuestion++
            showQuestion()
            }, 1000)
    }
    
    

    
}


function showQuestion() {
    document.getElementById("response").innerText = "";
    let question = questions[curQuestion]
    questionEl.innerText = question.question
    answerButtonEl.innerHTML = "";
    for (var i = 0; i < question.answers.length; i++) {
        let newButton = document.createElement("BUTTON");
        newButton.className = "btn";
    
        newButton.dataset.correct = question.answers[i].correct;
        newButton.dataset.answer = questions[curQuestion].answers[i];
        newButton.innerText = question.answers[i].text;
        newButton.addEventListener('click', submitAnswer);
        answerButtonEl.appendChild(newButton);

    }


    

}

function endQuiz() {
    answerButtonEl.innerHTML = "";
    questionEl.innerText = "You are all DONE! put ur initals here and submit!";
    var newTextField = document.createElement("input");
    newTextField.id = "initiaField";
    var submit = document.createElement("button") ;
    submit.id = "submit";

    submit.addEventListener('click', saveScore);
    questionEl.appendChild(newTextField);
    questionEl.appendChild(submit);
}

function saveScore() {
    var name = document.getElementById("initiaField").value;
    var leaderBoard = JSON.parse(localStorage.getItem('leaderBoard'));
    
    leaderBoard = [name, score]
    
    localStorage.setItem('leaderBoard', JSON.stringify(leaderBoard));

    
}


var questions = [
    {
        question: "What does DOM stands for? ",
        answers: [
            { text: 'Document Object Model', correct: true },
            { text: 'Document Orgainzation Model', correct: false },
            { text: 'Document Object method', correct: false },
            { text: 'Document Objection Model', correct: false }

        ]
    },

    {
        question: "Which one of the following is NOT a type of data structure? ",
        answers: [
            { text: 'Array', correct: false },
            { text: 'Object', correct: false },
            { text: 'Method', correct: true}
            

        ]
    },

    

    {
        question: "is CSS a computer language? ",
        answers: [
            { text: 'No', correct: true },
            { text: 'Yes', correct: false }
            
            

        ]
    },


    {
        question: " what is the value of an ID?  ",
        answers: [
            { text: 'undefined', correct: false },
            { text: 'Has a value of one', correct: true },
            { text: 'Has a value of two', correct: false },
            { text: 'Has a value od Null', correct: false }

        ]
    }


]


