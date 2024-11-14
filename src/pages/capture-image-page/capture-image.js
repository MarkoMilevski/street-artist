import { renderHeaderArtistPage } from "../../layout/renderHeaderArtist.js";
import { handleNavBarclick } from "../../utils/global.js";

export function initCaptureImagePage() {
  console.log("Init capture image page");

  const header = document.querySelector("#captureImagePage header");
  const navBar = renderHeaderArtistPage();
  header.innerHTML = navBar;

  const navToggle = document.querySelector("#navToggle");
  navToggle.addEventListener("click", handleNavBarclick);

  const snapshotButton = document.querySelector("#snapshotButton");
  snapshotButton.addEventListener("click", handleCaptureImage);
}

export function startCamera() {
  const liveStreamVideo = document.querySelector("#liveCamera");

  const cameraConfig = {
    video: {
      facingMode: {
        ideal: "environment",
      },
    },
  };

  navigator.mediaDevices.getUserMedia(cameraConfig).then((stream) => {
    liveStreamVideo.srcObject = stream;
  });
}

function handleCaptureImage() {
  const liveStreamVideo = document.querySelector("#liveCamera");
  const captureCanvas = document.querySelector("#captureCanvas");
  const ctx = captureCanvas.getContext("2d");
  captureCanvas.width = liveStreamVideo.videoWidth;
  captureCanvas.height = liveStreamVideo.videoHeight;

  ctx.drawImage(liveStreamVideo, 0, 0);

  const imageData = captureCanvas.toDataURL("image/png");
  localStorage.setItem("capturedImage", imageData);

  console.log(imageData);
  location.hash = "#addNewItemPage";
}
