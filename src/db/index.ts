import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { advocates } from "./schema";

const setup = () => {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set");
    // Return a properly typed mock that matches Drizzle ORM interface
    return {
      select: () => ({
        from: () => ({
          where: () => [],
        }),
      }),
    } as any; // Type assertion to avoid complex typing issues
  }

  // for query purposes
  const queryClient = postgres(process.env.DATABASE_URL);
  const db = drizzle(queryClient);
  return db;
};

export default setup();
