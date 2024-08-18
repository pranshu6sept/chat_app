// import { drizzle } from 'drizzle-orm/neon-http';
import { neon, neonConfig } from '@neondatabase/serverless';


const connectDB = async () => {
  try {
    if (!process.env.DRIZZLE_DATABASE_URL) {
      throw new Error("NEON_DATABASE_URL is not defined in environment variables");
    }

    // Ensure the database name is included in the connection string
    const connectionString = process.env.DRIZZLE_DATABASE_URL;

    // Configure neon to use connection pooling
    neonConfig.fetchConnectionCache = true;

    // Create a SQL connection
    const sql = neon(connectionString);

    // Create a Drizzle ORM instance
    // const db = drizzle(sql);

    // Test the connection
    const result = await sql`SELECT NOW()`;
    console.log(`Neon PostgreSQL connected !! Current time: ${result[0].now}`);

    // return db;
  } catch (error) {
    console.error("Neon PostgreSQL connection error", error);
    process.exit(1);
  }
};


export default connectDB;