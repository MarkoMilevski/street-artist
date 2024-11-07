import { items } from "../../../data/db.js";
import { getItems } from "../../utils/storage.js";

export function getArtistData(artistName) {
  const artistItems = getItems().filter((item) => item.artist === artistName);

  console.log(artistItems);

  const totalSold = artistItems.filter((item) => item.dateSold).length;
  console.log(totalSold);

  const totalPublished = artistItems.filter((item) => item.artist).length;
  console.log(totalPublished);

  const totalIncome = artistItems
    .filter((item) => item.dateSold)
    .reduce((sum, item) => sum + item.priceSold, 0);

  console.log(totalIncome);
  return {
    totalSold,
    totalPublished,
    totalIncome,
    items: artistItems,
  };
}
