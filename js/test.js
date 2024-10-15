// import {
//   addItemToPage,
//   clearInput,
//   renderItemsList,
//   getInputValues,
//   updateSums,
// } from "./dom.js";

// const API_URL = "http://localhost:8080/zoos";

// const createButton = document.getElementById("create-btn");
// const searchButton = document.getElementById("search-btn");
// const clearButton = document.getElementById("clear-btn");
// const searchInput = document.getElementById("search-input");

// let zoos = [];
// let filteredZoos = [];
// let currentEditId = null;

// const editModal = new bootstrap.Modal(document.getElementById("editModal"));
// const editZooName = document.getElementById("edit-zoo-name");
// const editVisitors = document.getElementById("edit-visitors");
// const editAnimals = document.getElementById("edit-animals");
// const saveEditButton = document.getElementById("save-edit-btn");

// // Fetch zoos from the backend API
// async function fetchZoos() {
//   try {
//     const response = await fetch(API_URL);
//     const data = await response.json();
//     zoos = data;
//     filteredZoos = zoos;
//     renderItemsList(zoos, editZoo, removeZoo);
//     updateSums(zoos);
//   } catch (error) {
//     console.error("Error fetching zoos:", error);
//   }
// }

// // Edit zoo - Opens the modal with current zoo data
// const editZoo = (id) => {
//   const zooToEdit = zoos.find((zoo) => zoo.id === id);
//   if (!zooToEdit) return;

//   currentEditId = id;
//   editZooName.value = zooToEdit.zoo;
//   editVisitors.value = zooToEdit.visitors;
//   editAnimals.value = zooToEdit.animals;

//   editModal.show();
// };

// // Save changes to an edited zoo (PUT request)
// saveEditButton.addEventListener("click", async () => {
//   const updatedZoo = {
//     zooName: editZooName.value,
//     visitors: parseInt(editVisitors.value, 10),
//     animals: parseInt(editAnimals.value, 10),
//   };

//   // Check for duplicate names
//   const existingZoo = zoos.find(
//     (names) => names.zoo.toLowerCase() === editZooName.value.toLowerCase()
//   );
//   if (existingZoo && existingZoo.id !== currentEditId) {
//     alert("A zoo with this name already exists! Please choose another name.");
//     return;
//   }

//   // Update zoo on the server
//   try {
//     const response = await fetch(`${API_URL}/${currentEditId}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(updatedZoo),
//     });
//     await response.json();
//     fetchZoos(); // Refresh zoo list after update
//     editModal.hide();
//   } catch (error) {
//     console.error("Error updating zoo:", error);
//   }
// });

// // Remove a zoo (DELETE request)
// const removeZoo = async (id) => {
//   try {
//     await fetch(`${API_URL}/${id}`, { method: "DELETE" });
//     fetchZoos(); // Refresh zoo list after deletion
//   } catch (error) {
//     console.error("Error deleting zoo:", error);
//   }
// };

// // Create a new zoo (POST request)
// createButton.addEventListener("click", async (event) => {
//   event.preventDefault();

//   const { zoo, visitors, animals } = getInputValues();

//   const existingZoo = zoos.find(
//     (names) => names.zoo.toLowerCase() === zoo.toLowerCase()
//   );
//   if (existingZoo) {
//     alert("A zoo with this name already exists! Please choose another name.");
//     return;
//   }

//   if (!zoo || !visitors || !animals) {
//     alert("Please fill out all fields.");
//     return;
//   }

//   const newZoo = {
//     zooName: zoo,
//     visitors: parseInt(visitors, 10),
//     animals: parseInt(animals, 10),
//   };

//   try {
//     const response = await fetch(API_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newZoo),
//     });
//     await response.json();
//     fetchZoos(); // Refresh zoo list after creation
//     clearInput();
//   } catch (error) {
//     console.error("Error creating zoo:", error);
//   }
// });

// // Search for zoos
// searchButton.addEventListener("click", () => {
//   const query = searchInput.value.toLowerCase();
//   filteredZoos = zoos.filter(
//     (zoo) =>
//       zoo.zoo.toLowerCase().includes(query) ||
//       zoo.visitors.toString().includes(query) ||
//       zoo.animals.toString().includes(query)
//   );

//   renderItemsList(filteredZoos, editZoo, removeZoo);
//   updateSums(filteredZoos);
// });

// // Clear search
// clearButton.addEventListener("click", () => {
//   searchInput.value = "";
//   filteredZoos = zoos;
//   renderItemsList(zoos, editZoo, removeZoo);
//   updateSums(filteredZoos);
// });

// // Other event listeners (e.g., for sorting and toggling views)
// const createPageLink = document.querySelector(".create-page");
// const cardCreator = document.querySelector(".card-creator");

// const sumVisLink = document.querySelector(".sum-vis");
// const sumVisCard = document.querySelector(".sum-visitor");

// const sumAnimLink = document.querySelector(".sum-anim");
// const sumAnimCard = document.querySelector(".sum-animals");

// createPageLink.addEventListener("click", () => {
//   cardCreator.style.display = "block";
//   sumVisCard.style.display = "none";
//   sumAnimCard.style.display = "none";
// });

// sumVisLink.addEventListener("click", () => {
//   cardCreator.style.display = "none";
//   sumVisCard.style.display = "block";
//   sumAnimCard.style.display = "none";
//   updateSums(filteredZoos);
// });

// sumAnimLink.addEventListener("click", () => {
//   cardCreator.style.display = "none";
//   sumVisCard.style.display = "none";
//   sumAnimCard.style.display = "block";
//   updateSums(filteredZoos);
// });

// const sortByVis = document.querySelector(".sort-visitors");
// sortByVis.addEventListener("click", () => {
//   filteredZoos.sort((a, b) => b.visitors - a.visitors);
//   renderItemsList(filteredZoos, editZoo, removeZoo);
//   updateSums(filteredZoos);
// });

// const sortByAnim = document.querySelector(".sort-animals");
// sortByAnim.addEventListener("click", () => {
//   filteredZoos.sort((a, b) => b.animals - a.animals);
//   renderItemsList(filteredZoos, editZoo, removeZoo);
//   updateSums(filteredZoos);
// });

// // Fetch initial zoos when the page loads
// fetchZoos();
