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
    return await response.json();
  } catch (error) {
    console.log("Fehler:", error);
    return null; // Rückgabe von null, wenn ein Fehler auftritt
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
