import { db } from "./db";

export async function createSchema() {
  const database = await db;

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS malt (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      ebc INTEGER,
      origin TEXT,
      amountInGrams INTEGER
    );

    CREATE TABLE IF NOT EXISTS hops (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      alphaAcid REAL,
      origin TEXT,
      amountInGrams INTEGER
    );

    CREATE TABLE IF NOT EXISTS yeast (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT,
      attenuation INTEGER,
      amountOfPackages INTEGER
    );

    CREATE TABLE IF NOT EXISTS beer_style (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      malt_id INTEGER,
      hops_id INTEGER,
      yeast_id INTEGER,
      FOREIGN KEY (malt_id) REFERENCES malt(id), 
      FOREIGN KEY (hops_id) REFERENCES hops(id),
      FOREIGN KEY (yeast_id) REFERENCES yeast(id)
    );

    INSERT INTO beer_style (name, description) VALUES 
      ('IPA', 'India Pale Ale is a type of ale that is typically brewed with a high amount of hops.'),
      ('Lager', 'German lager is a light, crisp, and refreshing beer with a clean, malty aroma and a light, crisp, and refreshing taste.'),
      ('Stout', 'Dry Stout is a dark, bitter, and full-bodied beer that is typically brewed with a high amount of malt and few hops.');
  `);
}

// what if beerstyle shoulc contain multiple malts, hops and yeasts?
//need another table for that i think.
