import { items } from "../../../data/db.js";
import { renderHeaderArtistPage } from "../../layout/renderHeaderArtist.js";
import { getArtist } from "../../utils/global.js";
import { setupChartButtons } from "./chart.js";
import { getArtistData } from "./getArtistData.js";

export function initArtistHomePage() {
  const homePageHeader = document.querySelector("#artistHomePage header");
  homePageHeader.innerHTML = "";
  const navBar = renderHeaderArtistPage();
  homePageHeader.appendChild(navBar);
  const selectedArtist = getArtist();
  const currentArtistItems = getItemsByArtist(selectedArtist);

  setupChartButtons(selectedArtist);

  const { totalSold, totalPublished, totalIncome } =
    getArtistData(selectedArtist);

  renderWidgets(totalSold, totalIncome, totalPublished);

  document.querySelector("#artistName").textContent = selectedArtist;
}

function getItemsByArtist(artistName) {
  return items.filter((item) => item.artist === artistName);
}

function renderWidgets(totalSold, totalIncome, totalPublishedItems) {
  const widgetsContainer = document.querySelector("#widgetsContainer");

  widgetsContainer.innerHTML = `
  <div class="widgets-wrapper">
          <div class="widgets--inner">
          <div class="widget">
            <div class="total">
              <p>Total Items Sold</p>
              <span class="widget--value">${totalSold}/${totalPublishedItems}</span>
            </div>
          </div>
          <div class="widget">
            <div class="total">
              <p>Total Income</p>
              <span class="widget--value">$${totalIncome}</span>
            </div>
          </div>
        </div>
        <div class="widget-auction">
          <div class="auctioning"> 
            <span class="widget--value">No live auctions at this time.</span>
          </div>
        </div>
        </div>`;
}
