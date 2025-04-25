const questions = [
    {
        question: "What song is this rock & roll riff from?",
        options: [
            "Johnny B. Goode",
            "Jailhouse Rock",
            "Great Balls of Fire",
            "Blue Suede Shoes"
        ],
        answer: "Johnny B. Goode",
        hint: "It’s about a boy who could ‘play the guitar just like ringing a bell.’",
        fact: "Chuck Berry’s “Johnny B. Goode” is considered the blueprint for rock guitar. Released in 1958, it features energetic riffs and a story mirroring Berry’s own rise — it even became the only rock song included on NASA’s Voyager Golden Record, sent into space as a message to alien life.",
        videoId: "YOUR_CLIP_ID_1"
    },
    {
        question: "Whose voice is singing this iconic line?",
        options: [
            "Freddie Mercury",
            "Mick Jagger",
            "Robert Plant",
            "Jim Morrison"
        ],
        answer: "Freddie Mercury",
        hint: "He was the frontman of a band famous for songs like ‘We Will Rock You.’",
        fact: "Freddie Mercury, lead singer of Queen, was known for his four-octave vocal range. “Bohemian Rhapsody” showcased his operatic and rock skills in one song, redefining what a rock band could sound like.",
        videoId: "YOUR_CLIP_ID_2"
    },
    {
        question: "Which of these is a typical Rock & Roll fashion from the 1950s?",
        options: [
            "Leather jackets and slicked hair",
            "Tie-dye and flares",
            "Glitter suits and makeup",
            "Tracksuits and gold chains"
        ],
        answer: "Leather jackets and slicked hair",
        hint: "This style was inspired by biker gangs and Hollywood rebels.",
        fact: "The 1950s rock scene brought with it the “greaser” look — slick hair with pomade, cuffed jeans, boots, and black leather jackets. It symbolized teenage rebellion, coolness, and anti-establishment energy — the fashion became as iconic as the music itself.",
        videoId: "YOUR_CLIP_ID_3"
    },
    {
        question: "Who said, “If you tried to give rock and roll another name, you might call it Chuck Berry”?",
        options: [
            "John Lennon",
            "Elvis Presley",
            "Bob Dylan",
            "Brian May"
        ],
        answer: "John Lennon",
        hint: "He was a Beatle, and a huge Berry fan.",
        fact: "John Lennon saw Chuck Berry as the true father of rock & roll. Lennon once said, “He was writing good lyrics and intelligent lyrics in the '50s when people were singing ‘Oh baby I love you so.’” His admiration influenced much of the early Beatles’ guitar-driven sound.",
        videoId: "YOUR_CLIP_ID_4"
    },
    {
        question: "Which musical innovation had the biggest impact on shaping the sound of 1960s–70s electric rock music?",
        options: [
            "Guitar amplifier with distortion",
            "Auto-Tune vocal effects",
            "Headphones",
            "Sheet music"
        ],
        answer: "Guitar amplifier with distortion",
        hint: "It helped create the gritty, powerful sound that defined artists like Hendrix and The Who.",
        fact: "The guitar amplifier with distortion changed rock forever. By pushing amps beyond their limits, artists like Jimi Hendrix, Pete Townshend, and Eric Clapton unlocked raw, aggressive tones that gave birth to hard rock and metal. Distortion wasn’t a flaw — it became the sound of rebellion.",
        videoId: "YOUR_CLIP_ID_5"
    }
];

let score = 0;
let index = 0;

function loadQuestion() {

    const quiz = document.getElementById("quiz");
    const options = document.getElementById("options");
    const q = document.getElementById("question");

    //
    if (index === questions.length) {
        quiz.style.display = "none";
        alert("You won!");
        return;
    }

    // get question from arr
    const question = questions[index];

    // a bit confusing, basically sets question element text
    q.innerHTML = question.question;

    // clear previous buttons
    options.innerHTML = "";

    // create button for each option
    question.options.forEach(option => {

        const button = document.createElement("button");

        // add button to options element
        options.appendChild(button);

        //set text
        button.textContent = option;

        button.addEventListener("click", () => {

            // check if option button holds is answer
            if (option === question.answer) {

                // display fact
                alert(question.fact);

                // increment score
                score++;
                addUserProgress();

                // move index
                index++;

                // recursively go to next question
                loadQuestion();

            } else {

                // show hint
                alert(question.hint);

                // disable button if not the answer
                button.disabled = true;

            }
        })
    })
}
// start the quiz
document.getElementById("start-button").addEventListener("click", () => {

    const quiz = document.getElementById("quiz");

    // Show the quiz
    quiz.style.display = "flex";

    // Scroll it into view smoothly
    quiz.scrollIntoView({ behavior: 'smooth' });

    // reset index to start from question 1
    index = 0;

    // reset score too
    score = 0;
    loadQuestion();
});