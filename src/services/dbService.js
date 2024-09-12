
import { createTables } from "../database/schema";



// Initialize database
export const initializeDatabase = () => {
  createTables();
};

