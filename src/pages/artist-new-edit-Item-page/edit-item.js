import { setEditingItem } from "../../utils/editMode.js";
import { getItems } from "../../utils/storage.js";

export function handleEditButtonClick(item, index) {
  setEditingItem(item);
  fillFormForEdit(item);
  location.hash = "#addNewItemPage";
}

export function fillFormForEdit(item) {
  const form = document.querySelector("#itemForm");
  form.querySelector("#title").value = item.title;
  form.querySelector("#description").value = item.description;
  form.querySelector("#price").value = item.price;
  form.querySelector("#imageUrl").value = item.image;
  form.querySelector("#isPublished").checked = item.isPublished;
  form.querySelector("#typeSelect").value = item.type;

  return item;
}
