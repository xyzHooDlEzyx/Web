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
let filteredZoos = [];
let zooId = 1;
let currentEditId = null;

const editModal = new bootstrap.Modal(document.getElementById("editModal"));
const editZooName = document.getElementById("edit-zoo-name");
const editVisitors = document.getElementById("edit-visitors");
const editAnimals = document.getElementById("edit-animals");
const saveEditButton = document.getElementById("save-edit-btn");

const editZoo = (id) => {
  const zooToEdit = zoos.find((zoo) => zoo.id === id);
  if (!zooToEdit) return;

  currentEditId = id;
  editZooName.value = zooToEdit.zoo;
  editVisitors.value = zooToEdit.visitors;
  editAnimals.value = zooToEdit.animals;

  editModal.show();
};

saveEditButton.addEventListener("click", () => {
  const zooIndex = zoos.findIndex((zoo) => zoo.id === currentEditId);
  if (zooIndex !== -1) {
    zoos[zooIndex].zoo = editZooName.value;
    zoos[zooIndex].visitors = parseInt(editVisitors.value, 10);
    zoos[zooIndex].animals = parseInt(editAnimals.value, 10);
    renderItemsList(zoos, editZoo, removeZoo);
    editModal.hide();
    updateSums(zoos);
  }
});

const removeZoo = (id) => {
  zoos = zoos.filter((zoo) => zoo.id !== id);
  renderItemsList(zoos, editZoo, removeZoo);
  updateSums(zoos);
};

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
  filteredZoos = zoos;
  addItemToPage(newZoo, editZoo, removeZoo);
  clearInput();
  updateSums(filteredZoos);
});

searchButton.addEventListener("click", () => {
  const query = searchInput.value.toLowerCase();
  filteredZoos = zoos.filter(
    (zoo) =>
      zoo.zoo.toLowerCase().includes(query) ||
      zoo.visitors.toString().includes(query) ||
      zoo.animals.toString().includes(query)
  );
  renderItemsList(filteredZoos, editZoo, removeZoo);
  updateSums(filteredZoos);
});

clearButton.addEventListener("click", () => {
  searchInput.value = "";
  filteredZoos = zoos;
  renderItemsList(zoos, editZoo, removeZoo);
  updateSums(filteredZoos);
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

  updateSums(filteredZoos);
});

sumAnimLink.addEventListener("click", () => {
  cardCreator.style.display = "none";
  sumVisCard.style.display = "none";
  sumAnimCard.style.display = "block";

  updateSums(filteredZoos);
});

const sortByVis = document.querySelector(".sort-visitors");
sortByVis.addEventListener("click", () => {
  filteredZoos.sort((a, b) => b.visitors - a.visitors);
  renderItemsList(filteredZoos, editZoo, removeZoo);
  updateSums(filteredZoos);
});

const sortByAnim = document.querySelector(".sort-animals");
sortByAnim.addEventListener("click", () => {
  filteredZoos.sort((a, b) => b.animals - a.animals);
  renderItemsList(filteredZoos, editZoo, removeZoo);
  updateSums(filteredZoos);
});
