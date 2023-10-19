import Question from '../src/Question.js';
import QuestionResult from '../src/QuestionResult.js';
import InvalidQuestionError from '../src/errors/InvalidQuestionError.js';
import InvalidQuestionChoiceError from '../src/errors/InvalidQuestionChoiceError.js';

describe("QuestionResult class", () => {

  describe ("constructor()", () => {
    const question = new Question({ text: "Is water wet?", choices: ["Yes", "No"], correctChoice: "Yes"});

    it("should initializes successfully", () => {
      const result = new QuestionResult(question, "Yes");
      expect(result.wasCorrect).toBe(true);
      const result2 = new QuestionResult(question, "No");
      expect(result2.wasCorrect).toBe(false);
    });
  
    it("should throw error on invalid argument", () => {
      expect(() => new QuestionResult("Not a question", "Yes")).toThrow(InvalidQuestionError);
      expect(() => new QuestionResult(question, 2)).toThrow(InvalidQuestionChoiceError);
      expect(() => new QuestionResult(question, "")).toThrow(InvalidQuestionChoiceError);
      expect(() => new QuestionResult(question, "D")).toThrow(InvalidQuestionChoiceError);
    });
    
  })
})