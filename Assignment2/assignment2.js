//TODO: Usage of bind, call and apply

// User object: Has username and keeps track of score history
function User(name) {
  this.username = name;
  this.scoreHistory = [];

  this.addScore = function (score) {
    this.scoreHistory.push(score);
  };
}

// Question object: Has question, options, and answer
function Question(question, options, answer) {
  this.question = question;
  this.options = options;
  this.answer = answer;

  this.checkAnswer = function (userAnswer) {
    return this.answer === userAnswer;
  };
}

// pairing difficulty to a word
let difficultyWord = { 1: "Easy", 2: "Medium", 3: "Hard" };

// Quiz object
const quiz = {
  currentScore: 0,
  storedQuestion: [],
  currentQuestion: null,
  questionNumber: 0,
  user: null,
  titleElement: null,
  scoreElement: null,
  difficulty: 1,

  async startQuiz() {
    this.started = true;
    this.currentScore = 0;
    await this.fetchQuestion("easy");
    this.user = new User(document.getElementById("name").value);
    this.titleElement = document.getElementById("title");
    this.scoreElement = document.getElementById("score");
    document.getElementById("start").remove();
    document.getElementById("quiz").style.display = "block";
    this.presentQuestion();
  },

  async fetchQuestion(difficulty) {
    // let apiURL = `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=multiple`;
    let apiURL = `https://opentdb.com/api.php?amount=1&difficulty=${difficulty}&type=multiple`;
    await fetch(apiURL)
      .then(async (response) => {
        //if error, then recursively recall the function after 5 seconds
        if (response.status == 429) {
          console.log("API limit reached. Retrying after 5 seconds...");
          await new Promise((resolve) => setTimeout(resolve, 2500)); // Wait for additional 2.5 seconds for 5 seconds total (after fetching answer)
          return this.fetchQuestion(difficulty); // Retry the request
        }
        return response.json();
      })
      .then((data) => {
        //if no data, then return since we are recursively calling the function on error
        if (!data || data.response_code == 5) {
          return;
        }
        data.results.forEach((question) => {
          let options = question.incorrect_answers.concat(
            question.correct_answer
          );
          options.sort(() => Math.random() - 0.5);
          this.storedQuestion.push(
            new Question(question.question, options, question.correct_answer)
          );
        });
      });
  },

  presentQuestion() {
    document.getElementById("answer").innerHTML = "";
    const questionNumber = document.getElementById("questionNumber");
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("choices");
    this.titleElement.innerHTML = `${this.user.username}`;
    this.scoreElement.innerHTML = `${this.currentScore}/${this.questionNumber}`;
    questionNumber.innerHTML = `Question ${this.questionNumber + 1} (${
      difficultyWord[this.difficulty]
    })`;
    this.currentQuestion = this.storedQuestion.pop();
    questionElement.innerHTML = this.currentQuestion.question;
    optionsElement.innerHTML = "";
    this.currentQuestion.options.forEach((option) => {
      const optionElement = document.createElement("button");
      optionElement.innerHTML = option;
      optionElement.addEventListener("click", () => {
        this.answerQuestion(option);
        // disable buttons after one is clicked
        document.querySelectorAll("button").forEach((button) => {
          button.disabled = true;
          button.classList.add("disabled");
          if (
            button.innerHTML === option &&
            this.currentQuestion.checkAnswer(option)
          ) {
            button.classList.add("true");
          } else if (button.innerHTML === option) {
            button.classList.add("false");
          }
        });
      });
      optionsElement.appendChild(optionElement);
    });
  },

  async answerQuestion(answer) {
    // document.getElementById("choices").innerHTML = "";
    document.getElementById(
      "answer"
    ).innerHTML = `Answer: ${this.currentQuestion.answer}`;
    // increase or decrease difficulty depending on correctness
    if (this.currentQuestion.checkAnswer(answer)) {
      this.currentScore++;
      this.difficulty = this.difficulty < 3 ? this.difficulty + 1 : 3;
    } else {
      this.difficulty = this.difficulty > 1 ? this.difficulty - 1 : 1;
    }
    this.questionNumber++;
    this.scoreElement.innerHTML = `${this.currentScore}/${this.questionNumber}`;
    console.log("fetching new question");
    await new Promise((resolve) => setTimeout(resolve, 2500)); // Wait for 2.5 seconds
    await this.fetchQuestion(difficultyWord[this.difficulty].toLowerCase());
    this.presentQuestion();
  },
};
