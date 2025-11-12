import { Pool } from "pg";

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

db.query("SELECT 1")
  .then(() => {
    console.log("Supabase DB connected!");
  })
  .catch((err) => {
    console.error("Supabase DB connection failed:", err);
    process.exit(1);
  });
