import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Database configuration - use DATABASE_URL if available, otherwise individual vars
const dbConfig = process.env.DATABASE_URL ? 
  { connectionString: process.env.DATABASE_URL } :
  {
    user: process.env.POSTGRES_USER || 'app',
    host: process.env.DB_HOST || 'db',
    database: process.env.POSTGRES_DB || 'appdb', 
    password: process.env.POSTGRES_PASSWORD || 'app_password',
    port: parseInt(process.env.DB_PORT || '5432'),
  };

// Create connection pool
const pool = new Pool(dbConfig);

// Test the connection
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err: Error) => {
  console.error('❌ Database connection error:', err);
});

// Export the pool for use in other modules
export default pool;