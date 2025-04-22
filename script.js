const userProgress = document.getElementById('userProgress');
const progressAmount = document.getElementById('progressAmount');
const correctAnswer = document.querySelectorAll('.correct-answer');

let userProgressionLevel = 0;
progressAmount.innerHTML = 0 + '%';

let addUserProgress = () => {
    if (userProgressionLevel < 100) {
        userProgressionLevel += 5;
        userProgress.style.width = userProgressionLevel + '%';
        progressAmount.innerHTML = userProgressionLevel + '%';
    } else if (userProgressionLevel == 100) {
        open("completion.html")
    }
}

correctAnswer.forEach(button => {
    button.addEventListener('click', addUserProgress);
});