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
  const currentMaltInventory: any[] = await database.getAllAsync(`
  SELECT selected_malt.*, malt.name 
  FROM selected_malt 
  JOIN malt ON selected_malt.malt_id = malt.id
`);
  console.log("Malt inventory fetched:", currentMaltInventory);

  const currentHopInventory: any[] = await database.getAllAsync(
    `SELECT selected_hop.*, hop.name 
     FROM selected_hop 
     JOIN hop ON selected_hop.hop_id = hop.id
  `
  );
  console.log("Hop inventory fetched:", currentHopInventory);

  const currentYeastInventory: any[] = await database.getAllAsync(
    `SELECT selected_yeast.*, yeast.name 
    FROM selected_yeast
    JOIN yeast ON selected_yeast.yeast_id = yeast.id
  `
  );
  console.log("Yeast inventory fetched:", currentYeastInventory);

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
