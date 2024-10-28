export function initVisitorHomePage() {
  console.log("Init visitor home page");

  sliderImageClick();
  redirectToListingPage();
}

function sliderImageClick() {
  const sliderImages = document.querySelectorAll(
    ".gallery-slide img, .gallery-slide-2 img"
  );

  sliderImages.forEach((image) => {
    image.addEventListener("click", () => {
      window.location.hash = "#visitorListingPage";
    });
  });
}

function redirectToListingPage() {
  const findArt = document.querySelector("#findArt");

  findArt.addEventListener("click", () => {
    window.location.hash = "#visitorListingPage";
  });
}
