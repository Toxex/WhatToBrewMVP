import { db } from "./db";

export async function createSchema() {
  const database = await db;

  database.execAsync(`
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
      FOREIGN KEY (malt_id) REFERENCES malt(id), 
      FOREIGN KEY (hops_id) REFERENCES hops(id),
      FOREIGN KEY (yeast_id) REFERENCES yeast(id)
    );
    INSERT INTO beer_style (name, description) VALUES ('IPA', 'India Pale Ale is a type of ale that is typically brewed with a high amount of hops.');
    INSERT INTO beer_style (name, description) VALUES ('Lager', 'German lager is a light, crisp, and refreshing beer with a clean, malty aroma and a light, crisp, and refreshing taste.');
    INSERT INTO beer_style (name, description) VALUES ('Stout', 'Dry Stout is a dark, bitter, and full-bodied beer that is typically brewed with a high amount of malt and few hops.');
    INSERT INTO beer_style (name, description, malt_id) VALUES ('Dark mild', 'Dark mild is a weaker semi-dark ale with caramel notes', (SELECT id FROM malt WHERE name = 'Vienna')
    );
  `);
}
// what if beerstyle shoulc contain multiple malts, hops and yeasts?
//need another table for that i think.
