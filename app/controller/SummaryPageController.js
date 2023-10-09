import CustomEventEmitter from "./CustomEventEmitter.js"

class SummaryPageController extends CustomEventEmitter {
  #summarySection
  #chartContainer
  #redRecommendations
  #yellowRecommendations
  #allCorrectMessage
  #restartQuizButton
  #chartGenerator
  #cleanCodeChapters

  constructor(chartGenerator, cleanCodeChapters) {
    super();
    this.#summarySection = document.querySelector("#summary-section");
    this.#chartContainer = document.querySelector("#chart-container");
    this.#redRecommendations = document.querySelector("#red-recommendations");
    this.#yellowRecommendations = document.querySelector("#yellow-recommendations");
    this.#allCorrectMessage = document.querySelector("#all-correct-message");
    this.#restartQuizButton = document.querySelector("#restart-quiz-button");
    this.#chartGenerator = chartGenerator;
    this.#cleanCodeChapters = cleanCodeChapters;
    this.#initView();
  }

  #initView() {
    this.#summarySection.classList.add("centered-text");
    this.#restartQuizButton.textContent = "Restart quiz";
    this.#restartQuizButton.addEventListener("click", () => {
      this.emit("restartQuizButtonClicked", {});
    })
  }

  hideView() {
    this.#summarySection.classList.add("hide");
  }

  displayView() {
    this.#summarySection.classList.remove("hide");
  }

  generateSummary(categorySummaries) {
    const categories = categorySummaries.map(categorySummary => categorySummary.nameOfCategory);
    const scores = categorySummaries.map(categorySummary => categorySummary.percentageOfCorrectAnswers);
    const allRedCategories = categorySummaries.filter(categorySummary => categorySummary.percentageOfCorrectAnswers < 50);
    const allYellowCategories = categorySummaries.filter(categorySummary => categorySummary.percentageOfCorrectAnswers >= 50 && categorySummary.percentageOfCorrectAnswers <= 70);
    this.#displayReadingRecommendations(allRedCategories, allYellowCategories);
    this.#chartGenerator.generateChartJS(this.#chartContainer, scores, categories);
  }

  #displayReadingRecommendations(redCategories, yellowCategories) {
    this.#redRecommendations.replaceChildren();
    this.#yellowRecommendations.replaceChildren();
    this.#allCorrectMessage.replaceChildren();

    if (redCategories.length === 0 && yellowCategories.length === 0) {
      this.#displayAllCorrectMessage();
    }

    if (redCategories.length > 0) {
      this.#displayRedCategoryReadingRecommendations(redCategories);
    }

    if (yellowCategories.length > 0) {
      this.#displayYellowCategoryReadingRecommendations(yellowCategories);
    }
  }

  #displayAllCorrectMessage() {
    this.#allCorrectMessage.replaceChildren();
    const pElement = document.createElement("p");
    pElement.innerText = "Great job! It seems like you have a good grasp of the chapters!";
    this.#allCorrectMessage.appendChild(pElement);
  }


  #displayRedCategoryReadingRecommendations(redCategories) {
    const headerElement = document.createElement("h4");
    headerElement.innerText = "You really need to read up on these chapters: ";
    this.#redRecommendations.appendChild(headerElement);

    redCategories.forEach(categorySummary => {
      const pElement = document.createElement("p");
      const chapterNumber = parseInt(categorySummary.nameOfCategory.split(" ")[1]);
      const chapter = this.#cleanCodeChapters.findChapterByNumber(chapterNumber);
      console.log(chapter);

      if (chapter) {
        pElement.innerText = `${categorySummary.nameOfCategory}: Pages ${chapter.firstPage}-${chapter.lastPage}`;
      } else {
        pElement.innerText = `${categorySummary.nameOfCategory}: Page information not available.`;
      }
      this.#redRecommendations.appendChild(pElement);
    });
  }

  #displayYellowCategoryReadingRecommendations(yellowCategories) {
    const headerElement = document.createElement("h4");
    headerElement.innerText = "You probably should brush up on these chapter: ";
    this.#yellowRecommendations.appendChild(headerElement);

    yellowCategories.forEach(categorySummary => {
      const pElement = document.createElement("p");
      const chapterNumber = parseInt(categorySummary.nameOfCategory.split(" ")[1]);
      const chapter = this.#cleanCodeChapters.findChapterByNumber(chapterNumber);

      if (chapter) {
        pElement.innerText = `${categorySummary.nameOfCategory}: Pages ${chapter.firstPage}-${chapter.lastPage}`;
      } else {
        pElement.innerText = `${categorySummary.nameOfCategory}: Page information not available.`;
      }
      this.#yellowRecommendations.appendChild(pElement);
    })
  }
}

export default SummaryPageController;