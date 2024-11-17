import { renderHeaderArtistPage } from "../../layout/renderHeaderArtist.js";
import { setEditingItem } from "../../utils/editMode.js";
import { getArtist, handleNavBarclick } from "../../utils/global.js";
import { deleteItem, getItems, updateItem } from "../../utils/storage.js";
import { handleEditButtonClick } from "../artist-new-edit-Item-page/edit-item.js";

export function initArtistItemsPage() {
  const itemsPageHeader = document.querySelector("#artistItemsPage header");
  const selectedArtist = getArtist();

  if (itemsPageHeader) {
    initNavBar(itemsPageHeader);
  }

  renderArtistCards(selectedArtist);
}

function initNavBar(header) {
  const navBar = renderHeaderArtistPage();
  header.appendChild(navBar);
}

export function renderArtistCards(selectedArtist) {
  const cardsContainer = document.querySelector("#cardsContainer");
  cardsContainer.innerHTML = "";

  const artistItems = getItems().filter(
    (item) => item.artist === selectedArtist
  );

  if (artistItems.length === 0) {
    cardsContainer.innerHTML = `<h2 class="empty-cards-section">You don't have any items yet, ${selectedArtist}!</h2>`;
    return;
  }

  artistItems.forEach((item, index) => setupCards(item, index, cardsContainer));
}

function setupCards(item, index, cardsContainer) {
  const itemCard = createArtistItemCard(item);

  cardsContainer.appendChild(itemCard);

  const publishButton = itemCard.querySelector("#publishButton");
  const removeButton = itemCard.querySelector("#removeButton");
  const editButton = itemCard.querySelector("#editButton");

  publishButton.addEventListener("click", () => {
    togglePublishedStatus(item, publishButton);
  });

  removeButton.addEventListener("click", () => {
    deleteItem(item.id);
    renderArtistCards(getArtist());
  });

  editButton.addEventListener("click", () => {
    handleEditButtonClick(item, index);
  });
}

function createArtistItemCard(item) {
  const itemCard = document.createElement("div");
  const isPublished = item.isPublished;

  const publishButtonClass = isPublished ? "button-green" : "button-gray";
  const publishButtonText = isPublished ? "Unpublish" : "Publish";

  itemCard.classList.add("card");

  itemCard.innerHTML = `
  <div class="card-item">
    <div class="card-inner">
      <div class="card-image">
    <img src="${item.image}" alt="${item.title}"/>
  </div>
  <div class="card-content">
    <div class="card-content--inner">
      <h3 class="card-heading">${item.artist}</h3>
      <span class="price">$${item.price}</span>
  </div>
    <span class="title">${item.title}</span>
    <p class="description">${item.description}</p>
  </div>
  <div class="action-buttons">
  <button class="button-blue">Send to Auction</button>
  <button class="${publishButtonClass}" id="publishButton">${publishButtonText}</button>
  <button class="button-contrast" id="removeButton">Remove</button>
  <button class="button-light" id="editButton">Edit</button>
      </div>
    </div>
  </div>`;

  return itemCard;
}

function togglePublishedStatus(item, publishButton) {
  const items = getItems();
  const foundItem = items.find((index) => index.id === item.id);

  if (!foundItem) return;

  foundItem.isPublished = !foundItem.isPublished;

  publishButton.textContent = foundItem.isPublished ? "Unpublish" : "Publish";
  publishButton.classList.toggle("button-green", foundItem.isPublished);
  publishButton.classList.toggle("button-gray", !foundItem.isPublished);

  updateItem(foundItem);
}
