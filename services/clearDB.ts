import { db } from "@/database/db"; // adjust to your actual db import

export async function clearDatabase() {
  const database = await db;

  try {
    await database.execAsync("DELETE FROM malt");
    await database.execAsync("DELETE FROM hop");
    await database.execAsync("DELETE FROM yeast");
    await database.execAsync("DELETE FROM beer_style");
    await database.execAsync("DELETE FROM selected_malt");
    await database.execAsync("DELETE FROM selected_hop");
    await database.execAsync("DELETE FROM selected_yeast");

    console.log("✅ Database cleared (data only, schema preserved).");
  } catch (error) {
    console.error("❌ Failed to clear database:", error);
  }
}
