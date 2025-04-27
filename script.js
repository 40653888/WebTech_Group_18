/* Entire website - Jack */

const userProgress = document.getElementById('userProgress');
const progressAmount = document.getElementById('progressAmount');
const correctAnswer = document.querySelectorAll('.correct-answer');

let userProgressionLevel = 0;
let setAmount = 0;


const savedProgress = localStorage.getItem('userProgress');
if (savedProgress !== null) {
    userProgressionLevel = parseInt(savedProgress);
    userProgress.style.width = userProgressionLevel + '%';
    progressAmount.innerHTML = userProgressionLevel + '%';
} else {
    progressAmount.innerHTML = 0 + '%';
}

let addUserProgress = () => {
    if (userProgressionLevel < 100) {
        userProgressionLevel += setAmount;
        userProgress.style.width = userProgressionLevel + '%';
        progressAmount.innerHTML = userProgressionLevel + '%';

        localStorage.setItem('userProgress', userProgressionLevel);
    } else if (userProgressionLevel > 100) {
        userProgressionLevel = 100;
    } else if (userProgressionLevel == 100) {
        open("completion.html")
    }
}

correctAnswer.forEach(button => {
    button.addEventListener('click', addUserProgress);
});

/* Classical - Jack */

//const instrumentGuessOne = document.getElementById('classical-guess-one');
//const instrumentGuessTwo = document.getElementById('classical-guess-two');
//const instrumentGuessThree = document.getElementById('classical-guess-three');

const classicalQuizQuestion = document.querySelectorAll('.classical-quiz-options-container');

classicalQuizQuestion.forEach((questionContainer, index) => {
    const classicalBtns = questionContainer.querySelectorAll('button');

    const answeredQuestion = `has-answered-question-${index}`;
    const classicalQuestionAnswerId = `answer-id-${index}`;

    let answered = localStorage.getItem(answeredQuestion);

    if (answered === 'true') {
        classicalBtns.forEach(button => {
            button.disabled = true
        })
    }

    classicalBtns.forEach(button => {
        button.addEventListener('click', (event) => {
            if (answered) return;
            
            answered = true;
            
            const clicked = event.currentTarget;

            if (clicked.classList.contains('correct')) {
                clicked.classList.add('correct-answer');
                setAmount = 5;
                addUserProgress();
              
            } else {
                clicked.classList.add('incorrect-answer');
             
            }

            localStorage.setItem(answeredQuestion, 'true');
            localStorage.setItem(classicalQuestionAnswerId, clicked.id);

            classicalBtns.forEach(button => {
                button.disabled = true
            })
        });
    })
});

// 

/*
instrumentGuessOne.addEventListener('click', () => {
    if (!hasAnswered) {
        instrumentGuessOne.classList.add('incorrect-answer');
        hasAnswered = true;

        localStorage.setItem('classical-question-answered', 'true');
        localStorage.setItem('classical-answer', 'incorrect');
        localStorage.setItem('classical-selected-id', 'classical-guess-one');
    }
});

instrumentGuessTwo.addEventListener('click', () => {
    if (!hasAnswered) {
        instrumentGuessTwo.classList.add('incorrect-answer');
        hasAnswered = true;

        localStorage.setItem('classical-question-answered', 'true');
        localStorage.setItem('classical-answer', 'incorrect');
        localStorage.setItem('classical-selected-id', 'classical-guess-two');
    }
});

instrumentGuessThree.addEventListener('click', () => {
    if (!hasAnswered) {
        instrumentGuessThree.classList.add('correct-answer');
        setAmount = 5;
        addUserProgress();
        hasAnswered = true;

        localStorage.setItem('classical-question-answered', 'true');
        localStorage.setItem('classical-answer', 'correct');
        localStorage.setItem('classical-selected-id', 'classical-guess-three');
    }
});





/* Jazz - Matthew */

const jazz_quiz_questions = [
    {
        jazz_question: " What country of Origin did Jazz come from? ",
        jazz_options: ["United Kingdom", "Germany", "Russia", "America"],
        jazz_answers: "America"

    },
    {
        jazz_question: "example 2",
        jazz_options: [4, 5, 6],
        jazz_answers: "1"
    }
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
    if (currentJazzQuestionIndex == jazz_quiz_questions.length - 1) {
        alert("Quiz Complete, your score is: " + jazzcounter + "/" + jazz_quiz_questions.length);
        return;
    }
    currentJazzQuestionIndex = (currentJazzQuestionIndex + 1) % jazz_quiz_questions.length;
    displayJazzQuestion();
};

displayJazzQuestion();
