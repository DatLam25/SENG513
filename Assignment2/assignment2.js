function User(name){
    this.username = name;
    this.scoreHistory = [];

    this.addScore = function(score){
        this.scoreHistory.push(score);
    };

    this.getScores = function(){ 
        return this.score;
    };
};

function Question(question, options, answer){
    this.question = question;
    this.options = options;
    this.answer = answer;

    this.checkAnswer = function(userAnswer){
        return this.answer === userAnswer;
    };
};

const Quiz = {
    questions: [],
    currentScore: 0,
    currentQuestion: 0,
    started: false,

    startQuiz(){
        this.started = true;
        this.currentScore = 0;
        this.currentQuestion = 0;
    },

    presentQuestion(){
        return this.questions[this.currentQuestion];
    },

    answerQuestion(answer){
        if(this.questions[this.currentQuestion].checkAnswer(answer)){
            this.currentScore++;
        }
        this.currentQuestion++;
    },
};