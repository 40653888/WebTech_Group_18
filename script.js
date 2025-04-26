const userProgress = document.getElementById('userProgress');
const progressAmount = document.getElementById('progressAmount');
const correctAnswer = document.querySelectorAll('.correct-answer');

let userProgressionLevel = 0;
progressAmount.innerHTML = '0%';

let addUserProgress = () => {
    const quizCompleted = localStorage.getItem("quiz_completed");

    if (quizCompleted == "true") {
        alert("You have already completed the quiz, in order to achieve progress, visit the other pages in the navigation bar.");
        return;
    }


    if (userProgressionLevel < 100) {
        userProgressionLevel += 5;
        userProgress.style.width = userProgressionLevel + '%';
        progressAmount.innerHTML = userProgressionLevel + '%';

        /* Storing User Progress */
        localStorage.setItem("progress", userProgressionLevel);
    } else if (userProgressionLevel == 100) {
        open("completion.html")
    }
};

/* Retrieve Local saved progression*/
/* Will need tweaked for variable names/ rewritten to suit*/

window.onload = () => {
    const savedProgress = localStorage.getItem("progress");
    const quizCompleted = localStorage.getItem("quiz_completed");

    if (savedProgress) {
        userProgressionLevel = parseInt(savedProgress, 10);
        userProgress.style.width = userProgressionLevel + '%';
        progressAmount.innerHTML = userProgressionLevel + '%';
    } else {
        userProgressionLevel = 0;
        userProgress.style.width = userProgressionLevel + '%';
        progressAmount.innerHTML = userProgressionLevel + '%';
    }
    if (quizCompleted == "true") {
    alert("You have already completed the quiz, visit another page to make progression.");
    document.getElementById("jazzoptions").style.pointerEvents = "none";
    document.getElementById("next").disabled = true;
    }
}


correctAnswer.forEach(button => {
    button.addEventListener('click', addUserProgress);
});


/* Jazz QuizBox Section */
const jazz_quiz_questions = [

    {
        jazz_question: " Where was Jazz founded? ",
        jazz_options: ["New Orleans", "New York", "Florida", "Africa"],
        jazz_answers: "New Orleans",

    },
    {
        jazz_question: " Which family will you find the Trumpet? ",
        jazz_options: ["Wind", "Precussion", "Brass", "String"],
        jazz_answers: "Brass"
    },
    {
        jazz_question: " Which of these is a jazz concept? ",
        jazz_options: ["Syncopation", "Improvisation", "Polyrythms", "All of the above"],
        jazz_answers: "All of the above"
    },
    {
        jazz_question: " Who of the following is a jazz pioneer? ",
        jazz_options: ["Buddy Bolden", "Claude Debussy", "Wolfgang Amadeus Mozart", "Johann Sebastian Bach"],
        jazz_answers: "Buddy Bolden"
    },
    {
        jazz_question: " Which of the following is not a jazz subgenre? ",
        jazz_options: ["Swing", "Latin Jazz", "Sonata", "BeBop"],
        jazz_answers: "Sonata"
    },
];

let jazzcounter = 0;
let currentJazzQuestionIndex = 0;
let jazzanswer = []

function displayJazzQuestion(){
    const jazz_questionElement = document.getElementById("jazzquestions");
    const jazz_optionsElement = document.getElementById("jazzoptions");



    const currentJazzQuestion = jazz_quiz_questions[currentJazzQuestionIndex];
    jazz_questionElement.textContent = currentJazzQuestion.jazz_question;
    jazz_optionsElement.innerHTML = "";

    currentJazzQuestion.jazz_options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => {
            if (jazzanswer.includes(currentJazzQuestionIndex)) {
                alert("You have Already answered this question.");
                return;
            }
            if (option == currentJazzQuestion.jazz_answers) {
                jazzcounter++; 
                document.getElementById("jazzcounter").textContent = "Score: " + jazzcounter + "/5";
                alert("Correct!");
            } else {
                alert("Incorrect!");
            }
            
            jazzanswer.push(currentJazzQuestionIndex);
        };
        jazz_optionsElement.appendChild(button);
    });
}

document.getElementById("next").onclick = () => {
    const quizCompleted = localStorage.getItem("quiz_completed");
    if (quizCompleted == "true") {
        alert("You have already completed the quiz");
        return;
    }

    if (currentJazzQuestionIndex == jazz_quiz_questions.length - 1) {
        alert("Quiz Complete, your score is: " + jazzcounter + "/" + jazz_quiz_questions.length);
        if (jazzcounter == jazz_quiz_questions.length) {
            userProgressionLevel = Math.min(userProgressionLevel + 25, 100);
            userProgress.style.width = userProgressionLevel + '%';
            progressAmount.innerHTML = userProgressionLevel + '%';

            /* Storing User Progress */
            localStorage.setItem("progress", userProgressionLevel);
            localStorage.setItem("quiz_completed", true);


        }
        return;
    }
    currentJazzQuestionIndex = (currentJazzQuestionIndex + 1) % jazz_quiz_questions.length;
    displayJazzQuestion();
};

document.getElementById("restart").addEventListener("click", function() {
    alert("Quiz Reset");
    
    location.reload();
});

displayJazzQuestion();

/* End Of Jazz Quiz Section */
/* End Of Jazz Quiz Section */


