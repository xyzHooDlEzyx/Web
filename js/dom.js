const EDIT_BUTTON_PREFIX = "edit-btn";
const REMOVE_BUTTON_PREFIX = "remove-btn";

const zooInput = document.getElementById("name-input");
const visitorsInput = document.getElementById("visitors-input");
const animInput = document.getElementById("number-anim-input");
const itemsContainer = document.getElementById("card-container");
const simVisTxt = document.getElementById("visitors-sum");
const simAnimTxt = document.getElementById("animals-sum");

const cardTemplate = ({ id, zoo, visitors, animals }) => `
<div id="${id}" class="card" style="width: 286px">
  <img src="img/pngwing.com.png" class="card-img-top" alt="Zoo image" />
  <div class="card-body">
    <h5 class="card-title">${zoo}</h5>
    <h6 class="card-title">Visitors per year</h6>
    <p class="card-text">${visitors}</p>
    <h6 class="card-title">Number of animals</h6>
    <p class="card-text">${animals}</p>
    <div class="card-controller">
      <button id="${EDIT_BUTTON_PREFIX}-${id}" class="btn btn-primary btn-width">
        Edit
      </button>
      <button id="${REMOVE_BUTTON_PREFIX}-${id}" class="btn btn-danger btn-width">
        Remove
      </button>
    </div>
  </div>
</div>`;

export const clearInput = () => {
  zooInput.value = "";
  visitorsInput.value = "";
  animInput.value = "";
};

export const addItemToPage = (
  { id, zoo, visitors, animals },
  onEditItem,
  onRemoveItem
) => {
  itemsContainer.insertAdjacentHTML(
    "afterbegin",
    cardTemplate({ id, zoo, visitors, animals })
  );

  const editButton = document.getElementById(`${EDIT_BUTTON_PREFIX}-${id}`);
  const removeButton = document.getElementById(`${REMOVE_BUTTON_PREFIX}-${id}`);

  editButton.addEventListener("click", () => onEditItem(id));
  removeButton.addEventListener("click", () => onRemoveItem(id));
};

export const renderItemsList = (items, onEditItem, onRemoveItem) => {
  itemsContainer.innerHTML = "";

  for (const item of items) {
    addItemToPage(item, onEditItem, onRemoveItem);
  }

  updateSums(items);
};

export const updateSums = (items) => {
  const totalVisitors = items.reduce((sum, zoo) => sum + zoo.visitors, 0);
  const totalAnimals = items.reduce((sum, zoo) => sum + zoo.animals, 0);

  simVisTxt.textContent = totalVisitors;
  simAnimTxt.textContent = totalAnimals;
};

export const getInputValues = () => {
  return {
    zoo: zooInput.value,
    visitors: visitorsInput.value,
    animals: animInput.value,
  };
};
