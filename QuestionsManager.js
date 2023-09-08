/** Class that manages the questions. Ordering, current index and correctness of answer. */
class QuestionsManager {
  #questionBank;
  #currentIndex;
  #allQuestions;

  /**
   * Constructs a QuestionManager object
   * @param {QuestionBank} questionBankObject - The question bank containing Questions.
   */
  constructor (questionBankObject) {
    this.#questionBank = questionBankObject;
    this.#allQuestions = questionBankObject.getAllQuestions();
    this.#currentIndex = 0;
  }

  /**
   * Setter that validates the questionBankObject.
   *
   * @memberof QuestionsManager
   */
  set questionBank(questionBankObject) {
    if (!questionBankObject instanceof QuestionBank) {
      throw new TypeError("Argument must be an QuestionBank instance.");
    }
    if (!questionBankObject.hasQuestions()) {
      throw new TypeError("Question bank cannot be empty. Add some questions to the question bank");
    }
    this.#questionBank = questionBankObject;
  }

  /**
   * Method for checking if there is atleast one more question based on the current index.
   * 
   * @returns {boolean} indicating if there are any more questions.
   */
  hasMoreQuestions() {
    return this.#currentIndex + 1 < this.#allQuestions.length;
  }

  /**
   * Method for getting the first question.
   * 
   * @returns {Question} The first Question in #allQuestions.
   */
  getFirstQuestion() {
    return this.#allQuestions[0];
  }

  /**
   * Method for advancing the currentIndex one step and returning
   * the Question at the new index.
   * 
   * @returns {Question} - The Question object at the new index. 
   */
  getNextQuestion() {
    if (this.hasMoreQuestions()) {
      this.#currentIndex++;
      return this.#allQuestions[this.#currentIndex];
    }
  }

  /**
   * Method for checking if the answer input is correct.
   * 
   * @param {Number} answerInput - The user choice, corresponding with one of the choices of the current question.
   * @returns {boolean} - Indicating if the awnserInput is correct or not.
   */
  isAnswerCorrect(answerInput) {
    if (typeof answerInput !== "number") {
      throw new TypeError("The index of choice for answerQuestion must be a number.");
    }

    const currentQuestion = this.#allQuestions[this.#currentIndex];
    
    if (answerInput < 0 || answerInput >= currentQuestion.choices.length) {
      throw new RangeError("The index of the choice is out of range.");
    }

    return answerInput === currentQuestion.correctChoiceIndex;
  }

  /**
   * A method used for randomizing the order of #allQuestions.
   */
  randomizeQuestions() {
    // Fisher-yates shuffle algorithm
    for (let i = this.#allQuestions.length -1; i > this.#allQuestions.length; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [this.#allQuestions[i], this.#allQuestions[randomIndex]] = [this.#allQuestions[randomIndex], this.#allQuestions[i]];
    }
  }

  /**
   * Method for resetting the currentIndex and order of #allQuestions.
   */
  reset() {
    this.#currentIndex = 0;
    this.#allQuestions = [...this.#questionBank.getAllQuestions()];
  }
  
}

export default QuestionsManager;