import { db } from "./db";

export async function createSchema() {
  const database = await db;

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS malt (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      ebc INTEGER,
      origin TEXT;
    );
    INSERT INTO malt (name, ebc, origin) VALUES 
      ('Pilsner', 2, 'Germany'),
      ('Wheat', 3, 'USA'),
      ('Black Malt', 900, UK),
      ('Crystal 150', 250, 'UK');

    CREATE TABLE IF NOT EXISTS hops (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      alphaAcid REAL,
      origin TEXT;
    );
    INSERT INTO hops (name, alphaAcid, origin) VALUES 
      ('Cascade', 6.3, 'USA'),
      ('East Kent Goldings', 7.4, 'UK'),
      ('Simcoe', 6.5, 'USA'),
      ('Hallertau Mittelfrü', 7.5, 'Germany');

    CREATE TABLE IF NOT EXISTS yeast (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT,
      attenuation INTEGER;
    );
    INSERT INTO yeast (name, type, attenuation) VALUES 
      ('SafAle S-04', 'Ale', 78),
      ('SafAle US-05', 'Ale', 82),
      ('SafLager W-34/70', 'Lager', 5);

    CREATE TABLE selected_malt (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      malt_id INTEGER NOT NULL,
      amountInGrams INTEGER NOT NULL,
      FOREIGN KEY (malt_id) REFERENCES malt(id)
    );

    CREATE TABLE selected_hop (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      hop_id INTEGER NOT NULL,
      amountInGrams INTEGER NOT NULL,
      FOREIGN KEY (hop_id) REFERENCES hops(id)
    );

    CREATE TABLE selected_yeast (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      yeast_id INTEGER NOT NULL,
      amountOfPackages INTEGER NOT NULL,
      FOREIGN KEY (yeast_id) REFERENCES yeast(id)
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
