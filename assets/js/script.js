// For this project I used this video as a guideline and inspiration https://www.youtube.com/watch?v=riDzcEQbX6k&t=497s

const playButton = document.getElementById('play-btn')
playButton.addEventListener('click', runGame)

const nextButton = document.getElementById('next-btn')
nextButton.addEventListener('click', () => {
    timeSecond = 15
    displayTime(timeSecond)
    currentQuestionIndex++
    setNextQuestion()
})
const questionContainerElement = document.getElementById('question')

const gameAnswersElement = document.getElementById('game-answers')
const questionElement = document.getElementById('question')

const scoreAreaElement = document.querySelectorAll('.scores')
for (let i = 0; i < scoreAreaElement.length; i++) {
    scoreAreaElement[i].classList.add('hidden')
}

const introContainer = document.getElementById('intro-container')
const gameContainer = document.getElementById('container')

const gameTimer = document.getElementById('timer')

const correctAnswer = document.getElementById('correct-answer')
const incorrectAnswer = document.getElementById('incorrect-answer')

let correctAnswers = 0; // for the score 
let incorrectAnswers = 0;

let shuffledQuestions, currentQuestionIndex

// function to get the game started
function runGame() {
    introContainer.classList.add('hidden')
    gameContainer.classList.remove('hidden')
    gameTimer.classList.remove('hidden')
    playButton.classList.add('hidden')
    nextButton.classList.remove('hidden')
    questionContainerElement.classList.remove('hidden')
    gameAnswersElement.classList.remove('hidden')
    for (let i = 0; i < scoreAreaElement.length; i++) {
        scoreAreaElement[i].classList.remove('hidden') // for loop to remove hidden class from the score
    }
    // shuffles the questions and gives out a random one 
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    setNextQuestion(shuffledQuestions, currentQuestionIndex)
    const countDown = setInterval(() => {
        timeSecond--; // 15 seconds timer
        displayTime(timeSecond);
        if (timeSecond <= 0 || timeSecond < 1) {
            endTime();
            clearInterval(countDown)
        }
    }, 1000)
}


// function to set the next question 
function setNextQuestion(question, index) {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}
// Function to show answers for question 
function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        gameAnswersElement.appendChild(button)
    })
}
// function to select the correct/wrong answers with score tracking at the bottm
function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    if (correct) {
        correctAnswers++
    } else {
        incorrectAnswers++;

        if (incorrectAnswers === 5) {
            gameOver()
        }
    }
    correctAnswer.innerHTML = `${correctAnswers}`
    incorrectAnswer.innerHTML = `${incorrectAnswers}`


    setStatusClass(document.body, correct)
    Array.from(gameAnswersElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
        nextButton.classList.remove('hidden')
    })
}

// sets green for correct and red for wrong answer
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}
// clears the function above 
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

// function to reset the answers of the game
function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hidden')
    while (gameAnswersElement.firstChild) {
        gameAnswersElement.removeChild(gameAnswersElement.firstChild)
    }
}
/* Timer 
 * I used this video as a guideline for creating my timer https://www.youtube.com/watch?v=_a4XCarxwr8&t=66s
 */
const timer = document.getElementById('timer')
let timeSecond = 15;

displayTime(timeSecond)

function displayTime(second) {
    const sec = Math.floor(second % 60);
    timer.innerHTML = `${sec}`
}

function endTime() {
    timer.innerHTML = 'Game Over You lost! Better luck next time?'
    gameOver()
}

function stopTime() {
    clearInterval(countDown);
}

function gameOver() {
    gameContainer.classList.add('hidden')
    gameTimer.classList.remove('hidden')
    playButton.classList.remove('hidden')
    nextButton.classList.remove('hidden')
    questionContainerElement.classList.add('hidden')
    gameAnswersElement.classList.add('hidden')
    for (let i = 0; i < scoreAreaElement.length; i++) {
        scoreAreaElement[i].classList.remove('hidden') // for loop to remove hidden class from the score
    }
}

// Questions for the game 
const questions = [{
        question: 'What year did batman first appear?',
        answers: [{
                text: '1939',
                correct: true
            },
            {
                text: '1962',
                correct: false
            },
            {
                text: '1800',
                correct: false
            },
            {
                text: '1980',
                correct: false
            }
        ]
    },
    {
        question: 'Who played Batman in Batman Begins(2005)?',
        answers: [{
                text: 'Hugh Jackman',
                correct: false
            },
            {
                text: 'George Clooney',
                correct: false
            },
            {
                text: 'Christian Bale',
                correct: true
            },
            {
                text: 'Brad Pitt',
                correct: false
            }
        ]
    },
    {
        question: 'Who is the Best Batman?',
        answers: [{
                text: 'Christian Bale',
                correct: false
            },
            {
                text: 'Ben Affleck',
                correct: true
            },
            {
                text: 'Michael Keaton',
                correct: false
            },
            {
                text: 'Robert Pattison',
                correct: false
            }
        ]
    },
    {
        question: 'What year did the Joker first appear?',
        answers: [{
                text: '1990',
                correct: false
            },
            {
                text: '1940',
                correct: true
            },
            {
                text: '1937',
                correct: false
            },
            {
                text: '1984',
                correct: false
            }
        ]
    },
    {
        question: 'Who is not a Batman Villian?',
        answers: [{
                text: 'Killer Croc',
                correct: false
            },
            {
                text: 'Scorpion',
                correct: true
            },
            {
                text: 'Calender Man',
                correct: false
            },
            {
                text: 'Man Bat',
                correct: false
            }
        ]
    },
    {
        question: 'Who played Riddler in The Batman(2022)',
        answers: [{
                text: 'Cillian Murphy',
                correct: false
            },
            {
                text: 'Brendan Gleeson',
                correct: false
            },
            {
                text: 'Jim Carey',
                correct: false
            },
            {
                text: 'Paul Dano',
                correct: true
            }
        ]
    },
    {
        question: 'Who played Joker in Batman(1989)',
        answers: [{
                text: 'Kevin Costner',
                correct: false
            },
            {
                text: 'Heath Ledger',
                correct: false
            },
            {
                text: 'Jack Nicholson',
                correct: true
            },
            {
                text: 'Vin Diesel',
                correct: false
            }
        ]
    },
    {
        question: 'Who played Catwoman in The Dark Knight Rises(2012) ',
        answers: [{
                text: 'Anne Hathaway',
                correct: true
            },
            {
                text: 'Margot Robbie',
                correct: false
            },
            {
                text: 'Zoë Kravitz',
                correct: false
            },
            {
                text: 'Michelle Pfeiffer',
                correct: false
            }
        ]
    },
    {
        question: 'Who played Mr Freeze in Batman & Robin?',
        answers: [{
                text: 'Liam Neeson',
                correct: false
            },
            {
                text: 'Arnold Schwarzenegger',
                correct: true
            },
            {
                text: 'Brendan Fraser',
                correct: false
            },
            {
                text: 'Tom Hanks',
                correct: false
            }
        ]
    },
    {
        question: 'Who is the best Robin?',
        answers: [{
                text: 'Jason Todd',
                correct: false
            },
            {
                text: 'Dick',
                correct: false
            },
            {
                text: 'Tim',
                correct: true
            },
            {
                text: 'Damian',
                correct: false
            }
        ]
    },
    {
        question: 'Which villan isnt in The Dark Knight?',
        answers: [{
                text: 'Joker',
                correct: false
            },
            {
                text: 'Two-Face',
                correct: false
            },
            {
                text: 'Scarecrow',
                correct: false
            },
            {
                text: 'The Penguin',
                correct: true
            }
        ]
    },
    {
        question: 'What rapper had a cameo role in Batman & Robin (1997)?',
        answers: [{
                text: 'Snoop Dogg',
                correct: false
            },
            {
                text: '50 Cent',
                correct: false
            },
            {
                text: 'Coolio',
                correct: true
            },
            {
                text: 'Common',
                correct: false
            }
        ]
    },
    {
        question: 'In what movie did Ben Affleck first play the role of Batman?',
        answers: [{
                text: 'Batman Begins',
                correct: false
            },
            {
                text: 'Batman vs Superman',
                correct: true
            },
            {
                text: 'The Batman',
                correct: false
            },
            {
                text: 'Batman Returns',
                correct: false
            }
        ]
    },
    {
        question: 'Who played the Penguin in Batman Returns?',
        answers: [{
                text: 'Dany Devito',
                correct: true
            },
            {
                text: 'Colin Farrell',
                correct: false
            },
            {
                text: 'Robin Lord Taylor',
                correct: false
            },
            {
                text: 'Tom Hardy',
                correct: false
            }
        ]
    },
    {
        question: 'Terry McGinnis is the lead character in which 2000 animated Batman movie?',
        answers: [{
                text: 'Batman: Hush',
                correct: false
            },
            {
                text: 'Batman: Under the Red Hood',
                correct: false
            },
            {
                text: 'Batman Beyond: Return of the Joker',
                correct: true
            },
            {
                text: 'Batman: The killing joke',
                correct: false
            }
        ]
    },
    {
        question: 'Which Batman movie was set at Christmas?',
        answers: [{
                text: 'Batman Forever',
                correct: false
            },
            {
                text: 'Batman Begins',
                correct: false
            },
            {
                text: 'Batman Returns ',
                correct: true
            },
            {
                text: 'The Batman',
                correct: false
            }
        ]
    },
    {
        question: 'What is the name of the light which Commissioner Gordon uses to call Batman for help?',
        answers: [{
                text: 'The Batsignal',
                correct: true
            },
            {
                text: 'The Batlamp',
                correct: false
            },
            {
                text: 'The Batlight',
                correct: false
            },
            {
                text: 'The Batsign',
                correct: false
            }
        ]
    },
    {
        question: 'In which movie did the Batwing first appear?',
        answers: [{
                text: 'The Batman',
                correct: false
            },
            {
                text: 'Batman: Death in the Family',
                correct: false
            },
            {
                text: 'Batman Forever',
                correct: false
            },
            {
                text: 'Batman',
                correct: true
            }
        ]
    },
    {
        question: 'What doesnt kill you just make you?',
        answers: [{
                text: 'Stronger',
                correct: false
            },
            {
                text: 'Stranger',
                correct: true
            },
            {
                text: 'Better',
                correct: false
            },
            {
                text: 'Braver',
                correct: false
            }
        ]
    },
    {
        question: 'What is Commissioner Gordons first name?',
        answers: [{
                text: 'John',
                correct: false
            },
            {
                text: 'Mike',
                correct: false
            },
            {
                text: 'James',
                correct: true
            },
            {
                text: 'Rick',
                correct: false
            }
        ]
    },
    {
        question: 'Who killed Nightwing in Injustice?',
        answers: [{
                text: 'Batman',
                correct: false
            },
            {
                text: 'Damian',
                correct: true
            },
            {
                text: 'Joker',
                correct: false
            },
            {
                text: 'Harley Quinn',
                correct: false
            }
        ]
    },
    {
        question: 'Which nightclub is ownded by the Penguin?',
        answers: [{
                text: 'The Monarch ',
                correct: false
            },
            {
                text: 'The Lazarus Pits',
                correct: false
            },
            {
                text: 'Bludhaven',
                correct: false
            },
            {
                text: 'The Iceberg Lounge',
                correct: true
            }
        ]
    },
    {
        question: 'Who directed Batman (1989)?',
        answers: [{
                text: 'Steven Spielberg',
                correct: false
            },
            {
                text: 'Tim Burton',
                correct: true
            },
            {
                text: 'Quentin Tarantino',
                correct: false
            },
            {
                text: 'Michael Bay',
                correct: false
            }
        ]
    },
    {
        question: 'What colour is the Riddlers costume',
        answers: [{
                text: 'Orange',
                correct: false
            },
            {
                text: 'Black',
                correct: false
            },
            {
                text: 'Green',
                correct: true
            },
            {
                text: 'Red',
                correct: false
            }
        ]
    },
    {
        question: 'Whos not in the Justice League?',
        answers: [{
                text: 'Ant Man',
                correct: true
            },
            {
                text: 'The Flash',
                correct: false
            },
            {
                text: 'Martian Manhunter',
                correct: false
            },
            {
                text: 'Green Arrow',
                correct: false
            }
        ]
    },
    {
        question: 'What is the name of the hospital prison featured in the Batman movies?',
        answers: [{
                text: 'Alcatraz',
                correct: false
            },
            {
                text: 'The Raft',
                correct: false
            },
            {
                text: 'Black Gate',
                correct: false
            },
            {
                text: 'Arkham Asylum',
                correct: true
            }
        ]
    },
    {
        question: 'What is the Prison called in Gotham?',
        answers: [{
                text: 'Arkham',
                correct: false
            },
            {
                text: 'White Row',
                correct: false
            },
            {
                text: 'Black Gate',
                correct: true
            },
            {
                text: 'The Raft',
                correct: false
            }
        ]
    },
    {
        question: 'Which of these is the title of a Batman movie?',
        answers: [{
                text: 'Batman: Hush',
                correct: true
            },
            {
                text: 'Batman: Whisper',
                correct: false
            },
            {
                text: 'Batman: silence',
                correct: false
            },
            {
                text: 'Batman Screams',
                correct: false
            }
        ]
    },
    {
        question: 'Who really was Hush?',
        answers: [{
                text: 'Thomas Elliot',
                correct: false
            },
            {
                text: 'Bane',
                correct: false
            },
            {
                text: 'Scarecrow',
                correct: false
            },
            {
                text: 'The Riddler',
                correct: true
            }
        ]
    },
    {
        question: 'who is a Batman Villian?',
        answers: [{
                text: 'Dead Guy',
                correct: false
            },
            {
                text: 'Dead Bang',
                correct: false
            },
            {
                text: 'Dead Shot',
                correct: true
            },
            {
                text: 'Dead Fall',
                correct: false
            }
        ]
    }
]