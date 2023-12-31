import QuestionResult from '../src/QuestionResult.js';
import QuizCategorySummary from '../src/QuizCategorySummary.js';
import QuizResult from '../src/QuizResult.js';
import Question from '../src/Question.js';
import InvalidPlayerNameError from '../src/errors/InvalidPlayerNameError.js';
import InvalidScoreTypeError from '../src/errors/InvalidScoreTypeError.js';
import InvalidQuestionResultTypeError from '../src/errors/InvalidQuestionResultTypeError.js';


describe('QuizResult class', () => {

  let quizResult;

  beforeEach(() => {
    quizResult = new QuizResult("TestPerson", 0);
  });

  describe('constructor()', () => {
    it('creates an instance with valid arguments', () => {
      expect(quizResult).toBeDefined();
      expect(quizResult.score).toBe(0);
    });

    describe('Error handling', () => {
      it('throws InvalidPlayerNameError with invalid name', () => {
        expect(() => new QuizResult(2, 10)).toThrow(InvalidPlayerNameError);
        expect(() => new QuizResult("", 10)).toThrow(InvalidPlayerNameError);
      });

      it('throws InvalidScoreTypeError with invalid score', () => {
        expect(() => new QuizResult("TestPerson", "10")).toThrow(InvalidScoreTypeError);
        expect(() => new QuizResult("TestPerson", "Not a number")).toThrow(InvalidScoreTypeError);
      });
    });
  });

  describe('addQuestionResult()', () => {
    it('adds a QuestionResult to questionResults', () => {
      const questionResultObjects = generateQuestionResultObjects();
      questionResultObjects.forEach(questionResult => {
        quizResult.addQuestionResult(questionResult);
      });
      expect(quizResult.questionResults).toStrictEqual(questionResultObjects);
    });

    it('throws error with invalid QuestionResult', () => {
      expect(() => quizResult.addQuestionResult("Not a QuestionResult object")).toThrow(InvalidQuestionResultTypeError);
      expect(() => quizResult.addQuestionResult({})).toThrow(InvalidQuestionResultTypeError);
    });
  });

  describe('generateSummary()', () => {
    beforeEach(() => {
      const resultsObjects = generateQuestionResultObjects();
      resultsObjects.forEach(result => quizResult.addQuestionResult(result));
    });

    it('generates a correct summary', () => {
      const quizResultSummary = quizResult.generateSummary();
      const categorySummaries = quizResultSummary.allCategorySummaries;
      const findCategorySummary = (categoryName) => categorySummaries.find(summary => summary.nameOfCategory === categoryName);

      expect(findCategorySummary("Category1")).toStrictEqual(new QuizCategorySummary("Category1", 3, 2));
      expect(findCategorySummary("Category2")).toStrictEqual(new QuizCategorySummary("Category2", 3, 1));
      expect(findCategorySummary("Category3")).toStrictEqual(new QuizCategorySummary("Category3", 4, 0));
    });
  });

  describe('incrementScore()', () => {
    it('increments the score', () => {
      quizResult.incrementScore(10);
      expect(quizResult.score).toBe(10);
      quizResult.incrementScore(5);
      expect(quizResult.score).toBe(15);
    });

    it('throws InvalidScoreTypeError with invalid score increment', () => {
      expect(() => quizResult.incrementScore(undefined)).toThrow(InvalidScoreTypeError);
      expect(() => quizResult.incrementScore("not a number")).toThrow(InvalidScoreTypeError);
    });
  });
  
});

const generateQuestionResultsForCategory = (category, count, correctAnswerIndex) => {
  const allQuestionResults = [];
  for (let i = 0; i < count; i++) {
    const correctAnswer = correctAnswerIndex.includes(i);
    const question = new Question({
      text: "TestResult",
      choices: ["Choice1", "Choice2", "Choice3"],
      correctChoice: "Choice1",
      category: category
    });
    const selectedChoice = correctAnswer ? "Choice1" : "Choice2";
    const questionResult = new QuestionResult(question, selectedChoice);
    allQuestionResults.push(questionResult)
  }
  return allQuestionResults;
}


const generateQuestionResultObjects = () => {
  // 10 objects - 3 categories
  // category 1: 3 entries, 2 correct
  // category 2: 3 entries, 1 correct
  // category 4: 4 entries, 0 correct
  const allQuestionResultObjects = [];

  // Category 1
  allQuestionResultObjects.push(...generateQuestionResultsForCategory("Category1", 3, [0, 1]));
  // Category 2
  allQuestionResultObjects.push(...generateQuestionResultsForCategory("Category2", 3, [1]));
  // Category 3
  allQuestionResultObjects.push(...generateQuestionResultsForCategory("Category3", 4, []));

  return allQuestionResultObjects;
}