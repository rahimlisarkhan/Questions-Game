

let questionsData = {
    q1: {
        desc: "What color is the sky?",
        answers: ["Blue", "Yellow", "Green"],
        trueAnswer: "A"
    },
    q2: {
        desc: "What do you call people who are 18+ ?",
        answers: ["Baby", "Adult", "Person"],
        trueAnswer: "B"
    },
    q3: {
        desc: "What color is the tree?",
        answers: ["Red", "Brown", "Green"],
        trueAnswer: "C"
    },
    q4: {
        desc: "What do you call someone who has a wife?",
        answers: ["Wife", "Husband", "Married"],
        trueAnswer: "C"
    },
    q5: {
        desc: "Which is the most us level in English?",
        answers: ["B1", "C2", "A2"],
        trueAnswer: "B"
    }
}

class Question {
    //Encapsulation / private key
    #questionsPoint = document.querySelector('#questionsPoint')
    #questionsPointSpan = document.querySelector('#questionsPoint span')

    questionsButtons = document.querySelector('#questionsButtons')
    questionsHeader = document.querySelector('#questionsHeader')
    questionsList = document.querySelector('#questionsList')
    question = []
    point = 0
    nextQuestion = 0
    progressLine = 0

    constructor(question) {
        this.question = Object.values(question)
    }

    changeQuestion = () => {
        let questionTitle = document.querySelector('#questionTitle h1')
        let questionDesc = document.querySelector('#questionTitle p')
        let progressQuestion = document.querySelector('#progressQuestion .progress-bar')
        let questionNum = this.nextQuestion + 1
        let answers = this.question[this.nextQuestion] && this.question[this.nextQuestion].answers
        this.#questionsPointSpan.innerHTML = `Total point : ${this.point}%`


        if (!answers) {
            this.#reset() 
            return
        }

        questionTitle.innerHTML = `Question ${questionNum}`
        questionDesc.innerHTML = this.question[this.nextQuestion].desc
        progressQuestion.style = `width:calc(${this.progressLine}%)`

        this.questionsList.innerHTML = answers.map((answer, index) => `
            <div class="col">
                <div class="card" id="card${index}">
                    <div class="card-header h4  bg-dark text-white">
                        ${index === 0 ? 'A)' : ''} 
                        ${index === 1 ? 'B)' : ''} 
                        ${index === 2 ? 'C)' : ''} 
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item h5">${answer}</li>
                    </ul>
                </div>
            </div>   
        `)

    }

    answerQuestion = (event) => {

        let userChoice = event.key.toLowerCase()
        let trueAnswer = this.question[this.nextQuestion] && this.question[this.nextQuestion].trueAnswer.toLowerCase()
        let selectCardID


        if ('abc'.indexOf(userChoice) === -1) {
            return
        }

        if (userChoice === 'a') {
            selectCardID = 0
        } else if (userChoice === 'b') {
            selectCardID = 1
        } else if (userChoice === 'c') {
            selectCardID = 2
        }

        this.nextQuestion++
        this.progressLine += 100 / this.question.length

        if (userChoice === trueAnswer) {

            let successCard = document.querySelector(`#card${selectCardID} .h4`)
            successCard.classList.remove('bg-dark')
            successCard.classList.add('bg-success')

            this.point += 100 / this.question.length

            setTimeout(() => {
                this.changeQuestion()
            }, 700)
        } else {
            let wrongCard = document.querySelector(`#card${selectCardID} .h4`)
            wrongCard.classList.remove('bg-dark')
            wrongCard.classList.add('bg-danger')

            setTimeout(() => {
                this.changeQuestion()
            }, 700)
        }

    }

    #reset = () => {
        this.questionsHeader.classList.toggle('d-none')
        this.questionsList.classList.toggle('d-none')
        this.#questionsPoint.classList.toggle('d-none')
        this.questionsButtons.classList.toggle('d-none')
        this.point = 0
        this.nextQuestion = 0
        this.progressLine = 0
    }

    #randomQuestions = () => {
        let mixQuestionsCount = this.question.length - 1

        while (mixQuestionsCount) {
            let temp = this.question[0]
            this.question[0] = this.question[mixQuestionsCount]
            this.question[mixQuestionsCount] = temp
            mixQuestionsCount--
        }
    }

    runApp = () => {
        this.#randomQuestions()
        this.#reset()
        this.changeQuestion()
    }
}

let question = new Question(questionsData);


document.querySelector('#startButton').addEventListener('click', () => {
    question.runApp()
})

document.querySelector('#exitButton').addEventListener('click', () => {
    window.close()
})

window.onkeydown = question.answerQuestion