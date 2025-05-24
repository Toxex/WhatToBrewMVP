import { db } from "./db";

//MALTS
export async function insertMalt(
  name: string,
  ebc: number,
  origin: string,
  amountInGrams: number
) {
  const database = await db;
  try {
    await database.runAsync(
      "INSERT INTO malt (name, ebc, origin, amountInGrams) VALUES (?, ?, ?, ?)",
      [name, ebc, origin, amountInGrams]
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

//YEASTS
export async function insertYeast(
  name: string,
  type: string,
  attenuation: number,
  amountOfPackages: number
) {
  const database = await db;
  try {
    await database.runAsync(
      `INSERT INTO yeast (name, type, attenuation, amountOfPackages) VALUES (?, ?, ?, ?)`,
      [name, type, attenuation, amountOfPackages]
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

//HOPS

export async function insertHop(
  name: string,
  alphaAcid: number,
  origin: string,
  amountInGrams: number
) {
  const database = await db;
  try {
    await database.runAsync(
      `INSERT INTO hops (name, alphaAcid, origin, amountInGrams) VALUES (?, ?, ?, ?)`,
      [name, alphaAcid, origin, amountInGrams]
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
  return await database.getAllAsync("SELECT * FROM hops");
}

//BEER STYLE????

//LOGALL
export async function logFullDatabase() {
  const database = await db;

  const malt = await database.getAllAsync("SELECT * FROM malt");
  const hops = await database.getAllAsync("SELECT * FROM hops");
  const yeast = await database.getAllAsync("SELECT * FROM yeast");
  const beerStyle = await database.getAllAsync("SELECT * FROM beer_style");

  console.log("🍺 Full DB Dump:");
  console.log("Malts:", malt);
  console.log("Hops:", hops);
  console.log("Yeasts:", yeast);
  console.log("Beer Styles:", beerStyle);
}
