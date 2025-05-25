import { db } from "./db";

export async function createSchema() {
  const database = await db;

  await database.execAsync(`
    -- Tables
    CREATE TABLE IF NOT EXISTS malt (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      ebc INTEGER,
      origin TEXT
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

    CREATE TABLE IF NOT EXISTS selected_malt (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      malt_id INTEGER NOT NULL,
      amountInGrams INTEGER NOT NULL,
      FOREIGN KEY (malt_id) REFERENCES malt(id)
    );

    CREATE TABLE IF NOT EXISTS selected_hop (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      hop_id INTEGER NOT NULL,
      amountInGrams INTEGER NOT NULL,
      FOREIGN KEY (hop_id) REFERENCES hops(id)
    );

    CREATE TABLE IF NOT EXISTS selected_yeast (
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

    -- Insert malts if not exists
    
    INSERT INTO malt (name, ebc, origin)
    SELECT 'Pilsner', 2, 'Germany'
    WHERE NOT EXISTS (SELECT 1 FROM malt WHERE name = 'Pilsner');

    INSERT INTO malt (name, ebc, origin)
    SELECT 'Wheat', 3, 'USA'
    WHERE NOT EXISTS (SELECT 1 FROM malt WHERE name = 'Wheat');

    INSERT INTO malt (name, ebc, origin)
    SELECT 'Black Malt', 900, 'UK'
    WHERE NOT EXISTS (SELECT 1 FROM malt WHERE name = 'Black Malt');

    INSERT INTO malt (name, ebc, origin)
    SELECT 'Crystal 150', 250, 'UK'
    WHERE NOT EXISTS (SELECT 1 FROM malt WHERE name = 'Crystal 150');

    -- Insert hops if not exists

    INSERT INTO hops (name, alphaAcid, origin)
    SELECT 'Cascade', 6.3, 'USA'
    WHERE NOT EXISTS (SELECT 1 FROM hops WHERE name = 'Cascade');

    INSERT INTO hops (name, alphaAcid, origin)
    SELECT 'East Kent Goldings', 7.4, 'UK'
    WHERE NOT EXISTS (SELECT 1 FROM hops WHERE name = 'East Kent Goldings');

    INSERT INTO hops (name, alphaAcid, origin)
    SELECT 'Simcoe', 6.5, 'USA'
    WHERE NOT EXISTS (SELECT 1 FROM hops WHERE name = 'Simcoe');

    INSERT INTO hops (name, alphaAcid, origin)
    SELECT 'Hallertau Mittelfrü', 7.5, 'Germany'
    WHERE NOT EXISTS (SELECT 1 FROM hops WHERE name = 'Hallertau Mittelfrü');

    -- Insert yeasts if not exists

    INSERT INTO yeast (name, type, attenuation)
    SELECT 'SafAle S-04', 'Ale', 78
    WHERE NOT EXISTS (SELECT 1 FROM yeast WHERE name = 'SafAle S-04');

    INSERT INTO yeast (name, type, attenuation)
    SELECT 'SafAle US-05', 'Ale', 82
    WHERE NOT EXISTS (SELECT 1 FROM yeast WHERE name = 'SafAle US-05');

    INSERT INTO yeast (name, type, attenuation)
    SELECT 'SafLager W-34/70', 'Lager', 5
    WHERE NOT EXISTS (SELECT 1 FROM yeast WHERE name = 'SafLager W-34/70');

    -- Insert beer styles if not exists

    INSERT INTO beer_style (name, description)
    SELECT 'IPA', 'India Pale Ale is a type of ale that is typically brewed with a high amount of hops.'
    WHERE NOT EXISTS (SELECT 1 FROM beer_style WHERE name = 'IPA');

    INSERT INTO beer_style (name, description)
    SELECT 'Lager', 'German lager is a light, crisp, and refreshing beer with a clean, malty aroma and a light, crisp, and refreshing taste.'
    WHERE NOT EXISTS (SELECT 1 FROM beer_style WHERE name = 'Lager');

    INSERT INTO beer_style (name, description)
    SELECT 'Stout', 'Dry Stout is a dark, bitter, and full-bodied beer that is typically brewed with a high amount of malt and few hops.'
    WHERE NOT EXISTS (SELECT 1 FROM beer_style WHERE name = 'Stout');
  `);
}

// what if beerstyle shoulc contain multiple malts, hops and yeasts?
//need another table for that i think.
