let globalData;
const accumulatedScore = document.querySelector(".score");
const imageIcons = document.querySelectorAll(".item-icon");
const individualScore = document.querySelectorAll(".item-result .score");
const categories = document.querySelectorAll(".item-category");

async function fetchData() {
  try {
    const response = await fetch("/results-summary-component/data.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    globalData = await response.json();
    return globalData;
  } catch (error) {
    console.log("Fehler:", error);
  }
}

async function main() {
  await fetchData();
  if (globalData) {
    let category = globalData.map((item) => item.category);
    let score = globalData.map((item) => item.score);
    let icon = globalData.map((item) => item.icon);

    for (let i = 0; i < category.length; i++) {
      categories[i].innerText = category[i];
    }

    let result = 0;

    for (let i = 0; i < score.length; i++) {
      individualScore[i].innerText = score[i] + " ";
      result += score[i];
    }

    accumulatedScore.innerText = Math.floor(result / individualScore.length);

    for (let i = 0; i < icon.length; i++) {
      imageIcons[i].src = icon[i];
    }
  } else {
    console.log("globalData ist undefined");
  }
}

main();
