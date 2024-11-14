import { items as defaultItems } from "../../../data/db.js";

export function addItem(item) {
  const items = getItems();
  items.push(item);

  localStorage.setItem("items", JSON.stringify(items));
}

export function updateItem(updatedItem) {
  const items = getItems();
  const editingItemIndex = items.findIndex(
    (item) => item.id === updatedItem.id
  );
  if (editingItemIndex !== -1) {
    items[editingItemIndex] = updatedItem;
    localStorage.setItem("items", JSON.stringify(items));
  }
}

export function deleteItem(itemId) {
  const items = getItems();
  const index = items.findIndex((i) => i.id === itemId);

  if (index !== -1) {
    items.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(items));
  }
}

export function getItems() {
  const storedItems = localStorage.getItem("items");
  if (!storedItems) {
    localStorage.setItem("items", JSON.stringify(defaultItems));
    return defaultItems;
  }

  return JSON.parse(storedItems);
}
