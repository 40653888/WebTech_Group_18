

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
