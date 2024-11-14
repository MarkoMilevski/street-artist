import { clearEditingItem, getEditingItem } from "../../utils/editMode.js";
import { getArtist, resetForm } from "../../utils/global.js";
import { addItem, updateItem } from "../../utils/storage.js";
import { renderArtistCards } from "../artist-items-page/artistItemsPage.js";

const form = document.querySelector("#itemForm");

export function getValuesFromForm() {
  const titleInput = form.querySelector("#title");
  const isPublishedInput = form.querySelector("#isPublished");
  const descriptionInput = form.querySelector("#description");
  const typeSelect = form.querySelector("#typeSelect");
  const priceInput = form.querySelector("#price");
  const imageInput = form.querySelector("#imageUrl");

  const editingItem = getEditingItem();

  const item = {
    id: editingItem ? editingItem.id : new Date().valueOf(),
    description: descriptionInput.value,
    image: imageInput.value,
    price: +priceInput.value,
    artist: getArtist(),
    dateCreated: editingItem
      ? editingItem.dateCreated
      : new Date().toISOString(),
    isPublished: isPublishedInput.checked,
    isAuctioning: editingItem ? editingItem.isAuctioning : false,
    dateSold: editingItem ? editingItem.dateSold : null,
    priceSold: editingItem ? editingItem.priceSold : null,
    title: titleInput.value,
    type: typeSelect.value,
  };

  return item;
}

export function createAndAddItem() {
  const item = getValuesFromForm();

  const editingItem = getEditingItem(item);

  if (editingItem) {
    updateItem(item);
  } else {
    addItem(item);
  }
  renderArtistCards(item.artist);

  resetForm();

  location.hash = "#artistItemsPage";
  clearEditingItem();
}
