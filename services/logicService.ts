import { db } from "../database/db";
export async function refreshData<T>(
  fetchFunction: () => Promise<T[]>
): Promise<T[]> {
  const data = await fetchFunction();
  return data;
}

export async function generateSuggestedBrew() {
  const database = await db;
  console.log("database loaded");
  const currentMaltInventory: any[] = await database.getAllAsync(
    "SELECT * FROM selected_malt"
  );
  console.log("Malt inventory fetched:", currentMaltInventory);

  const currentHop: any[] = await database.getAllAsync(
    "SELECT * FROM selected_hop"
  );
  console.log("Hop inventory fetched:", currentHop);

  const currentYeast: any[] = await database.getAllAsync(
    "SELECT * FROM selected_yeast"
  );
  console.log("Yeast inventory fetched:", currentYeast);

  const beerStyle: any[] = await database.getAllAsync(
    "SELECT * FROM beer_style"
  );
  console.log("Style inventory fetched:", beerStyle);

  if (currentMaltInventory.length === 0) {
    return "You have no malt in your inventory!";
  }

  const hasBlackMalt = currentMaltInventory.some(
    (malt) => malt.name === "Black Malt"
  );
  const hasPaleAle = currentMaltInventory.some(
    (malt) => malt.name === "Pale Ale"
  );

  if (hasBlackMalt) {
    return "Stout";
  } else if (hasPaleAle) {
    return "IPA";
  } else {
    return "Pilsner";
  }
}
