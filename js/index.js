import {
  addItemToPage,
  clearInput,
  renderItemsList,
  getInputValues,
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
});

clearButton.addEventListener("click", () => {
  searchInput.value = "";
  renderItemsList(zoos);
});

const createPageLink = document.querySelector(".create-page");
const cardCreator = document.querySelector(".card-creator");

const sumVisLink = document.querySelector(".sum-vis");
const sumVisCard = document.querySelector(".sum-visitor");
const simVisTxt = document.getElementById("visitors-sum");

const sumAnimLink = document.querySelector(".sum-anim");
const sumAnimCard = document.querySelector(".sum-animals");
const simAnimTxt = document.getElementById("animals-sum");

createPageLink.addEventListener("click", () => {
  cardCreator.style.display = "block";
  sumVisCard.style.display = "none";
  sumAnimCard.style.display = "none";
});

sumVisLink.addEventListener("click", () => {
  cardCreator.style.display = "none";
  sumVisCard.style.display = "block";
  sumAnimCard.style.display = "none";

  const totalVisitors = zoos.reduce((sum, zoo) => sum + zoo.visitors, 0);
  simVisTxt.textContent = totalVisitors;
});

sumAnimLink.addEventListener("click", () => {
  cardCreator.style.display = "none";
  sumVisCard.style.display = "none";
  sumAnimCard.style.display = "block";

  const totalAnimals = zoos.reduce((sum, zoo) => sum + zoo.animals, 0);
  simAnimTxt.textContent = totalAnimals;
});

const sortByVis = document.querySelector(".sort-visitors");
sortByVis.addEventListener("click", () => {
  zoos.sort((a, b) => b.visitors - a.visitors);
  renderItemsList(zoos);
});

const sortByAnim = document.querySelector(".sort-animals");
sortByAnim.addEventListener("click", () => {
  zoos.sort((a, b) => b.animals - a.animals);
  renderItemsList(zoos);
});
