import { items } from "../../../data/db.js";
import { renderHeaderArtistPage } from "../../layout/renderHeaderArtist.js";
import { getArtist, handleNavBarclick } from "../../utils/global.js";
import { deleteItem, getItems, updateItem } from "../../utils/storage.js";

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
  header.innerHTML = navBar;

  const navToggle = document.querySelector("#navToggle");
  if (navToggle) {
    navToggle.addEventListener("click", handleNavBarclick);
  }
}

function renderArtistCards(selectedArtist) {
  const cardsContainer = document.querySelector("#cardsContainer");
  cardsContainer.innerHTML = "";

  const artistItems = getItems().filter(
    (item) => item.artist === selectedArtist
  );

  console.log(artistItems);

  if (artistItems.length === 0) {
    cardsContainer.innerHTML = `<h2 class="empty-cards-section">You don't have any items yet, ${selectedArtist}!</h2>`;
  } else {
    artistItems.forEach(setupCards);
  }
}

function setupCards(item) {
  const itemCard = createArtistItemCard(item);

  cardsContainer.appendChild(itemCard);

  const publishButton = document.querySelector(`#publishButton-${item.id}`);

  const removeButton = document.querySelector(`#removeButton-${item.id}`);

  removeButton.addEventListener("click", () => {
    deleteItem(item.id);
    renderArtistCards(getArtist());
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
  <button class="${publishButtonClass}" id="publishButton-${item.id}">${publishButtonText}</button>
  <button class="button-contrast" id="removeButton-${item.id}">Remove</button>
  <button class="button-light">Edit</button>
      </div>
    </div>
  </div>`;

  return itemCard;
}
