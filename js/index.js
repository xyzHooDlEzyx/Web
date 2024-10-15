import {
  addItemToPage,
  clearInput,
  renderItemsList,
  getInputValues,
  updateSums,
} from "./dom.js";

const API_URL = "http://localhost:8080/zoos";
const SEARCH_URL = "http://localhost:8080/zoos/search";

const createButton = document.getElementById("create-btn");
const searchButton = document.getElementById("search-btn");
const clearButton = document.getElementById("clear-btn");
const searchInput = document.getElementById("search-input");

let zoos = [];
let filteredZoos = [];
let currentEditId = null;

const editModal = new bootstrap.Modal(document.getElementById("editModal"));
const editZooName = document.getElementById("edit-zoo-name");
const editVisitors = document.getElementById("edit-visitors");
const editAnimals = document.getElementById("edit-animals");
const saveEditButton = document.getElementById("save-edit-btn");

async function fetchZoos() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    zoos = data;
    filteredZoos = zoos;
    renderItemsList(filteredZoos, editZoo, removeZoo);
    updateSums(filteredZoos);
  } catch (error) {
    console.error("Error fetching zoos:", error);
  }
}

async function searchAndSortZoos(search = "", sort = "asc") {
  try {
    const response = await fetch(`${SEARCH_URL}?search=${search}&sort=${sort}`);
    const data = await response.json();
    filteredZoos = data;
    renderItemsList(filteredZoos, editZoo, removeZoo);
    updateSums(filteredZoos);
  } catch (error) {
    console.error("Error searching/sorting zoos:", error);
  }
}

const editZoo = (id) => {
  const zooToEdit = zoos.find((zoo) => zoo.id === id);
  if (!zooToEdit) return;

  currentEditId = id;
  editZooName.value = zooToEdit.zoo;
  editVisitors.value = zooToEdit.visitors;
  editAnimals.value = zooToEdit.animals;

  editModal.show();
};

saveEditButton.addEventListener("click", async () => {
  const updatedZoo = {
    zooName: editZooName.value,
    visitors: parseInt(editVisitors.value, 10),
    animals: parseInt(editAnimals.value, 10),
  };

  const existingZoo = zoos.find(
    (names) => names.zoo.toLowerCase() === editZooName.value.toLowerCase()
  );
  if (existingZoo && existingZoo.id !== currentEditId) {
    alert("A zoo with this name already exists! Please choose another name.");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${currentEditId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedZoo),
    });
    await response.json();
    fetchZoos();
    editModal.hide();
  } catch (error) {
    console.error("Error updating zoo:", error);
  }
});

const removeZoo = async (id) => {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchZoos();
  } catch (error) {
    console.error("Error deleting zoo:", error);
  }
};

createButton.addEventListener("click", async (event) => {
  event.preventDefault();

  const { zoo, visitors, animals } = getInputValues();

  if (!zoo || !visitors || !animals) {
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        zooName: zoo,
        visitors: parseInt(visitors, 10),
        animals: parseInt(animals, 10),
      }),
    });
    console.log(response);
    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    fetchZoos();
    clearInput();
  } catch (error) {
    console.error("Error creating zoo:", error);
  }
});

searchButton.addEventListener("click", () => {
  const query = searchInput.value.toLowerCase();
  searchAndSortZoos(query);
});

const sortByAlphabetDesc = document.querySelector(".sort-alph-desc");
sortByAlphabetDesc.addEventListener("click", () => {
  searchAndSortZoos("", "desc");
});

const sortByAlphabetAsc = document.querySelector(".sort-alph-asc");
sortByAlphabetAsc.addEventListener("click", () => {
  searchAndSortZoos("", "asc");
});

clearButton.addEventListener("click", () => {
  searchInput.value = "";
  fetchZoos();
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

fetchZoos();
