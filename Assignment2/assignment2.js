//TODO: Usage of bind, call and apply

// User object: Has username and keeps track of score history
//TODO: Keep track of user score (the game reset if user get 3 wrong answers?)
function User(name){
    this.username = name;
    this.scoreHistory = [];

    this.addScore = function(score){
        this.scoreHistory.push(score);
    };
};

// Question object: Has question, options, and answer
function Question(question, options, answer){
    this.question = question;
    this.options = options;
    this.answer = answer;

    this.checkAnswer = function(userAnswer){
        return this.answer === userAnswer;
    };
};


// Quiz object
const quiz = {
    currentScore: 0,
    storedQuestion: [],
    currentQuestion: null,
    questionNumber: 0,
    user: null,
    titleElement: null,

    async startQuiz(){
        this.started = true;
        this.currentScore = 0;
        await this.fetchQuestion("easy");
        this.user = new User(document.getElementById('name').value);
        this.titleElement = document.getElementById('title');
        document.getElementById("start").remove();
        document.getElementById("quiz").style.display = "block";
        this.presentQuestion();
        
    },

    async fetchQuestion (difficulty){
        // Fetching 10 questions at a time to avoid timeout
        let apiURL = `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=multiple`;
        await fetch(apiURL).then(response => response.json()).then(data => {
            if(data.response_code == 5){
                //TODO: Error Handling (API limit reached: There is a 5 second timeout after each request)
                console.log("API limit reached");
                return;
            }
            data.results.forEach((question) => {
                let options = question.incorrect_answers.concat(question.correct_answer);
                options.sort(() => Math.random() - 0.5);
                this.storedQuestion.push(new Question(question.question, options, question.correct_answer));
            });
        });
    },

    presentQuestion(){
        const questionNumber = document.getElementById('questionNumber');
        const questionElement = document.getElementById('question');
        const optionsElement = document.getElementById('choices');
        this.titleElement.innerHTML = `${this.user.username}: ${this.currentScore}`;
        questionNumber.innerHTML = `Question ${this.questionNumber + 1}`;
        this.currentQuestion = this.storedQuestion.pop();
        questionElement.innerHTML = this.currentQuestion.question;
        

        optionsElement.innerHTML = '';
        this.currentQuestion.options.forEach((option) => {
            const optionElement = document.createElement('button');
            optionElement.innerHTML = option;
            optionElement.addEventListener('click', () => {
                this.answerQuestion(option);
            });
            optionsElement.appendChild(optionElement);
        });
    },

    async answerQuestion(answer){
        document.getElementById('choices').innerHTML = '';
        if(this.currentQuestion.checkAnswer(answer)){
            this.currentScore++;
        }
        this.questionNumber++;
        if(this.storedQuestion.length <= 0){
            console.log("fetching new question")
            await this.fetchQuestion("easy");
            this.presentQuestion();
        }
        else{
            console.log("Presenting new question")
            this.presentQuestion();
        }
    },
};
