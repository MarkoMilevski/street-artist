import { itemTypes } from "../../../data/db.js";
import { renderHeaderArtistPage } from "../../layout/renderHeaderArtist.js";
import { clearEditingItem, getEditingItem } from "../../utils/editMode.js";
import {
  createDropdownOption,
  getArtist,
  resetForm,
} from "../../utils/global.js";
import { updateItem } from "../../utils/storage.js";
import { startCamera } from "../capture-image-page/capture-image.js";
import { createAndAddItem, getValuesFromForm } from "./add-item.js";
import { fillFormForEdit } from "./edit-item.js";

export function initAddNewItemsPage() {
  console.log("Init Add new items page");

  const header = document.querySelector("#addNewItemPage header");
  header.innerHTML = "";

  if (header) {
    initNavBar(header);
  }
  const selectedArtist = getArtist();

  const artistName = document.querySelector("#artistName");
  if (artistName) {
    artistName.textContent = selectedArtist;
  }

  populateItemTypes();
  createItem();

  const editingItem = getEditingItem();
  if (editingItem) {
    fillFormForEdit(editingItem);
  } else {
    createItem();
  }

  updateFormTitle();

  const takeSnapshotButton = document.querySelector("#captureImage");
  if (takeSnapshotButton) {
    takeSnapshotButton.addEventListener("click", redirectToCamera);
  }

  renderCapturedImage();
}

function updateFormTitle() {
  const formTitle = document.querySelector("#formTitle");
  const addButton = document.querySelector("#addButton");

  const editingItem = getEditingItem();

  if (formTitle) {
    formTitle.textContent = editingItem ? "Edit Item" : "Add New Item";
  }

  if (addButton) {
    addButton.textContent = editingItem ? "Edit Item" : "Add Item";
  }
}

function initNavBar(header) {
  const existingNavBar = header.querySelector(".nav-bar");

  if (existingNavBar) {
    existingNavBar.remove();
  }

  const navBar = renderHeaderArtistPage();
  header.appendChild(navBar);
}

function createItem() {
  const itemForm = document.querySelector("#itemForm");
  const cancelButton = document.querySelector("#cancelButton");

  if (itemForm) {
    itemForm.removeEventListener("submit", handleFormSubmit);
    itemForm.addEventListener("submit", handleFormSubmit);
  }

  if (cancelButton) {
    cancelButton.addEventListener("click", (event) => {
      event.preventDefault();
      cancelItem();
    });
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

  const editingItem = getEditingItem();
  console.log(editingItem, "Editing item");

  if (editingItem) {
    const updatedItem = getValuesFromForm(editingItem);
    updateItem(updatedItem);
    clearEditingItem();
  } else {
    createAndAddItem();
  }

  location.hash = "#artistItemsPage";
}

function populateItemTypes() {
  const typeSelect = document.querySelector("#typeSelect");
  typeSelect.innerHTML = "";
  const chooseOption = createDropdownOption();
  typeSelect.appendChild(chooseOption);

  itemTypes.forEach((type) => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type;
    typeSelect.appendChild(option);
  });
}

function cancelItem() {
  console.log("Canceled");
  resetForm();
  clearEditingItem();
  location.hash = "#artistItemsPage";
}

function redirectToCamera() {
  location.hash = "#captureImagePage";
  startCamera();
}

function renderCapturedImage() {
  const capturedImage = localStorage.getItem("capturedImage");
  const imageInput = document.querySelector("#imageUrl");
  const editingItem = getEditingItem();

  const imageSrc = editingItem ? editingItem.image : capturedImage;

  if (imageSrc) {
    const captureImageDiv = document.querySelector("#captureImage");
    captureImageDiv.innerHTML = `<img src="${imageSrc}" alt="Item Image" class="captured-image"/>`;
    imageInput.value = imageSrc;
  }

  if (!editingItem) {
    localStorage.removeItem("capturedImage");
  }
}
