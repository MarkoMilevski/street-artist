import { itemTypes } from "../../../data/db.js";
import { renderHeaderArtistPage } from "../../layout/renderHeaderArtist.js";
import {
  createDropdownOption,
  getArtist,
  handleNavBarclick,
  resetForm,
} from "../../utils/global.js";
import { startCamera } from "../capture-image-page/capture-image.js";
import { createAndAddItem } from "./add-item.js";

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

  const takeSnapshotButton = document.querySelector("#captureImage");
  if (takeSnapshotButton) {
    takeSnapshotButton.addEventListener("click", redirectToCamera);
  }

  renderCapturedImage();
}

function createItem() {
  const addNewItemButton = document.querySelector("#addButton");
  const cancelButton = document.querySelector("#cancelButton");

  if (addNewItemButton) {
    addNewItemButton.addEventListener("click", (event) => {
      event.preventDefault();

      createAndAddItem();
    });
  }

  if (cancelButton) {
    cancelButton.addEventListener("click", (event) => {
      event.preventDefault();
      cancelItem();
    });
  }
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
