
import QuizEngine from '../src/QuizEngine.js';
import QuizQuestions from '../src/QuizQuestions.js';
import { mockQuizQuestions } from '../console_app/appQuestions.js';
import QuizEvents from '../src/QuizEvents.js';

document.addEventListener('DOMContentLoaded', function () {
  const quizQuestions = new QuizQuestions();
  mockQuizQuestions.forEach(question => quizQuestions.createAndAddQuestion(question));

  const quizEngine = new QuizEngine(quizQuestions, "Player1");
  quizEngine.initLocalStorage();

  const startButton = document.getElementById('start-button');
  const answerButtons = document.getElementById('answer-buttons');
  const questionElement = document.getElementById('question');
  const scoreElement = document.getElementById('score');
  const highscoreElement = document.getElementById('highscore');
  const summaryElement = document.getElementById('summary');

  startButton.addEventListener('click', () => {
    quizEngine.startQuiz();
    startButton.style.display = 'none';
  });


  quizEngine.on(QuizEvents.QUESTION, (questionData) => {
    questionElement.innerText = questionData.text;
    questionData.choices.forEach((choice, index) => {
      const choiceButton = document.createElement('button');
      choiceButton.innerText = choice;
      choiceButton.addEventListener('click', () => {
        quizEngine.answerQuestion(choice);
      });
      answerButtons.appendChild(choiceButton);
    });
  });

  quizEngine.on(QuizEvents.CORRECT, (playerData) => {
    answerButtons.replaceChildren();
    scoreElement.innerText = playerData.playerName + ': ' + playerData.score + ' points.';
    quizEngine.continueQuiz();
  });

  quizEngine.on(QuizEvents.FALSE, (playerData) => {
    answerButtons.replaceChildren();
    scoreElement.innerText = playerData.playerName + ': ' + playerData.score + ' points.';
    quizEngine.continueQuiz();
  })

  quizEngine.on(QuizEvents.DONE, async (playerData) => {
    answerButtons.replaceChildren();
    questionElement.innerText = "QUIZ DONE!";
    scoreElement.innerText = playerData.playerName + ': ' + playerData.score + ' points.';
    const highscore = await quizEngine.getHighScore();
    highscore.toArray().forEach((highscore) => {
      const pElement = document.createElement('p');
      pElement.innerText = highscore;
      highscoreElement.appendChild(pElement);
    })

    const summaryHeader = document.createElement('h1');
    summaryHeader.innerText = 'SUMMARY';
    summaryElement.appendChild(summaryHeader);
    const quizSummary = await quizEngine.getSummary();
    quizSummary.toArray().forEach((infoElement) => {
      const pElement = document.createElement('p');
      pElement.innerHTML = infoElement;
      summaryElement.appendChild(pElement);
    })
  })


});


