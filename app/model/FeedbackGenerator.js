/**
 * Represents a feedback generator.
 */
class FeedbackGenerator {
  #positiveFeedbackMessages;

  #negativeFeedbackMessages;

  constructor() {
    this.#positiveFeedbackMessages = [
      'Excellent work!',
      "You've got it!",
      'Brilliant!',
      'Spot on!',
      'Outstanding!',
      'Superb!',
      "You're a genius!",
      'Keep up the great work!',
      'Right on the mark!',
      'Top-notch!',
    ];
    this.#negativeFeedbackMessages = [
      'Oops! That was a tricky one.',
      'Hang in there.',
      "It's okay, everyone makes mistakes.",
      "Good try! Let's go for the next one.",
      'That was a tough question.',
      'Keep your chin up!',
      "You'll get it next time.",
      "Don't be discouraged.",
      'Remember, every mistake is a learning opportunity.',
      "Stay focused, and you'll get it.",
    ];
  }

  getRandomPositiveFeedbackMessage() {
    const randomIndex = Math.floor(Math.random() * this.#positiveFeedbackMessages.length);
    const randomMessage = this.#positiveFeedbackMessages[randomIndex];
    return randomMessage;
  }

  getRandomNegativeFeedbackMessage() {
    const randomIndex = Math.floor(Math.random() * this.#negativeFeedbackMessages.length);
    const randomMessage = this.#negativeFeedbackMessages[randomIndex];
    return randomMessage;
  }
}

export default FeedbackGenerator;