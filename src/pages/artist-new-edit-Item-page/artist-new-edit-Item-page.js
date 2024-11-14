import { itemTypes } from "../../../data/db.js";
import { renderHeaderArtistPage } from "../../layout/renderHeaderArtist.js";
import { clearEditingItem, getEditingItem } from "../../utils/editMode.js";
import {
  createDropdownOption,
  getArtist,
  handleNavBarclick,
  resetForm,
} from "../../utils/global.js";
import { updateItem } from "../../utils/storage.js";
import { startCamera } from "../capture-image-page/capture-image.js";
import { createAndAddItem, getValuesFromForm } from "./add-item.js";
import { fillFormForEdit } from "./edit-item.js";

export function initAddNewItemsPage() {
  console.log("Init Add new items page");

  const header = document.querySelector("#addNewItemPage header");
  const navBar = renderHeaderArtistPage();
  header.innerHTML = navBar;

  const selectedArtist = getArtist();

  const navToggle = document.querySelector("#navToggle");
  navToggle.addEventListener("click", handleNavBarclick);

  const artistName = document.querySelector("#artistName");
  if (artistName) {
    artistName.textContent = selectedArtist;
  }

  populateItemTypes();
  createItem();

  const editingItem = getEditingItem();
  if (editingItem) {
    fillFormForEdit(editingItem); // Fill form with existing item data
  } else {
    createItem(); // Set up form for adding new item
  }

  const takeSnapshotButton = document.querySelector("#captureImage");
  if (takeSnapshotButton) {
    takeSnapshotButton.addEventListener("click", redirectToCamera);
  }

  renderCapturedImage();
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
  location.hash = "#artistItemsPage";
}

function redirectToCamera() {
  location.hash = "#captureImagePage";
  startCamera();
}

function renderCapturedImage() {
  const capturedImage = localStorage.getItem("capturedImage");
  const imageInput = document.querySelector("#imageUrl");
  if (capturedImage) {
    const captureImageDiv = document.querySelector("#captureImage");
    captureImageDiv.innerHTML = `<img src="${capturedImage}" alt="Captured Image" class="captured-image"/>`;
    imageInput.value = capturedImage;
  }
}
