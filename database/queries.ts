import { db } from "./db";

export async function insertMalt(
  name: string,
  ebc: number,
  origin: string,
  amountInGrams: number
) {
  const database = await db;
  await database.runAsync(
    "INSERT INTO malt (name, ebc, origin, amountInGrams) VALUES (?, ?, ?, ?)",
    [name, ebc, origin, amountInGrams]
  );
}

export async function deleteMalt(id: number) {
  const database = await db;
  await database.runAsync("DELETE FROM malt WHERE id = ?", [id]);
}

export async function getAllMalt() {
  const database = await db;
  return await database.getAllAsync("SELECT * FROM malt");
}
