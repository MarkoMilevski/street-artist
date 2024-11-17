import { items } from "../../data/db.js";
import {
  createDropdownOption,
  getPublishedItems,
  populateItemTypes,
} from "../utils/global.js";
import { renderArtCards } from "../pages/visitor-listing-page/renderArtCards.js";
import { fetchUsers } from "../utils/renderArtistOptions.js";

const artistCards = document.querySelector("#artistCards");
const filterButton = document.querySelector(".filterButton");
const applyFilter = document.querySelector("#applyFilter");
const filterPanel = document.querySelector("#filterPanel");
const closeFilterPanel = document.querySelector("#closeFilterPanel");
const publishedItems = getPublishedItems(items);

let isFilterPanelOpened = false;
export function toggleFilterPanel() {
  isFilterPanelOpened = !isFilterPanelOpened;

  if (isFilterPanelOpened) {
    artistCards.innerHTML = "";
    filterPanel.style.display = "block";
    populateItemTypes();
    populateArtist();
  } else {
    renderArtCards(publishedItems);
    filterPanel.style.display = "none";
  }

  filterButton.style.display = isFilterPanelOpened ? "none" : "block";
}

function getFilterValues() {
  const titleInput = document.querySelector("#itemTitle");
  const sortByArtist = document.querySelector("#sortByArtist");
  const minPrice = document.querySelector("#minPrice");
  const maxPrice = document.querySelector("#maxPrice");
  const sortByType = document.querySelector("#sortByType");

  return {
    title: titleInput.value.toLowerCase(),
    artist: sortByArtist.value,
    minPrice: +minPrice.value,
    maxPrice: +maxPrice.value,
    type: sortByType.value,
  };
}

function filterItems() {
  const { title, artist, minPrice, maxPrice, type } = getFilterValues();

  const titleLowerCase = title.toLowerCase();
  const filteredItems = publishedItems.filter((item) => {
    return (
      (title ? item.title.toLowerCase().includes(titleLowerCase) : true) &&
      (artist ? item.artist === artist : true) &&
      (minPrice ? item.price >= minPrice : true) &&
      (maxPrice ? item.price <= maxPrice : true) &&
      (type ? item.type === type : true)
    );
  });

  renderArtCards(filteredItems);
  filterPanel.style.display = "none";
  filterButton.style.display = "block";
}

function populateArtist() {
  const sortByArtist = document.querySelector("#sortByArtist");
  sortByArtist.innerHTML = "";
  const chooseOption = createDropdownOption();

  sortByArtist.appendChild(chooseOption);

  fetchUsers(sortByArtist);
}

applyFilter.addEventListener("click", filterItems);
filterButton.addEventListener("click", toggleFilterPanel);
closeFilterPanel.addEventListener("click", toggleFilterPanel);
