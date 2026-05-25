import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import type { Product, News, Rating, ProductWithRating } from "@/types";

const DB_PATH = path.join(process.cwd(), "data", "ai.db");

let db: Database.Database;

export function getDb(): Database.Database {
  if (!db) {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
    initSchema(db);
  }
  return db;
}

function initSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      company TEXT NOT NULL,
      logo_url TEXT DEFAULT '',
      website_url TEXT DEFAULT '',
      release_date TEXT DEFAULT '',
      summary TEXT DEFAULT '',
      description TEXT DEFAULT '',
      category TEXT DEFAULT '',
      pricing_json TEXT DEFAULT '[]',
      pros TEXT DEFAULT '',
      cons TEXT DEFAULT '',
      status TEXT DEFAULT 'active',
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER,
      title TEXT NOT NULL,
      content TEXT DEFAULT '',
      source_url TEXT DEFAULT '',
      published_at TEXT DEFAULT (datetime('now')),
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS ratings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      score INTEGER NOT NULL CHECK(score >= 1 AND score <= 5),
      comment TEXT DEFAULT '',
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    );
  `);
}

export function getAllProducts(): ProductWithRating[] {
  const db = getDb();
  return db
    .prepare(
      `SELECT p.*,
        COALESCE(AVG(r.score), 0) as avg_rating,
        COUNT(r.id) as rating_count
      FROM products p
      LEFT JOIN ratings r ON r.product_id = p.id
      GROUP BY p.id
      ORDER BY p.created_at DESC`
    )
    .all() as ProductWithRating[];
}

export function getProductBySlug(slug: string): ProductWithRating | undefined {
  const db = getDb();
  return db
    .prepare(
      `SELECT p.*,
        COALESCE(AVG(r.score), 0) as avg_rating,
        COUNT(r.id) as rating_count
      FROM products p
      LEFT JOIN ratings r ON r.product_id = p.id
      WHERE p.slug = ?
      GROUP BY p.id`
    )
    .get(slug) as ProductWithRating | undefined;
}

export function createProduct(data: Omit<Product, "id" | "created_at" | "updated_at">) {
  const db = getDb();
  const stmt = db.prepare(
    `INSERT INTO products (slug, name, company, logo_url, website_url, release_date, summary, description, category, pricing_json, pros, cons, status)
     VALUES (@slug, @name, @company, @logo_url, @website_url, @release_date, @summary, @description, @category, @pricing_json, @pros, @cons, @status)`
  );
  return stmt.run(data);
}

export function updateProduct(id: number, data: Partial<Product>) {
  const db = getDb();
  const fields = Object.keys(data)
    .filter((k) => data[k as keyof typeof data] !== undefined)
    .map((k) => `${k} = @${k}`);
  if (fields.length === 0) return;
  const stmt = db.prepare(
    `UPDATE products SET ${fields.join(", ")}, updated_at = datetime('now') WHERE id = @id`
  );
  return stmt.run({ ...data, id });
}

export function deleteProduct(id: number) {
  const db = getDb();
  return db.prepare("DELETE FROM products WHERE id = ?").run(id);
}

export function getAllNews(): News[] {
  const db = getDb();
  return db.prepare("SELECT * FROM news ORDER BY published_at DESC").all() as News[];
}

export function getNewsById(id: number): News | undefined {
  const db = getDb();
  return db.prepare("SELECT * FROM news WHERE id = ?").get(id) as News | undefined;
}

export function getNewsByProductId(productId: number): News[] {
  const db = getDb();
  return db
    .prepare("SELECT * FROM news WHERE product_id = ? ORDER BY published_at DESC")
    .all(productId) as News[];
}

export function createNews(data: Omit<News, "id" | "created_at">) {
  const db = getDb();
  const stmt = db.prepare(
    `INSERT INTO news (product_id, title, content, source_url, published_at)
     VALUES (@product_id, @title, @content, @source_url, @published_at)`
  );
  return stmt.run(data);
}

export function updateNews(id: number, data: Partial<News>) {
  const db = getDb();
  const fields = Object.keys(data)
    .filter((k) => data[k as keyof typeof data] !== undefined && k !== "id")
    .map((k) => `${k} = @${k}`);
  if (fields.length === 0) return;
  const stmt = db.prepare(`UPDATE news SET ${fields.join(", ")} WHERE id = @id`);
  return stmt.run({ ...data, id });
}

export function deleteNews(id: number) {
  const db = getDb();
  return db.prepare("DELETE FROM news WHERE id = ?").run(id);
}

export function createRating(data: { product_id: number; score: number; comment: string }) {
  const db = getDb();
  const stmt = db.prepare(
    "INSERT INTO ratings (product_id, score, comment) VALUES (@product_id, @score, @comment)"
  );
  return stmt.run(data);
}

export function getRatingsByProductId(productId: number): Rating[] {
  const db = getDb();
  return db
    .prepare("SELECT * FROM ratings WHERE product_id = ? ORDER BY created_at DESC")
    .all(productId) as Rating[];
}
