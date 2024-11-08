import { getArtist, resetForm } from "../../utils/global.js";
import { addItem } from "../../utils/storage.js";
import { renderArtistCards } from "../artist-items-page/artistItemsPage.js";

const form = document.querySelector("#itemForm");

function getValuesFromForm() {
  const titleInput = form.querySelector("#title");
  const isPublishedInput = form.querySelector("#isPublished");
  const descriptionInput = form.querySelector("#description");
  const typeSelect = form.querySelector("#typeSelect");
  const priceInput = form.querySelector("#price");
  const imageInput = form.querySelector("#image");

  const newItem = {
    id: new Date().valueOf(),
    description: descriptionInput.value,
    image: imageInput.value,
    price: +priceInput.value,
    artist: getArtist(),
    dateCreated: new Date().toISOString(),
    isPublished: isPublishedInput.checked,
    isAuctioning: false,
    dateSold: null,
    priceSold: null,
    title: titleInput.value,
    type: typeSelect.value,
  };

  return newItem;
}

export function createAndAddItem() {
  const newItem = getValuesFromForm();

  if (newItem) {
    addItem(newItem);
    resetForm();
    renderArtistCards(newItem);

    location.hash = "#artistItemsPage";
  }
}
