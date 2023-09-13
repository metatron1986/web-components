let globalData;
const accumulatedScore = document.querySelector(".score");
const imageIcons = document.querySelectorAll(".item-icon");
const individualScore = document.querySelectorAll(".item-result .score");
const categories = document.querySelectorAll(".item-category");

async function fetchData() {
  try {
    const response = await fetch(
      "https://metatron1986.github.io/web-components/results-summary-component/data.json"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!data) {
      throw new Error("Received null or undefined data");
    }
    return data;
  } catch (error) {
    console.log("Fehler:", error);
    return null;
  }
}

async function main() {
  globalData = await fetchData();
  if (!globalData) {
    console.log("globalData ist undefined");
    return;
  }

  let result = 0;

  globalData.forEach((item, index) => {
    categories[index].innerText = item.category;
    individualScore[index].innerText = item.score + " ";
    imageIcons[index].src = item.icon;
    result += item.score;
  });

  accumulatedScore.innerText = Math.floor(result / individualScore.length);
}

main();
