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
        image: "images/chuck.png",
        videoId: "Y-9Y4CCIWnM",
        start: 0,
        end: 15
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
        image: "Images/freddy.png",
        videoId: "vbvyNnw8Qjg",
        start: 63,
        end: 78
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
    }
];

// youtube video player
let player;
let ready = false;

// Called by the YouTube API once it's loaded
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: questions[0].videoId,
        playerVars: {
            autoplay: 0,
            controls: 0,
            // hide annotations
            iv_load_policy: 3,
            // no YouTube logo
            modestbranding: 1,
            // no related videos
            rel: 0
        },
        events: {
            onReady () {
                ready = true;
            }
        }
    });
}

// toggle play/pause via youtube api
const playBtn = document.getElementById('playPause');

playBtn.addEventListener('click', () => {
    const state = player.getPlayerState();   // current YT state

    if (state === YT.PlayerState.PLAYING) {  // ⬅ already playing
        player.pauseVideo();
    } else {                                 // ⬅ paused / cued / ended
        player.playVideo();
    }
});



let score = 0;
let index = 0;

function loadQuestion() {

    const quiz = document.getElementById("quiz");
    const options = document.getElementById("options");
    const q = document.getElementById("question");
    const img = document.getElementById("image");

    //
    if (index === questions.length) {
        quiz.style.display = "none";
        document.getElementById('results').hidden = false;
        return;
    }

    // get question from arr
    const question = questions[index];

    // a bit confusing, basically sets question element text
    q.innerHTML = question.question;

    // set question image
    img.src = question.image;

    // clear previous buttons
    options.innerHTML = "";

    // load the video
    player.cueVideoById({
        videoId: question.videoId,
        startSeconds: question.start || 0,
        endSeconds: question.end || undefined
    });

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

                //TODO: integrate with global progress
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

    const rightCol = document.getElementById("column-right");
    // decide of right part of quiz markup is needed
    const hasVideo = !!question.videoId;
    const hasImage = !!question.image;

    if (!hasVideo && !hasImage) {
        // Hide the whole column and make sure nothing is playing
        rightCol.hidden = true;
        player.stopVideo?.();
        return;
    }
    // Show the column
    rightCol.hidden = false;
}
// start the quiz
document.getElementById("start-button").addEventListener("click", () => {

    // player not ready yet
    if (!ready) {
        alert("The video player is still loading — please try again in a second!");
        return;
    }

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