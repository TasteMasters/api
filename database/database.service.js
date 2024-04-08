import pg from 'pg';

export const Client = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
