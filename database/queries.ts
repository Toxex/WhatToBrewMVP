import { db } from "./db";

//MALTS
export async function insertMalt(name: string, ebc: number, origin: string) {
  const database = await db;
  try {
    await database.runAsync(
      "INSERT INTO malt (name, ebc, origin) VALUES (?, ?, ?)",
      [name, ebc, origin]
    );
  } catch (error) {
    console.error("Error inserting malt:", error);
    throw error;
  }
}

export async function deleteMalt(id: number) {
  const database = await db;
  await database.runAsync("DELETE FROM malt WHERE id = ?", [id]);
}

export async function getAllMalt() {
  const database = await db;
  return await database.getAllAsync("SELECT * FROM malt");
}

//SELECTED MALTS
export async function insertSelectedMaltAmount(
  foreignId: number,
  amountInGrams: number
) {
  const database = await db;
  try {
    await database.runAsync(
      `INSERT INTO selected_malt (malt_id, amountInGrams) VALUES (?, ?)`,
      [foreignId, amountInGrams]
    );
  } catch (error) {
    console.error("Error inserting malt amount:", error);
    throw error;
  }
}

export async function deleteSelectedMalt(id: number) {
  const database = await db;
  await database.runAsync("DELETE FROM selected_malt WHERE id = ?", [id]);
}

export async function getAllSelectedMalt() {
  const database = await db;
  return await database.getAllAsync(`SELECT selected_malt.id AS selectedId, selected_malt.amountInGrams, malt.name, malt.id
    FROM selected_malt
    JOIN malt ON selected_malt.malt_id = malt.id
  `);
}

//YEASTS
export async function insertYeast(
  name: string,
  type: string,
  attenuation: number
) {
  const database = await db;
  try {
    await database.runAsync(
      `INSERT INTO yeast (name, type, attenuation) VALUES (?, ?, ?)`,
      [name, type, attenuation]
    );
  } catch (error) {
    console.error("Error inserting yeast:", error);
    throw error;
  }
}

export async function deleteYeast(id: number) {
  const database = await db;
  await database.runAsync("DELETE FROM yeast WHERE id = ?", [id]);
}

export async function getAllYeasts() {
  const database = await db;
  return await database.getAllAsync("SELECT * FROM yeast");
}

//SELECTED YEASTS
export async function insertSelectedYeastAmount(
  foreignId: number,
  amountInGrams: number
) {
  const database = await db;
  try {
    await database.runAsync(
      `INSERT INTO selected_yeast (yeast_id, amountOfPackages) VALUES (?, ?)`,
      [foreignId, amountInGrams]
    );
  } catch (error) {
    console.error("Error inserting yeast amount:", error);
    throw error;
  }
}

export async function deleteSelectedYeast(id: number) {
  const database = await db;
  await database.runAsync("DELETE FROM selected_yeast WHERE id = ?", [id]);
}

export async function getAllSelectedYeasts() {
  const database = await db;
  return await database.getAllAsync(`
  SELECT 
    selected_yeast.id AS selectedId,
    yeast_id,
    yeast.name,
    selected_yeast.amountOfPackages
  FROM selected_yeast
  JOIN yeast ON selected_yeast.yeast_id = yeast.id
`);
}

//HOPS

export async function insertHop(
  name: string,
  alphaAcid: number,
  origin: string
) {
  const database = await db;
  try {
    await database.runAsync(
      `INSERT INTO hops (name, alphaAcid, origin) VALUES (?, ?, ?)`,
      [name, alphaAcid, origin]
    );
  } catch (error) {
    console.error("Error inserting hop:", error);
    throw error;
  }
}

export async function deleteHop(id: number) {
  const database = await db;
  await database.runAsync("DELETE FROM hops WHERE id = ?", [id]);
}

export async function getAllHops() {
  const database = await db;
  return await database.getAllAsync("SELECT * FROM hop");
}

//SELECTED HOPS

export async function insertSelectedHopAmount(
  foreignId: number,
  amountInGrams: number
) {
  const database = await db;
  try {
    await database.runAsync(
      `INSERT INTO selected_hop (hop_id, amountInGrams) VALUES (?, ?)`,
      [foreignId, amountInGrams]
    );
  } catch (error) {
    console.error("Error inserting ingredient amount:", error);
    throw error;
  }
}

export async function deleteSelectedHop(id: number) {
  const database = await db;
  await database.runAsync("DELETE FROM selected_hop WHERE id = ?", [id]);
}

export async function getAllSelectedHops() {
  const database = await db;
  return await database.getAllAsync(`
  SELECT 
    selected_hop.id AS selectedId,
    hop_id,
    hop.name,
    selected_hop.amountInGrams
  FROM selected_hop
  JOIN hop ON selected_hop.hop_id = hop.id
`);
}

//BEER STYLE????
//LOGALL
export async function logFullDatabase() {
  const database = await db;
  console.log("database loaded");
  const malt = await database.getAllAsync("SELECT * FROM malt");
  console.log("Malt inventory fetched:", malt);
  const hop = await database.getAllAsync("SELECT * FROM hop");
  console.log("Hop inventory fetched:", hop);
  const yeast = await database.getAllAsync("SELECT * FROM yeast");
  console.log("Yeast inventory fetched:", yeast);
  const beerStyle = await database.getAllAsync("SELECT * FROM beer_style");
  const selected_hop = await database.getAllAsync("SELECT * FROM selected_hop");
  const selected_malt = await database.getAllAsync(
    "SELECT * FROM selected_malt"
  );
  const selected_yeast = await database.getAllAsync(
    "SELECT * FROM selected_yeast"
  );

  console.log("🍺 Full DB Dump:");
  console.log("Malts:", malt);
  console.log("Hops:", hop);
  console.log("Yeasts:", yeast);
  console.log("Beer Styles:", beerStyle);
  console.log("Selected Hops:", selected_hop);
  console.log("Selected Malts:", selected_malt);
  console.log("Selected Yeasts:", selected_yeast);
}
