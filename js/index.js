import {
  addItemToPage,
  clearInput,
  renderItemsList,
  getInputValues,
  updateSums,
} from "./dom.js";

const createButton = document.getElementById("create-btn");
const searchButton = document.getElementById("search-btn");
const clearButton = document.getElementById("clear-btn");
const searchInput = document.getElementById("search-input");

let zoos = [];
let zooId = 1;

createButton.addEventListener("click", (event) => {
  event.preventDefault();

  const { zoo, visitors, animals } = getInputValues();

  if (!zoo || !visitors || !animals) {
    return;
  }

  const newZoo = {
    id: zooId++,
    zoo,
    visitors: parseInt(visitors, 10),
    animals: parseInt(animals, 10),
  };

  zoos.push(newZoo);
  addItemToPage(newZoo);
  clearInput();
  updateSums(zoos);
});

searchButton.addEventListener("click", () => {
  const query = searchInput.value.toLowerCase();
  const filteredZoos = zoos.filter(
    (zoo) =>
      zoo.zoo.toLowerCase().includes(query) ||
      zoo.visitors.toString().includes(query) ||
      zoo.animals.toString().includes(query)
  );
  renderItemsList(filteredZoos);
  updateSums(filteredZoos);
});

clearButton.addEventListener("click", () => {
  searchInput.value = "";
  renderItemsList(zoos);
  updateSums(zoos);
});

const createPageLink = document.querySelector(".create-page");
const cardCreator = document.querySelector(".card-creator");

const sumVisLink = document.querySelector(".sum-vis");
const sumVisCard = document.querySelector(".sum-visitor");

const sumAnimLink = document.querySelector(".sum-anim");
const sumAnimCard = document.querySelector(".sum-animals");

createPageLink.addEventListener("click", () => {
  cardCreator.style.display = "block";
  sumVisCard.style.display = "none";
  sumAnimCard.style.display = "none";
});

sumVisLink.addEventListener("click", () => {
  cardCreator.style.display = "none";
  sumVisCard.style.display = "block";
  sumAnimCard.style.display = "none";

  updateSums(zoos);
});

sumAnimLink.addEventListener("click", () => {
  cardCreator.style.display = "none";
  sumVisCard.style.display = "none";
  sumAnimCard.style.display = "block";

  updateSums(zoos);
});

const sortByVis = document.querySelector(".sort-visitors");
sortByVis.addEventListener("click", () => {
  zoos.sort((a, b) => b.visitors - a.visitors);
  renderItemsList(zoos);

  updateSums(zoos);
});

const sortByAnim = document.querySelector(".sort-animals");
sortByAnim.addEventListener("click", () => {
  zoos.sort((a, b) => b.animals - a.animals);
  renderItemsList(zoos);

  updateSums(zoos);
});
