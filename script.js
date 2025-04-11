

// Selecting the main list container and the check button
const listContainer = document.querySelector("#draggable-list");
const checkBtn = document.querySelector(".check-now-button");

// List of peaceful countries (in correct order)
const peacefulCountries = [
  "Iceland",
  "Denmark",
  "New Zealand",
  "Ireland",
  "Nepal",
  "Austria",
  "Singapore",
  "Portugal",
  "Slovenia",
  "Japan",
  "Switzerland",
];

// This array stores the <li> items for later reference
const listItemsStoredArray = [];

// Creates a shuffled version of the peacefulCountries list and displays it on the page
function createList() {
  [...peacefulCountries]
    .map((country) => ({ countryName: country, sort: Math.random() })) // Add a random sort value
    .sort((a, b) => a.sort - b.sort) // Shuffle array
    .map((country) => country.countryName) // Extract just the name
    .forEach((country, index) => {
      // Create an <li> element for each country
      const list = document.createElement("li");
      list.setAttribute("data-index", index);
      list.innerHTML = `
        <span>${index + 1}</span>
        <div class="dragitem-div" draggable="true">
          <p>${country}</p>
        </div>
      `;
      listItemsStoredArray.push(list);
      listContainer.appendChild(list);
    });
}

createList();

let startIndex; // To store the index of the dragged item

// Swaps two list items in the DOM
function swaplistItem(firstIndex, secondIndex) {
  const [dragList, dropList] = [
    listItemsStoredArray[firstIndex],
    listItemsStoredArray[secondIndex],
  ];
  const [dragDiv, dropDiv] = [
    dragList.querySelector(".dragitem-div"),
    dropList.querySelector(".dragitem-div"),
  ];
  dragList.appendChild(dropDiv);
  dropList.appendChild(dragDiv);
}

// Handles drag and drop functionality
function dragAndDrop() {
  const dragStart = (e) => {
    startIndex = +e.currentTarget.closest("li").getAttribute("data-index");
  
  };

  const drag = () => {};
  const dragenter = () => {};
  const dragleave = () => {};
  
  const dragover = (e) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const drop = (e) => {
    e.preventDefault();
    const dropIndex = +e.currentTarget.closest("li").getAttribute("data-index");
    swaplistItem(startIndex, dropIndex);
  };

  // Add drag/drop event listeners to all draggable divs
  const divList = document.querySelectorAll(".dragitem-div");
  divList.forEach((div) => {
    div.addEventListener("dragstart", dragStart);
    div.addEventListener("drag", drag);
    div.addEventListener("dragleave", dragleave);
    div.addEventListener("dragenter", dragenter);
    div.addEventListener("dragover", dragover);
    div.addEventListener("drop", drop);
  });
}

dragAndDrop();

// Handles the check button click: compares current order with the correct one
checkBtn.addEventListener("click", () => {
  const allDiv = document.querySelectorAll(".dragitem-div");
  allDiv.forEach((item, index) => {
    const displayedNameList = item.querySelector("p").textContent.trim();
    const orginalNameList = peacefulCountries[index];
    
    if (displayedNameList === orginalNameList) {
      item.classList.add("right");
      item.classList.remove("wrong");
    } else {
      item.classList.add("wrong");
      item.classList.remove("right");
    }
  });
});
