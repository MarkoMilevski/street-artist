import { items } from "../../../data/db.js";
import { getItems } from "../../utils/storage.js";

export function getArtistData(artistName) {
  const artistItems = getItems().filter((item) => item.artist === artistName);

  const totalSold = artistItems.filter((item) => item.dateSold).length;

  const totalPublished = artistItems.filter((item) => item.artist).length;

  const totalIncome = artistItems
    .filter((item) => item.dateSold)
    .reduce((sum, item) => sum + item.priceSold, 0);

  return {
    totalSold,
    totalPublished,
    totalIncome,
    items: artistItems,
  };
}
