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
      origin TEXT
    );
    CREATE TABLE IF NOT EXISTS yeast (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT,
      attenuation INTEGER
    );
    CREATE TABLE IF NOT EXISTS beer_style (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT
    );
    INSERT INTO beer_style (name, description) VALUES ('IPA', 'India Pale Ale is a type of ale that is typically brewed with a high amount of hops.');
    INSERT INTO beer_style (name, description) VALUES ('Lager', 'German lager is a light, crisp, and refreshing beer with a clean, malty aroma and a light, crisp, and refreshing taste.');
    INSERT INTO beer_style (name, description) VALUES ('Stout', 'Dry Stout is a dark, bitter, and full-bodied beer that is typically brewed with a high amount of malt and few hops.');
    INSERT INTO beer_style (name, description) VALUES ('Dark mild', 'Dark mild is a weaker semi-dark ale with caramel notes');
    CREATE TABLE IF NOT EXISTS style_malt (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      style_id INTEGER NOT NULL,
      malt_id INTEGER NOT NULL,
      percentage REAL NOT NULL,
      FOREIGN KEY (style_id) REFERENCES beer_style(id),
      FOREIGN KEY (malt_id) REFERENCES malt(id)
    );
    CREATE TABLE IF NOT EXISTS style_hops (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      style_id INTEGER NOT NULL,
      hops_id INTEGER NOT NULL,
      usage TEXT,
      FOREIGN KEY (style_id) REFERENCES beer_style(id),
      FOREIGN KEY (hops_id) REFERENCES hops(id)
    );
  `);
}
