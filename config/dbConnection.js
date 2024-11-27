import { createConnection } from "mysql2/promise";

const openConnection = async () => {
  try {
    const config = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PSWD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    };
    const connection = await createConnection(config);
    console.log("Database connection established successfully.");
    return connection;
  } catch (error) {
    console.log(`Error while creating db connection:`, error.message);
    process.exit(1);
  }
};

export default openConnection;
